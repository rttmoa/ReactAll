import express from 'express'
import config from 'config-lite'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import connectMongo from 'connect-mongo'
import history from 'connect-history-api-fallback'
import chalk from 'chalk'

import db from './mongodb/db.js'
import winston from 'winston'
import expressWinston from 'express-winston'
import Statistic from './middlewares/statistic'

import router from './routes/index.js' // TODO router

const app = express()

// 拦截请求
app.all('*', (req, res, next) => {
  const { origin, Origin, referer, Referer } = req.headers
  const allowOrigin = origin || Origin || referer || Referer || '*'
  res.header('Access-Control-Allow-Origin', allowOrigin)
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Credentials', true) //可以带 cookies
  res.header('X-Powered-By', 'Express')
  if (req.method == 'OPTIONS') {
    res.sendStatus(200)
  } else {
    next()
  }
})

// app.use(Statistic.apiRecord)
const MongoStore = connectMongo(session)
app.use(cookieParser())
app.use(
  session({
    name: config.session.name,
    secret: config.session.secret,
    resave: true,
    saveUninitialized: false,
    cookie: config.session.cookie,
    store: new MongoStore({
      url: config.url,
    }),
  })
)

// app.use(expressWinston.logger({
//     transports: [
//         new (winston.transports.Console)({
//           json: true,
//           colorize: true
//         }),
//         new winston.transports.File({
//           filename: 'logs/success.log'
//         })
//     ]
// }));

router(app) // TODO router中传递 app 实例

// app.use(expressWinston.errorLogger({
//     transports: [
//         new winston.transports.Console({
//           json: true,
//           colorize: true
//         }),
//         new winston.transports.File({
//           filename: 'logs/error.log'
//         })
//     ]
// }));

app.use(history())
app.use(express.static('./public'))
app.listen(config.port, () => {
  console.log(chalk.green(`成功监听端口：${config.port}`))
})
