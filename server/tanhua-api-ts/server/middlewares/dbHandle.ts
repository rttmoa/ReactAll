const mysql = require('mysql')

// 创建mysql线程池
let pool = mysql.createPool({
    user: 'root',
    password: 'root',
    database: 'tanhua',
    host: '127.0.0.1',
    port: '3306'
})

const dbHandle = () => {
    // 创建方法 ,sql:sql语句，values：字段对应的值
    // 例如： insert into users(name) values (?) 中的 ? 就是从values中取得
    const execute = () => {
        return async (sql: any, values: any) => {
            // console.log(sql)
            // 比如手机号获取验证码接口：
            // select status from dt_users where mobile =15303663375 
            // update dt_users set vcode = 888888,login_time=NOW() where mobile =15303663375
            // console.log(values)
            return new Promise((resolve, reject) => {
                pool.getConnection(function (connError: any, connection: any) {
                    const connQuery = connection.query(sql, values, (queryError: any, data: any, fields: any) => {
                        queryError ? reject(queryError) : resolve(data) 
                        connection.release()
                        // pool.end() // 关闭连接
                    })
                    connError ? reject(connError) : connQuery;
                })
            })
        }
    }

    return async (ctx: any, next: any) => {
        ctx.executeSql = execute()  // 注册全局 ctx
        // console.log(ctx.executeSql) // [AsyncFunction (anonymous)]
        await next()
    }
}
export default dbHandle 
