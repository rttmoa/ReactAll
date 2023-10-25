import { SteedosMongoDriver } from "../../../../src/driver";
import { expect } from 'chai';

let tableName = "mongo-driver-test-fields";

describe('fetch records width specific fields for mongo database', () => {
    before(async ()=>{
        let mongo = new SteedosMongoDriver({ url: "mongodb://127.0.0.1/steedos" });
        await mongo.connect();
        await mongo.collection(tableName).deleteMany()
    });

    it('fields arguments is a array', async () => {

        let mongo = new SteedosMongoDriver({ url: "mongodb://127.0.0.1/steedos" });
        await mongo.insert(tableName, { _id: "ptr", name: "ptr", title: "PTR" })
        await mongo.insert(tableName, { _id: "cnpc", name: "cnpc", title: "CNPC" })

        let queryOptions = {
            fields: ["name"]
        };
        let result = await mongo.find(tableName, queryOptions);

        await mongo.delete(tableName, "ptr");
        await mongo.delete(tableName, "cnpc");
        expect(result).to.be.length(2);
        expect(result[0].name).to.be.eq("ptr");
        expect(result[0].title).to.be.eq(undefined);
    });

    it('fields arguments is a string', async () => {

        let mongo = new SteedosMongoDriver({ url: "mongodb://127.0.0.1/steedos" });
        await mongo.insert(tableName, { _id: "ptr", name: "ptr", title: "PTR", tag: "one" })
        await mongo.insert(tableName, { _id: "cnpc", name: "cnpc", title: "CNPC", tag: "one" })

        let queryOptions = {
            fields: "name, title, "
        };
        let result = await mongo.find(tableName, queryOptions);

        await mongo.delete(tableName, "ptr");
        await mongo.delete(tableName, "cnpc");
        expect(result).to.be.length(2);
        expect(result[0].name).to.be.eq("ptr");
        expect(result[0].title).to.be.eq("PTR");
        expect(result[0].tag).to.be.eq(undefined);
    });
    
    // it('fields must not be undefined or empty', async () => {

    //     let mongo = new SteedosMongoDriver({ url: "mongodb://127.0.0.1/steedos" });

    //     let queryOptions = {
    //         fields: []
    //     };
    //     let result = "";
    //     try {
    //         result = await mongo.find(tableName, queryOptions);
    //         console.log("fetch records width specific fields result:");
    //         console.log(result);
    //     }
    //     catch (ex) {
    //         result = "error";
    //     }
    //     expect(result).to.be.eq("error");
    // });
});
