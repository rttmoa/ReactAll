/*
 * @Author: sunhaolin@hotoa.com
 * @Date: 2022-06-08 09:38:56
 * @LastEditors: sunhaolin@hotoa.com
 * @LastEditTime: 2022-06-21 10:07:00
 * @Description: 
 */
"use strict";
// @ts-check

const project = require('./package.json');
const packageName = project.name;
const packageLoader = require('@steedos/service-package-loader');

/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 * 软件包服务启动后也需要抛出事件。
 */
module.exports = {
	name: packageName,
	namespace: "steedos",
	mixins: [packageLoader],
	/**
	 * Settings
	 */
	settings: {
		packageInfo: {
			path: __dirname,
			name: this.name,
			isPackage: false
		}
	},

	/**
	 * Dependencies
	 */
	dependencies: [],

	/**
	 * Actions
	 */
	actions: {

	},

	/**
	 * Events
	 */
	events: {

	},

	/**
	 * Methods
	 */
	methods: {
		
	},

	/**
	 * Service created lifecycle event handler
	 */
	async created() {
		// 如果STEEDOS_CFS_DOWNLOAD_PUBLIC为空则默认为avatars
		if (!process.env.STEEDOS_CFS_DOWNLOAD_PUBLIC) {
			process.env.STEEDOS_CFS_DOWNLOAD_PUBLIC = 'avatars';
		}
	},

	/**
	 * Service started lifecycle event handler
	 */
	async started() {
		
	},

	/**
	 * Service stopped lifecycle event handler
	 */
	async stopped() {

	}
};
