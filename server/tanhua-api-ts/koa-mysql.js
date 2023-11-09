let sql = {
  insert: "INSERT INTO user(id, name, age) VALUES(?,?,?)",
  update: "UPDATE user SET name=?, age=? WHERE id=?",
  delete: "DELETE FROM user WHERE id=?",
  queryById: "SELECT * FROM user WHERE id=?",
  queryAll: "SELECT * FROM user",
};

  
let mysqlConfig = {
  host: "1.2.3.4",
  user: "******",
  password: "******",
  port: "******",
  database: "******",
}; 

const mysql = require("mysql");
const pool = mysql.createPool(mysqlConfig);


// ? 增
let dbAdd = (table, req, res, next) => {
  return new Promise((resolve,reject)=>{
    pool.getConnection((err, connection) => {
      let paramValue = paramList(req);
      connection.query(sql[table].insert, [...paramValue], (err, result) => {
        if(err){
          reject(err)
        }
        resolve(result)
        connection.release();
      });
    });
  })
};
  

// ? 删除
let dbDelete = (table, req, res, next) => {
  let paramValue = paramList(req);
  return new Promise((resolve,reject)=>{
    pool.getConnection((err, connection) => {
      connection.query(sql[table].delete, [...paramValue], (err, result) => {
        if(err){
          reject(err)
        }
        resolve(result)
        connection.release();
      });
    });
  })
};
  

// ? 改
let dbUpdate = (table, req, res, next) => {
  let paramValue = paramList(req);
  return new Promise((resolve,reject)=>{
    pool.getConnection((err, connection) => {
      connection.query(sql[table].update, [...paramValue], (err, result) => {
        if(err){
          reject(err)
        }
        resolve(result)
        connection.release();
      });
    });
  })
}; 



// ? 查一个
let dbQueryById = (table, req, res, next) => {
  let paramValue = paramList(req);
  return new Promise((resolve,reject)=>{
    pool.getConnection((err, connection) => {
      connection.query(sql[table].queryById, [...paramValue], (err, result) => {
        if(err){
          reject(err)
        }
        resolve(result)
        connection.release();
      });
    });
  })
};
  

// ? 查全部
let dbQueryAll = (table, req, res, next) => {
  return new Promise((resolve,reject)=>{
    pool.getConnection((err, connection) => {
      connection.query(sql[table].queryAll, (err, result) => {
        if(err){
          reject(err)
        }
        resolve(result)
        connection.release();
      });
    });
  })
}; 



// ? 使用
app.post("/login",async (req,res) =>{
  const {username,password} = req.body // 接收数据
    try {
       //看这里， 我们使用username的方式去数据库进行用户查找
      const {data} = await db.dbQueryById("user",{"username":username},res)
      // 接下来自己想象吧
    } catch (err) {
      res.json({
        code: "500",
        msg: "用户不存在"
      });
    }
}) 