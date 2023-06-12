"use strict";

const Future = require('fibers/future');
const path = require('path');
const packageLoader = require('@steedos/service-meteor-package-loader');
const objectql = require('@steedos/objectql');
const standardObjectsPath = path.dirname(require.resolve("@steedos/standard-objects/package.json"));
const _ = require('lodash');
const express = require('express');
const validator = require('validator');

/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

module.exports = {
	name: 'steedos-server',

	/**
	 * Settings
	 */
	settings: {
		port: process.env.PORT || 3000,
		rootUrl: process.env.ROOT_URL || 'http://localhost:3000',
		mongoUrl: process.env.MONGO_URL,
		mongoOplogUrl: process.env.MONGO_OPLOG_URL,
		storageDir: process.env.STEEDOS_STORAGE_DIR || require('path').resolve(require('os').homedir(), '.steedos', 'storage'),
		nodeRedServer: {
			enabled: false,
			port: null,
		},
		packageInfo: {
			path: standardObjectsPath,
		},
		apiServer: {
			enabled: true
		},
		built_in_plugins: [
			"@steedos/standard-space",
			"@steedos/standard-cms",
			"@steedos/standard-object-database",
			"@steedos/standard-process-approval",
			"@steedos/standard-collaboration",
			"@steedos/standard-ui",
			"@steedos/standard-permission",
			// "@steedos/webapp-public",
			// "@steedos/service-ui",
			"@steedos/service-cachers-manager", // 依赖了 steedos/core
			"@steedos/workflow",
			"@steedos/accounts",
			"@steedos/plugin-company",
			// "@steedos/word-template",
			"@steedos/metadata-api", // ? TODO: 为啥使用meteor package load
			"@steedos/data-import", // main 文件不是 package.service.js
			"@steedos/service-fields-indexs", // 依赖了meteor collection
			// "@steedos/service-accounts",
			// "@steedos/service-charts",
			// "@steedos/service-pages",
			// "@steedos/service-cloud-init",
			// "@steedos/service-workflow",
			// "@steedos/service-plugin-amis",
			// "@steedos/standard-process"
			// "@steedos/service-files",
			"@steedos/steedos-plugin-schema-builder",
		],
		plugins: [
		]
	},

	/**
	 * Dependencies
	 */
	dependencies: [
		'metadata-server', 'api'
	],

	/**
	 * Actions
	 */
	actions: {
		// 动态修改浏览器端 Meteor.settings 变量，包括其中的 PUBLIC_SETTINGS
		setSettings(ctx) {
			this.setSettings(ctx.params)
		},
	},

	/**
	 * Events
	 */
	events: {
		async 'service-cloud-init.succeeded'(ctx) {
			await this.setMasterSpaceId()
		}
	},

	/**
	 * Methods
	 */
	methods: {
		// 动态修改浏览器端 Meteor.settings 变量，包括其中的 PUBLIC_SETTINGS
		setSettings(params) {
			_.defaultsDeep(__meteor_runtime_config__, params);
			Object.keys(WebApp.clientPrograms).forEach((arch) => {
				const program = WebApp.clientPrograms[arch];     
				const meteorRuntimeConfig = JSON.parse(program.meteorRuntimeConfig)
				_.defaultsDeep(meteorRuntimeConfig,  params)
				program.meteorRuntimeConfig = JSON.stringify(meteorRuntimeConfig);
			});
		},
		wrapAsync(fn, context) {
			let proxyFn = async function (_cb) {
				let value = null;
				let error = null;
				try {
					value = await fn.call(context)
				} catch (err) {
					error = err
				}
				_cb(error, value)
			}
			let fut = new Future();
			let callback = fut.resolver();
			let result = proxyFn.apply(this, [callback]);
			return fut ? fut.wait() : result;
		},

		async startSteedos() {

			this.meteor = require('@steedos/meteor-bundle-runner');
			this.steedos = require('@steedos/core');
			// const logger = this.logger;
			await Future.task(() => {
				try {
					this.meteor.loadServerBundles();
					// 使用 express 服务扩展meteor req 功能, 比如sendFile等
					const connectHandlersExpress = express();
					const session = require('express-session');
					connectHandlersExpress.use(session({
						secret: process.env.STEEDOS_SESSION_SECRET || 'steedos',
						resave: false,
						saveUninitialized: true,
						cookie: { secure: false, maxAge: 800000 },
						name: 'ivan'
					}))
					connectHandlersExpress.use((req, res, next)=>{
						next();
					});
					connectHandlersExpress.use(require('@steedos/router').staticRouter());
					connectHandlersExpress.use(SteedosApi.express());
					WebApp.connectHandlers.use(connectHandlersExpress)
					const steedosSchema = require('@steedos/objectql').getSteedosSchema(this.broker);
					this.wrapAsync(this.startStandardObjectsPackageLoader, {});
					// console.time(`startSteedos-dataSourceInIt`)
					// const datasources = steedosSchema.getDataSources();
					// for (let dataSource in datasources) {
					// 	console.log(`dataSource`, dataSource);
					// 	Future.fromPromise(steedosSchema.getDataSource(dataSource).init()).wait();
					// }
					// console.timeEnd(`startSteedos-dataSourceInIt`)
					Future.fromPromise(this.steedos.init(this.settings)).wait();
					this.WebApp = WebApp;
					// this.startNodeRedService();
					this.meteor.callStartupHooks();
					this.meteor.runMain();
				} catch (error) {
					this.logger.error(error)
				}
			}).promise();

		},

		// async startNodeRedService() {
		// 	if (this.settings.nodeRedServer && this.settings.nodeRedServer.enabled) {
		// 		this.nodeRedService = await this.broker.createService({
		// 			name: "node-red-flows",
		// 			mixins: [NodeRedService],
		// 			settings: this.settings.nodeRedServer
		// 		});
		// 		if (!this.broker.started) {
		// 			await this.broker._restartService(this.nodeRedService)
		// 		}
		// 	}
		// },

		async startAPIService() {
			// if (this.settings.apiServer && this.settings.apiServer.enabled) {
			// 	console.log(`this.WebApp.rawConnectHandlers.use`, this.WebApp.rawConnectHandlers.use.toString())
			// 	console.log(`======require('@steedos/router').staticRouter()=====`, require('@steedos/router').staticRouter())
			// 	this.WebApp.rawConnectHandlers.use(require('@steedos/router').staticRouter());
			// 	console.log(`===rawConnectHandlers===require('@steedos/router').staticRouter()=====`, require('@steedos/router').staticRouter())
			// 	this.WebApp.connectHandlers.use(SteedosApi.express());
			// }

		},

		async startStandardObjectsPackageLoader() {
			let settings = this.settings.packageInfo;
			if (settings.path) {
				return await new Promise((resolve, reject) => {
					this.standardObjectsPackageLoaderService = this.broker.createService({
						name: 'standard-objects',
						mixins: [packageLoader],
						settings: { packageInfo: settings },
						started: () => {
							resolve(true)
						}
					});
					if (!this.broker.started) {
						this.broker._restartService(this.standardObjectsPackageLoaderService)
					}
				})
			}

		},


		// 设置魔方Id
		async setMasterSpaceId() {

			// if (validator.trim(process.env.STEEDOS_TENANT_MASTER_ID || '').length == 0) {
			// 	process.env.STEEDOS_TENANT_MASTER_ID = (await objectql.getObject('spaces').directFind({ fields: ['_id', 'name', 'admins'] }))[0]['_id']
			// 	this.logger.info(`Set master space id to first space: ${process.env.STEEDOS_TENANT_MASTER_ID} `)
			// }		
			
			this.masterSpaceId = process.env.STEEDOS_TENANT_MASTER_ID
			this.setSettings({
				PUBLIC_SETTINGS: {
					masterSpaceId: process.env.STEEDOS_TENANT_MASTER_ID
				}
			})
		},
	},

	/**
	 * Service created lifecycle event handler
	 */
	created() {
		// this.RED = RED;
		// this.MetadataService = this.broker.createService(MetadataService);
	},

	/**
	 * Service started lifecycle event handler
	 */
	async started() {
		// let time = new Date().getTime();
		// this.broker.waitForServices(this.name).then(async () => {
			process.env.PORT = this.settings.port;
			process.env.ROOT_URL = this.settings.rootUrl;

			await this.startSteedos();

			// this.startAPIService();
			await this.setMasterSpaceId();

			// console.log('耗时：', new Date().getTime() - time);
			//  **已经移除了waitForServices, 此事件可以作废了, 可使用 dependencies: ['steedos-server']** ; 此处有异步函数，当前服务started后，实际上还未初始化完成。所以此服务初始化完成后，发出一个事件;
			
			// 此处需要延时处理,否则监听此事件的函数中如果调用了此服务中的aciton, 可能会出现action未注册的情况.
			setTimeout(()=>{
				this.broker.emit("steedos-server.started");
			}, 1000)
		
			// });

	},

	/**
	 * Service stopped lifecycle event handler
	 */
	async stopped() {

	},
    merged(schema) {
        schema.name = 'steedos-server';  //steedo-server 服务禁止修改name
    }
};
