import { SteedosSchema, SteedosSqlServerDriver, SteedosDatabaseDriverType } from '../../../../src';
import { expect } from 'chai';

const connectConfig = require('../../../../test/connection.json').mssql;//不提供connectConfig值时不运行单元测试
let tableName = "TestFieldTypesForSqlserver";
let driver: SteedosSqlServerDriver;

describe('basic field types for sqlserver database', () => {
    if (!connectConfig) {
        return true;
    }
    try {
        require("mssql");
    }
    catch (ex) {
        return true;
    }
    let result: any;
    let expected: any;
    let testIndex: number = 0;

    let tests = [
        {
            title: "create one record",
            method: "insert",
            data: { text: "text", textarea: "textarea", int: 10, float: 46.25, date: new Date('2019-04-30T00:00:00.000Z'), datetime: new Date('2019-04-30T09:00:00.000Z'), bool: true },
            expected: {
                returnRecord: { text: "text", textarea: "textarea", int: 10, float: 46.25, date: new Date('2019-04-30T00:00:00.000Z'), datetime: new Date('2019-04-30T09:00:00.000Z'), bool: true }
            }
        }
    ];

    before(async () => {
        let datasourceDefault:any = {
            driver: SteedosDatabaseDriverType.SqlServer,
            objects: {
                test: {
                    label: 'SqlServer Schema',
                    table_name: tableName,
                    fields: {
                        id: {
                            label: '主键',
                            type: 'number',
                            primary: true,
                            generated: true
                        },
                        text: {
                            label: '文本',
                            type: 'text'
                        },
                        textarea: {
                            label: '长文本',
                            type: 'textarea'
                        },
                        int: {
                            label: '数量',
                            type: 'number'
                        },
                        float: {
                            label: '小数',
                            type: 'number',
                            scale: 4
                        },
                        date: {
                            label: '日期',
                            type: 'datetime'
                        },
                        datetime: {
                            label: '创建时间',
                            type: 'datetime'
                        },
                        bool: {
                            label: '是否',
                            type: 'boolean'
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
        driver = <SteedosSqlServerDriver>datasource.adapter;
    });

    beforeEach(async () => {
        let data = tests[testIndex].data;
        expected = tests[testIndex].expected;
        let method = tests[testIndex].method;
        result = await driver[method](tableName, data).catch((ex: any) => { console.error(ex); return false; });
    });

    tests.forEach(async (test) => {
        it(`${test.title}`, async () => {
            testIndex++;
            if (expected.error !== undefined) {
                expect(result.message).to.be.eq(expected.error);
            }
            if (expected.length !== undefined) {
                expect(result).to.be.length(expected.length);
            }
            if (expected.gt !== undefined) {
                expect(result).to.be.gt(expected.gt);
            }
            if (expected.eq !== undefined) {
                expect(result).to.be.eq(expected.eq);
            }
            if (expected.returnRecord !== undefined) {
                Object.keys(expected.returnRecord).forEach((key) => {
                    expect(result).to.be.not.eq(undefined);
                    expect(result).to.be.not.eq(false);
                    if (result) {
                        if (result[key] instanceof Date){
                            expect(result[key].getTime()).to.be.eq(expected.returnRecord[key].getTime());
                        }
                        else{
                            expect(result[key]).to.be.eq(expected.returnRecord[key]);
                        }
                    }
                });
            }
        });
    });
});
