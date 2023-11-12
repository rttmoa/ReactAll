/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Context } from "koa";
import { getManager, Repository, Not, Equal, Like } from "typeorm";
import { validate, ValidationError } from "class-validator";
import { request, summary, path, body, responsesAll, tagsAll, responses } from "koa-swagger-decorator";
import { User, userSchema } from "../entity/user";



@responsesAll({ 200: { description: "success"}, 400: { description: "bad request"}, 401: { description: "unauthorized, missing/wrong jwt token"}})
@tagsAll(["User"])
export default class UserController {

    @request("get", "/users")
    @summary("查找所有用户")
    @responses({ 200: { description: "success"}, 400: { description: "error"} })
    public static async getUsers(ctx: Context): Promise<void> {
        const userRepository: Repository<User> = getManager().getRepository(User); // 获取用户存储库以对用户执行操作
        const users: User[] = await userRepository.find();
        ctx.status = 200;
        ctx.body = users; 
    }

    @request("get", "/users/{id}")
    @summary("通过 iD 查找用户")
    @path({ id: { type: "number", required: true, description: "id of user" } })
    public static async getUser(ctx: Context): Promise<void> {
        const userRepository: Repository<User> = getManager().getRepository(User);
        const user: User | undefined = await userRepository.findOne(+ctx.params.id || 0);
        if (user) {
            ctx.status = 200;
            ctx.body = user;
        } else {
            ctx.status = 400;
            ctx.body = "The user you are trying to retrieve doesn't exist in the db";
        }
    }

    @request("post", "/users")
    @summary("创建一个用户")
    @body(userSchema)
    public static async createUser(ctx: any): Promise<void> {
        const userRepository: Repository<User> = getManager().getRepository(User); // 获取用户存储库以对用户执行操作
        // 建立要保存的实体用户 (校验用户传递的信息)
        const userToBeSaved: User = new User();
        userToBeSaved.name = ctx.request.body.name;
        userToBeSaved.email = ctx.request.body.email;
        const errors: ValidationError[] = await validate(userToBeSaved); // 错误是验证错误的数组
        if (errors.length > 0) { // 返回 BAD REQUEST 状态代码和错误数组
            ctx.status = 400;
            ctx.body = errors;
        } else if (await userRepository.findOne({ email: userToBeSaved.email })) { // 返回 BAD REQUEST 状态代码和电子邮件已存在错误 
            ctx.status = 400;
            ctx.body = "The specified e-mail address already exists";
        } else { // 保存 POST 正文中包含的用户
            const user = await userRepository.save(userToBeSaved); 
            ctx.status = 201;
            ctx.body = user;
        }
    }

    @request("put", "/users/{id}")
    @summary("更新一个用户")
    @path({ id: { type: "number", required: true, description: "id of user" } })
    @body(userSchema)
    public static async updateUser(ctx: any): Promise<void> {
        const userRepository: Repository<User> = getManager().getRepository(User);
        const userToBeUpdated: User = new User();
        userToBeUpdated.id = +ctx.params.id || 0;  
        userToBeUpdated.name = ctx.request.body.name;
        userToBeUpdated.email = ctx.request.body.email;
        const errors: ValidationError[] = await validate(userToBeUpdated); 
        if (errors.length > 0) { 
            ctx.status = 400;
            ctx.body = errors;
        } else if (!await userRepository.findOne(userToBeUpdated.id)) { 
            ctx.status = 400;
            ctx.body = "The user you are trying to update doesn't exist in the db";
        } else if (await userRepository.findOne({ id: Not(Equal(userToBeUpdated.id)), email: userToBeUpdated.email })) { 
            ctx.status = 400;
            ctx.body = "The specified e-mail address already exists";
        } else { 
            const user = await userRepository.save(userToBeUpdated); 
            ctx.status = 201;
            ctx.body = user;
        }
    }

    @request("delete", "/users/{id}")
    @summary("通过 iD 删除用户")
    @path({ id: { type: "number", required: true, description: "id of user" } })
    public static async deleteUser(ctx: Context): Promise<void> {
        const userRepository = getManager().getRepository(User);
        const userToRemove: User | undefined = await userRepository.findOne(+ctx.params.id || 0);
        if (!userToRemove) {
            ctx.status = 400;
            ctx.body = "The user you are trying to delete doesn't exist in the db";
        } else if (ctx.state.user.email !== userToRemove.email) {
            ctx.status = 403;
            ctx.body = "A user can only be deleted by himself";
        } else {
            await userRepository.remove(userToRemove);
            ctx.status = 204;
        }
    }

    @request("delete", "/testusers")
    @summary("删除集成和负载测试生成的用户")
    public static async deleteTestUsers(ctx: Context): Promise<void> {
        const userRepository = getManager().getRepository(User);
        const usersToRemove: User[] = await userRepository.find({ where: { email: Like("%@citest.com")} });
        await userRepository.remove(usersToRemove);
        ctx.status = 204;
    }

}
