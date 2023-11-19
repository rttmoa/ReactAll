import Router = require("@koa/router")
import { db } from "../packages/objectql/index.ts";
const router = new Router();




router.get('/list', async function(ctx: any) {
  const now = new Date()
  const userId = "userId"
  const spaceDoc = await db.insert("spaces11", {
    name: "spaceName",
    admin: [userId],
    owner: userId,
    created: now
  })
  ctx.body = {
    code: 200,
    msg: "成功23",
    results: spaceDoc
  }
});   



export default router;