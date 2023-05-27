/*
 * @Author: sunhaolin@hotoa.com
 * @Date: 2023-03-23 15:12:14
 * @LastEditors: sunhaolin@hotoa.com
 * @LastEditTime: 2023-04-06 17:22:03
 * @Description: 
 */
"use strict";
// @ts-check


/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */
module.exports = {
    name: 'object-mixin',
    namespace: "steedos",
    mixins: [],

    /**
     * Settings
     */
    settings: {

    },

    /**
     * Dependencies
     */
    dependencies: [],

    /**
     * Actions
     */
    actions: {


    },

    /**
     * Events
     */
    events: {

    },

    /**
     * Methods
     */
    methods: {
        getObject: {
            handler: function (objectName) {
                return {
                    aggregate: async (query, externalPipeline, userSession) => {
                        return await this.broker.call("objectql.aggregate", {
                            objectName,
                            query,
                            externalPipeline
                        }, {
                            meta: {
                                user: userSession
                            }
                        })
                    },
                    find: async (query, userSession) => {
                        return await this.broker.call("objectql.find", {
                            objectName,
                            query
                        }, {
                            meta: {
                                user: userSession
                            }
                        })
                    },
                    count: async (query, userSession) => {
                        return await this.broker.call("objectql.count", {
                            objectName,
                            query
                        }, {
                            meta: {
                                user: userSession
                            }
                        })
                    },
                    findOne: async (id, query, userSession) => {
                        return await this.broker.call("objectql.findOne", {
                            objectName,
                            id,
                            query,
                        }, {
                            meta: {
                                user: userSession
                            }
                        })
                    },
                    insert: async (doc, userSession) => {
                        return await this.broker.call("objectql.insert", {
                            objectName,
                            doc,
                        }, {
                            meta: {
                                user: userSession
                            }
                        })
                    },
                    update: async (id, doc, userSession) => {
                        return await this.broker.call("objectql.update", {
                            objectName,
                            id,
                            doc,
                        }, {
                            meta: {
                                user: userSession
                            }
                        })
                    },
                    updateOne: async (id, doc, userSession) => {
                        return await this.broker.call("objectql.updateOne", {
                            objectName,
                            id,
                            doc,
                        }, {
                            meta: {
                                user: userSession
                            }
                        })
                    },
                    updateMany: async (queryFilters, doc, userSession) => {
                        return await this.broker.call("objectql.updateMany", {
                            objectName,
                            queryFilters,
                            doc,
                        }, {
                            meta: {
                                user: userSession
                            }
                        })
                    },
                    delete: async (id, userSession) => {
                        return await this.broker.call("objectql.delete", {
                            objectName: objectName,
                            id: id,
                        }, {
                            meta: {
                                user: userSession
                            }
                        })
                    },
                    directAggregate: async (query, externalPipeline, userSession) => {
                        return await this.broker.call("objectql.directAggregate", {
                            objectName,
                            query,
                            externalPipeline
                        }, {
                            meta: {
                                user: userSession
                            }
                        })
                    },
                    directAggregatePrefixalPipeline: async (query, externalPipeline, userSession) => {
                        return await this.broker.call("objectql.directAggregatePrefixalPipeline", {
                            objectName,
                            query,
                            externalPipeline
                        }, {
                            meta: {
                                user: userSession
                            }
                        })
                    },
                    directFind: async (query, userSession) => {
                        return await this.broker.call("objectql.directFind", {
                            objectName,
                            query
                        }, {
                            meta: {
                                user: userSession
                            }
                        })
                    },
                    directInsert: async (doc, userSession) => {
                        return await this.broker.call("objectql.directInsert", {
                            objectName,
                            doc,
                        }, {
                            meta: {
                                user: userSession
                            }
                        })
                    },
                    directUpdate: async (id, doc, userSession) => {
                        return await this.broker.call("objectql.directUpdate", {
                            objectName,
                            id,
                            doc,
                        }, {
                            meta: {
                                user: userSession
                            }
                        })
                    },
                    directDelete: async (id, userSession) => {
                        return await this.broker.call("objectql.directDelete", {
                            objectName,
                            id,
                        }, {
                            meta: {
                                user: userSession
                            }
                        })
                    },
                    getField: async (fieldApiName, userSession) => {
                        return await this.broker.call("objectql.getField", {
                            objectName,
                            fieldApiName,
                        }, {
                            meta: {
                                user: userSession
                            }
                        })
                    },
                    getFields: async (userSession) => {
                        return await this.broker.call("objectql.getFields", {
                            objectName,
                        }, {
                            meta: {
                                user: userSession
                            }
                        })
                    },
                    getNameFieldKey: async (userSession) => {
                        return await this.broker.call("objectql.getNameFieldKey", {
                            objectName,
                        }, {
                            meta: {
                                user: userSession
                            }
                        })
                    },
                    toConfig: async (userSession) => {
                        return await this.broker.call("objectql.toConfig", {
                            objectName,
                        }, {
                            meta: {
                                user: userSession
                            }
                        })
                    },
                    getConfig: async (userSession) => {
                        return await this.broker.call("objectql.getConfig", {
                            objectName,
                        }, {
                            meta: {
                                user: userSession
                            }
                        })
                    },
                    getUserObjectPermissions: async (userSession) => {
                        return await this.broker.call("objectql.getUserObjectPermissions", {
                            objectName,
                        }, {
                            meta: {
                                user: userSession
                            }
                        })
                    },
                    isEnableAudit: async () => {
                        return await this.broker.call("objectql.isEnableAudit", {
                            objectName,
                        })
                    },
                    _makeNewID: async () => {
                        return await this.broker.call("objectql._makeNewID", {
                            objectName,
                        })
                    },
                    getRecordAbsoluteUrl: async () => {
                        return await this.broker.call("objectql.getRecordAbsoluteUrl", {
                            objectName,
                        })
                    },
                    getGridAbsoluteUrl: async () => {
                        return await this.broker.call("objectql.getGridAbsoluteUrl", {
                            objectName,
                        })
                    },
                    getRecordPermissionsById: async (recordId, userSession) => {
                        return await this.broker.call("objectql.getRecordPermissionsById", {
                            objectName,
                            recordId,
                        }, {
                            meta: {
                                user: userSession
                            }
                        })
                    },
                    getRecordPermissions: async (record, userSession) => {
                        return await this.broker.call("objectql.getRecordPermissions", {
                            objectName,
                            record,
                        }, {
                            meta: {
                                user: userSession
                            }
                        })
                    },
                    getRecordView: async (context, userSession) => {
                        return await this.broker.call("objectql.getRecordView", {
                            objectName,
                            context,
                        }, {
                            meta: {
                                user: userSession
                            }
                        })
                    },
                    createDefaultRecordView: async (userSession) => {
                        return await this.broker.call("objectql.createDefaultRecordView", {
                            objectName,
                        }, {
                            meta: {
                                user: userSession
                            }
                        })
                    },
                    getDefaultRecordView: async (userSession) => {
                        return await this.broker.call("objectql.getDefaultRecordView", {
                            objectName,
                        }, {
                            meta: {
                                user: userSession
                            }
                        })
                    },
                    getRelateds: async () => {
                        return await this.broker.call("objectql.getRelateds", {
                            objectName,
                        })
                    },
                    refreshIndexes: async () => {
                        return await this.broker.call("objectql.refreshIndexes", {
                            objectName,
                        })
                    },
                    allowRead: async (userSession) => {
                        return await this.broker.call("objectql.allowRead", {
                            objectName,
                        }, {
                            meta: {
                                user: userSession
                            }
                        })
                    },
                    allowInsert: async (userSession) => {
                        return await this.broker.call("objectql.allowInsert", {
                            objectName,
                        }, {
                            meta: {
                                user: userSession
                            }
                        })
                    },
                    allowUpdate: async (userSession) => {
                        return await this.broker.call("objectql.allowUpdate", {
                            objectName,
                        }, {
                            meta: {
                                user: userSession
                            }
                        })
                    },
                    allowDelete: async (userSession) => {
                        return await this.broker.call("objectql.allowDelete", {
                            objectName,
                        }, {
                            meta: {
                                user: userSession
                            }
                        })
                    }

                }
            }
        }

    },

    /**
     * Service created lifecycle event handler
     */
    created() {
    },

    merged(schema) {
    },

    /**
     * Service started lifecycle event handler
     */
    async started() {

    },

    /**
     * Service stopped lifecycle event handler
     */
    async stopped() {

    }
};
