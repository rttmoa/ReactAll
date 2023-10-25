import { getSteedosConfig, SteedosMongoDriver } from '@steedos/objectql';

let url = process.env.MONGO_URL;
if (!url)
    url = getSteedosConfig().datasources.default.connection.url;


// !SteedosDriverConfig
export const db = new SteedosMongoDriver({ url: url });



// !认mongodb url；mongodb://127.0.0.1/steedos-accounts
export const mongoUrl = url