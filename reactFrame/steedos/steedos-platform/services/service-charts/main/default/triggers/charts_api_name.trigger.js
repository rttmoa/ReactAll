const apiName = require('./api_name');
const _ = require('lodash');
module.exports = {
    listenTo: 'charts',

    beforeInsert: async function(){
        const {object_name, doc, spaceId} = this;
        const isUnique = await apiName.isSpaceUnique(spaceId, object_name, doc, doc.name)
        if(!isUnique){
            throw new Error('Api Name 不能重复');
        }
    },

    beforeUpdate: async function(){
        const {object_name, doc, spaceId, id} = this;
        if(_.has(doc, 'name')){
            const isUnique = await apiName.isSpaceUnique(spaceId, object_name, doc, doc.name, id)
            if(!isUnique){
                throw new Error('Api Name 不能重复');
            }
        }
    }
}