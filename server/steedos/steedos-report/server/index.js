// import path from 'path';
// import express from 'express';
// import requestHandler from './requestHandler';

// const app = express();
// const port = 3200;

// // app.get('/dist/main.css', function (req, res) {
// //   res.sendFile(path.join(__dirname, '/public/main.css'))
// // });
// app.use(requestHandler);

// app.use('/', express.static(path.resolve('build')));

// let stimulsoftAssets = path.join(path.dirname(require.resolve("@steedos/stimulsoft-report")), "assets");

// app
//     .disable('x-powered-by')
//     .use('/assets/stimulsoft-report/', express.static(stimulsoftAssets));

// app.listen(port, function (error) {
//     if (error) {
//         console.error(error)
//     } else {
//         console.info('==> Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port)
//     }
// });



import path from 'path';
import express from 'express';
import graphqlHTTP from 'express-graphql';
import _ from 'underscore';
import ReportRouter from './router';
import { initMrts } from './mrt';
import requestHandler from './requestHandler';
// import objectql from '@steedos/objectql';
const objectql = require("@steedos/objectql");

const port = 3200;
const rootUrl = "/api-v2/report";
process.env.PORT = port;

let stimulsoftAssets = path.join(path.dirname(require.resolve("@steedos/stimulsoft-report")), "assets");
let objectsDir = path.resolve('./objects')
let reportsDir = path.resolve('./reports')
objectql.getSteedosSchema().addDataSource('default', {
    driver: 'mongo',
    // url: 'mongodb://192.168.0.77/qhd-beta',
    url: 'mongodb://192.168.0.21/fssh20190329',
    objectFiles: [objectsDir],
    reportFiles: [reportsDir]
});
let app = express();
app.use(function (req, res, next) {
    //TODO 处理userId
    next();
})

_.each(objectql.getSteedosSchema().getDataSources(), function (datasource, name) {
    initMrts(datasource.getReports(), reportsDir);

    app.use(`/graphql/${name}`, graphqlHTTP({
        schema: datasource.buildGraphQLSchema(),
        graphiql: true
    }));
})

app
    .disable('x-powered-by')
    .use(`${rootUrl}/assets/stimulsoft-report/`, express.static(stimulsoftAssets))
    .use(`${rootUrl}`, ReportRouter.routes)

app.use(rootUrl, requestHandler);

app.use(rootUrl, express.static(path.resolve('build')));

app.listen(process.env.PORT || 3000, function (error) {
    if (error) {
        console.error(error)
    } else {
        console.info('==> Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port)
    }
});




