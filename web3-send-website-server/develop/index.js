// 引入 express 框架
const express = require('express')
// 引入 mysql 库
const mysql = require("mysql");
// 创建express实例
const app = express();
// 读取数据库连接文件
const dbconfig = require("./config.js");
const bodyParser = require('body-parser');

// 格式化请求为json
const json = express.json({ type: '*/json' });
app.use(json);
app.use(bodyParser.urlencoded({ extended: false }));

// 新建一个连接池
const db = mysql.createPool(dbconfig)
// 新增
app.post('/api/transferHistory', (req, res) => {
  const { address, from, fromScan, to, toScan, token, amount, mode, status } = req.body;
  if (address && from && fromScan && to && toScan && token && amount && mode && status) {
    db.getConnection(function (err, connection) {
      if (err) {
        console.log("建立连接失败", err);
      } else {
        connection.query(`INSERT INTO transferHistory
        (\`address\`, \`from\`, \`fromScan\`,\`to\`,\`toScan\`,\`token\`,\`amount\`,\`mode\`,\`status\`)
        VALUES('${address}', '${from}','${fromScan}',
        '${to}', '${toScan}','${token}','${amount}','${mode}'
        ,'${status}')`, function (err, rows) {
          if (err) {
            console.log(err);
            connection.destroy();
            res.send({
              code: 500,
              msg: '系统错误'
            })
          } else {
            connection.destroy();
            res.send({
              code: 200,
              msg: "操作成功"
            })
          }
        })

      }
    })


  }
  else {
    res.send({ code: 102, msg: '参数不完整' })
  }
})
// 获取
app.get('/api/transferHistory', (req, res) => {
  // 获取查询参数
  const { address } = req.query
  db.getConnection(function (err, connection) {
    if (err) {
      console.log("建立连接失败", err);
    } else {
      let query = ` address='${address}'`;
      if (query) {
        query = 'where ' + query
      }
      connection.query(`SELECT *
      FROM transferHistory ${query}`, function (err, rows) {
        if (err) {
          console.log(err);
          connection.destroy();
          res.send({
            code: 500,
            msg: '系统错误'
          })
        } else {
          connection.destroy();
          res.send({
            code: 200,
            msg: '',
            data: rows
          })
        }
      })
    }
  })
})

// 监听端口
app.listen(5000, () => {
  console.log("服务已经启动，5000 端口监听中...");
})