import { config } from './config/config'


    
export default class SqlController {

    static async start (ctx: any) {
        try {
            let findSQL = `select status from dt_users where mobile = ${15303663375} `
            let resultData = await ctx.executeSql(findSQL)

            let updateSQL = ` update dt_users set vcode = ${88888},login_time=NOW() where mobile =${15303663375} `
            await ctx.executeSql(updateSQL)

            let insSQL = `insert into dt_users (mobile,vcode,status,login_time,guid) values (${15303663375},${88888},2,NOW(),${`${15303663375} ${13}`})`
            await ctx.executeSql(insSQL)
        } catch (error) {
            return ctx.sendError(config.resCodes.serverError, error.message)
        }
    }

    static async test1 (ctx: any) {
        let SQL = `select * from student LIMIT 0,10`
        let result = await ctx.executeSql(SQL) 
        console.log(result.length);
        return ctx.send(result.length)
    }
    static async test2 (ctx: any) {
        let SQL = `select min(score), avg(score),sum(score) from sc`
        let result = await ctx.executeSql(SQL) 
        console.log(result);
        return ctx.send(result)
    }



}
    