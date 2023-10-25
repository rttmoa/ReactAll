import * as express from 'express'
import * as path from 'path'
import * as mongoose from 'mongoose'
import * as mongodb from 'mongodb'
import { URL } from 'url'
import * as bodyParser from 'body-parser'

import { AccountsServer, AccountsServerOptions } from '@accounts/server'
import { getSteedosConfig, SteedosMongoDriver, getConnection } from '@steedos/objectql'


import accountsExpress from './rest-express'  // ? 路由地址中间件  ( express.Router() )
import { userLoader } from './rest-express/user-loader' // ? userLoader (根据有无token，处理req，(req as any).authToken)

import { AccountsPassword } from './password' // ? 账户密码业务
import MongoDBInterface from './database-mongo' // ? 数据源 Mongo
import accountsSamlIdp from './saml-idp' // ? LDAP 单点登录和 SAML 单点登录的起点

import { errors } from './password/errors'
import { mongoUrl } from './db' // mongoUrl
import { sendMail } from './mail' // 发送邮件



declare var WebApp
declare var Meteor

const config = getSteedosConfig() // !获取 steedos-config.yml文件中的配置


// ? 获取账户服务配置
async function getAccountsServer(context) {
  let accountsConfig = config.accounts || {}
  let tokenSecret = accountsConfig.tokenSecret || 'secret'
  let accessTokenExpiresIn = accountsConfig.accessTokenExpiresIn || '90d'
  let refreshTokenExpiresIn = accountsConfig.refreshTokenExpiresIn || '7d'

  mongoose.connect(mongoUrl, { useNewUrlParser: true })
  const connection = mongoose.connection

  const rootUrl = process.env.ROOT_URL ? process.env.ROOT_URL : 'http://127.0.0.1:4000'
  const rootUrlInstance = new URL(rootUrl)
  const siteUrl = rootUrlInstance.origin
  var emailFrom = ''
  if (config.email && config.email.from) {
    emailFrom = config.email.from
  }

  // interface AccountsServerOptions { }   下面实例对象属性值
  const accountsServer = new AccountsServer(
    {
      db: new MongoDBInterface(connection, {
        convertUserIdToMongoObjectId: false,
        convertSessionIdToMongoObjectId: false,
        idProvider: () => new mongodb.ObjectId().toString(),
        timestamps: {
          createdAt: 'created',
          updatedAt: 'modified',
        },
        dateProvider: (date?: Date) => {
          return date ? date : new Date()
        },
      }),
      // sendMail: sendMail,
      siteUrl: siteUrl,
      tokenSecret: tokenSecret,
      tokenConfigs: {
        accessToken: {
          expiresIn: accessTokenExpiresIn,
        },
        refreshToken: {
          expiresIn: refreshTokenExpiresIn,
        },
      },
      emailTemplates: {
        from: emailFrom,
        verifyEmail: {
          subject: () => '验证您的帐户电子邮件',
          text: (user: any, url: string) => `请点击此链接来验证您的帐户电子邮件: ${url}`,
          html: (user: any, url: string) => `请点击<a href="${url}">此链接</a>来验证您的帐户电子邮件。`,
        },
        resetPassword: {
          subject: () => '重置您的账户密码',
          text: (user: any, url: string) => `请点击此链接来重置您的账户密码: ${url}`,
          html: (user: any, url: string) => `请点击<a href="${url}">此链接</a>来重置您的账户密码。`,
        },
        enrollAccount: {
          subject: () => '设置您的账户密码',
          text: (user: any, url: string) => `请点击此链接来设置您的账户密码: ${url}`,
          html: (user: any, url: string) => `请点击<a href="${url}">此链接</a>来设置您的账户密码。`,
        },
        passwordChanged: {
          subject: () => '您的账户密码已被更改',
          text: () => `您的帐户密码已更改成功。`,
          html: () => `您的帐户密码已更改成功。`,
        },
      },
    },
    {
      password: new AccountsPassword({
        errors: errors,
        passwordHashAlgorithm: 'sha256',
        notifyUserAfterPasswordChanged: config.password ? config.password.notifyUserAfterPasswordChanged : true,
        sendVerificationEmailAfterSignup: config.password ? config.password.sendVerificationEmailAfterSignup : false,
      }),
    }
  ) 

  return accountsServer
}


async function getAccountsRouter(context) {
  let accountsServer = await getAccountsServer(context) //* 获取账户服务配置

  const router = accountsExpress(accountsServer, { path: '/' })

  router.get('/', (req, res) => {
    res.redirect('a/')
    res.end()
  })

  // /* Router to webapps build */
  // router.use('/a/', express.static(path.join(__dirname, '..', 'webapp', 'build')))
  // router.use('/a/i18n', express.static(path.join(__dirname, '..', 'webapp', 'src', 'i18n')))
  // router.get('/a/*', (req, res) => {
  //   res.sendFile(path.join(__dirname, '..', 'webapp', 'build', 'index.html'))
  // })

  // /* Router to SAML-IDP */
  // router.use('/saml/', userLoader(accountsServer), accountsSamlIdp)

  return router
}

// ? 传递 app    express()
export function init(context) {
  if (context.settings) {
    if (!context.settings.public) {
      context.settings.public = {}
    }
    if (!context.settings.public.webservices) {
      context.settings.public.webservices = {}
    }
    context.settings.public.webservices.accounts = { url: '/accounts' }
  }
  // ? 调用函数
  getAccountsRouter(context).then(accountsRouter => {
    context.app.use('/accounts', accountsRouter)
    if (typeof WebApp !== 'undefined') {
      const app = express()
      app.use('/accounts', bodyParser.urlencoded({ extended: false }), bodyParser.json(), accountsRouter)
      WebApp.rawConnectHandlers.use(app)
    }
  })
}
