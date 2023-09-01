const mysql = require('mysql');
// 创建mysql线程池
let pool = mysql.createPool({
    user: 'root',
    password: 'root',
    database: 'tanhua',
    host: '127.0.0.1',
    port: '3306'
});
 
const dbHandle = () => {
    // 创建方法 ,sql:sql语句，values：字段对应的值
    // 例如： insert into users(name) values (?) 中的 ? 就是从values中取得
    const execute = () => {
        return async (sql, values) => {
            // console.log(sql)
            // 比如手机号获取验证码接口：
                // select status from dt_users where mobile =15303663375 
                // update dt_users set vcode = 888888,login_time=NOW() where mobile =15303663375
            // console.log(values)
            return new Promise((resolve, reject) => {
                pool.getConnection(function (err, connection) {
                    if (err) { reject(err) } 
                    else {
                        connection.query(sql, values, (err, fields) => {
                            // console.log(fields)
                            // OkPacket {
                            //     fieldCount: 0,
                            //     affectedRows: 1,
                            //     insertId: 0,
                            //     serverStatus: 34,
                            //     warningCount: 0,
                            //     message: '(Rows matched: 1  Changed: 1  Warnings: 0',
                            //     protocol41: true,
                            //     changedRows: 1
                            //   }
                            if (err) reject(err)
                            else resolve(fields)
                            connection.release();
                        })
                    }
                })
            })
        }
    }

    return async (ctx, next) => {
        ctx.executeSql = execute();  // 注册全局ctx
        // console.log(ctx.executeSql) // [AsyncFunction (anonymous)]
        await next();
    }
}

module.exports = dbHandle;
