
import DbManager from './src/util/dbManager'


// TODO 使用 DbManager

const userSession = req.user;
const dbManager = new DbManager(userSession)
await dbManager.connect()
const objects = await dbManager.find(collection_name, {is_deleted: {$ne: true}}); // is_deleted 不等于 true 的值
await dbManager.close()
