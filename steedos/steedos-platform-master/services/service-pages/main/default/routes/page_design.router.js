/*
 * @Author: baozhoutao@steedos.com
 * @Date: 2022-04-04 16:34:28
 * @Description: 
 */
const express = require('express');
const router = express.Router();
const core = require('@steedos/core');
const ejs = require('ejs');
const fs = require('fs');
const _ = require('lodash');
const path = require('path');
const objectql = require('@steedos/objectql');
router.get('/api/pageDesign', core.requireAuthentication, async function (req, res) {
    try {
        res.set('Content-Type', 'text/html');
        const userSession = req.user;
        let assetUrls = req.query.assetUrls;
        const assetUrl = `assetUrl=${assetUrls.split(',').join("&assetUrl=")}&`;

        // const dataContext = {
        //     rootUrl: __meteor_runtime_config__.ROOT_URL,
        //     tenantId: userSession.spaceId,
        //     userId: userSession.userId,
        //     authToken: userSession.authToken
        // }
        const page = await objectql.broker.call(`page.getLatestPageVersion`, {pageId: req.query.pageId});
        const retUrl = __meteor_runtime_config__.ROOT_URL + '/app/admin/pages/view/' + req.query.pageId
        const steedosBuilderUrl = process.env.STEEDOS_BUILDER_URL || 'https://builder.steedos.cn';
        const builderHost = `${steedosBuilderUrl}/amis?${assetUrl}retUrl=${retUrl}&pageType=${page.type}`;

        // let data = fs.readFileSync(__dirname+'/design.html', 'utf8');
        // res.send(data.replace('SteedosBuilderHost',steedosBuilderHost).replace('DataContext', JSON.stringify(dataContext)));

        const filename = __dirname+'/page_design.ejs'
        const data = {
            builderHost,
            assetUrls,
            rootUrl: __meteor_runtime_config__.ROOT_URL,
            tenantId: userSession.spaceId,
            userId: userSession.userId,
            authToken: userSession.authToken,
            pageId: req.query.pageId,
        }
        const options = {}
        ejs.renderFile(filename, data, options, function(err, str){
            // str => Rendered HTML string
            res.send(str);
        });

    } catch (error) {
        res.status(500).send({ message: error.message });
    }

});
exports.default = router;