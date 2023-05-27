import { SteedosSchema, SteedosMySqlDriver, SteedosQueryOptions, SteedosDatabaseDriverType } from '../../../../src';
import { expect } from 'chai';

const connectConfig = require('../../../../test/connection.json').mysql;//不提供connectConfig值时不运行单元测试
let tableName = "TestPageForMySql";
let driver: SteedosMySqlDriver;

describe('fetch records by paging for mysql database', function() {
    if (!connectConfig) {
        return true;
    }
    try {
        require("mysql");
    }
    catch (ex) {
        return true;
    }
    let result: any;
    let expected: any;
    let testIndex: number = 0;

    let tests = [
        {
            title: "top",
            options: {
                fields: ["name"],
                sort: 'index',
                top: 2
            },
            expected: {
                length: 2
            }
        },
        {
            title: "top without skip",
            options: {
                fields: ["name"],
                top: 2
            },
            expected: {
                length: 2
            }
        },
        {
            title: "top and skip for paging",
            options: {
                fields: ["id", "name"],
                sort: 'index',
                top: 2,
                skip: 3
            },
            expected: {
                length: 1,
                firstRecordId: "ptr2"
            }
        },
        {
            title: "multi sort for paging",
            options: {
                fields: ["id", "name"],
                sort: 'name desc,index',
                top: 2,
                skip: 1
            },
            expected: {
                length: 2,
                firstRecordId: "ptr2"
            }
        },
        {
            title: "filter for paging with endswith",
            options: {
                fields: ["id", "name"],
                filters: [["name", "endswith", "pc"]],
                sort: 'id desc,index',
                top: 2,
                skip: 0
            },
            expected: {
                length: 2,
                firstRecordId: "cnpc2"
            }
        },
        {
            title: "filter for paging with notcontains",
            options: {
                fields: ["id", "name"],
                filters: [["name", "notcontains", "pc"]],
                sort: 'id desc,index',
                top: 2,
                skip: 0
            },
            expected: {
                length: 2,
                firstRecordId: "ptr2"
            }
        },
        {
            title: "filter for paging with multi equal",
            options: {
                fields: ["id", "name"],
                filters: [["name", "=", "cnpc"], ["title", "=", "CNPC"]],
                sort: 'id desc,index',
                top: 2,
                skip: 0
            },
            expected: {
                length: 2
            }
        }
    ];

    before(async () => {
        let datasourceDefault: any = {
            driver: SteedosDatabaseDriverType.MySql,
            objects: {
                test: {
                    label: 'MySql Schema',
                    table_name: tableName,
                    fields: {
                        id: {
                            label: '主键',
                            type: 'text',
                            primary: true
                        },
                        name: {
                            label: '名称',
                            type: 'text'
                        },
                        title: {
                            label: '标题',
                            type: 'text'
                        },
                        index: {
                            label: '序号',
                            type: 'number'
                        }
                    }
                }
            }
        };
        datasourceDefault = { ...datasourceDefault, ...connectConfig };
        let mySchema = new SteedosSchema({
            datasources: {
                DatasourcesDriverTest: datasourceDefault
            }
        });
        const datasource = mySchema.getDataSource("DatasourcesDriverTest");
        await datasource.init();
        driver = <SteedosMySqlDriver>datasource.adapter;
        await driver.run(`SET SQL_SAFE_UPDATES = 0`);
        await driver.run(`delete from ${tableName}`);
        await driver.run(`SET SQL_SAFE_UPDATES = 1`);
        await driver.insert(tableName, { id: "cnpc1", name: "cnpc", title: "CNPC", index: 1 });
        await driver.insert(tableName, { id: "cnpc2", name: "cnpc", title: "CNPC", index: 2 });
        await driver.insert(tableName, { id: "ptr1", name: "ptr", title: "PTR", index: 3 });
        await driver.insert(tableName, { id: "ptr2", name: "ptr", title: "PTR", index: 4 });
    });

    beforeEach(async () => {
        let queryOptions: SteedosQueryOptions = tests[testIndex].options;
        expected = tests[testIndex].expected;
        try {
            result = await driver.find(tableName, queryOptions);
        }
        catch(ex){
            result = ex;
        }
    });

    tests.forEach(async (test) => {
        it(`${test.title}`, async () => {
            testIndex++;
            if (expected.error !== undefined) {
                expect(result.message).to.be.eq(expected.error);
            }
            if (expected.length !== undefined){
                expect(result).to.be.length(expected.length);
            }
            if (expected.firstRecordId !== undefined) {
                expect(result[0].id).to.be.eq(expected.firstRecordId);
            }
        });
    });
});
