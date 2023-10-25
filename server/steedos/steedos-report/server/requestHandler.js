import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router';
import App from "../src/App";
import buildPath from '../build/asset-manifest.json';
import routes from '../src/routes';
import { matchRoutes } from 'react-router-config';

export default async (req, res, next) => {
    if (req.url.startsWith('/static/') || req.url.startsWith('/assets/') || req.url.startsWith('/favicon.ico')) {
        return next()
    }
    const rootUrl = "/api-v2/report";

    const loadBranchData = async (branch) => {
        const promises = branch.map(({ route, match }) => {
            return route.loadData
                ? route.loadData(match)
                : Promise.resolve(null);
        });
        return await Promise.all(promises).then();
    }
    // useful on the server for preloading data
    const branch = matchRoutes(routes, req.url);
    let data = await loadBranchData(branch);

    const context = { data };
    const frontComponents = renderToString(
        <StaticRouter location={req.url} context={context}>
            <App />
        </StaticRouter>
    );
    if (context.status === 404) {
        res.status(404);
    }
    if (context.url) {
        res.writeHead(301, {
            Location: context.url
        });
        res.end();
    } else {
        const reportBranch = branch.find(({ route, match }) => {
            return route.isReport;
        });
        let isReport = !!reportBranch;
        let reportHeadTags = "";
        let reportScriptTags = "";
        if (isReport){
            reportHeadTags = `
                <link href="${rootUrl}/assets/stimulsoft-report/css/stimulsoft.viewer.office2013.whiteblue.css" rel="stylesheet">
                <link href="${rootUrl}/assets/stimulsoft-report/css/stimulsoft.designer.office2013.whiteblue.css" rel="stylesheet">
                <script src="${rootUrl}/assets/stimulsoft-report/js/stimulsoft.reports.js" type="text/javascript"></script>
                <script src="${rootUrl}/assets/stimulsoft-report/js/stimulsoft.dashboards.js" type="text/javascript"></script>
                <script src="${rootUrl}/assets/stimulsoft-report/js/stimulsoft.viewer.js" type="text/javascript"></script>
                <script src="${rootUrl}/assets/stimulsoft-report/js/stimulsoft.designer.js" type="text/javascript"></script>
            `;
            reportScriptTags = `
                <script type="text/javascript">
                    let options = new window.Stimulsoft.Designer.StiDesignerOptions();
                    options.appearance.fullScreenMode = false;
                    let designer = new window.Stimulsoft.Designer.StiDesigner(options, 'StiDesigner', false);
                    let report = new window.Stimulsoft.Report.StiReport();
                    let reportId = "contracts";
                    report.loadFile("${rootUrl}/mrt/" + reportId);
                    designer.report = report;
                    designer.renderHtml("report-designer");
                    designer.onSaveReport = async function (args) {
                        // 保存报表模板
                        let jsonReport = args.report.saveToJsonString();
                        let response = await fetch("${rootUrl}/mrt/" + reportId, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: jsonReport
                        });
                        if (!response.ok){
                            window.Stimulsoft.System.StiError.showError("保存失败", true);
                        }
                    }
                    if(!report.getDictionary().dataSources.count){
                        window.Stimulsoft.System.StiError.showError("未找到报表", true);
                    }
                </script>
            `;
        }
        const frontHtml = `<!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
                    <meta name="theme-color" content="#000000">
                    <title>Steedos Report</title>
                    <link rel="stylesheet" type="text/css" href="${rootUrl}${buildPath.files["main.css"]}">
                    ${reportHeadTags}
                </head>
                <body>
                    <noscript>
                    You need to enable JavaScript to run this app.
                    </noscript>
                    <div id="root">${frontComponents}</div>
                    <script src="${rootUrl}${buildPath.files['main.js']}"></script>
                    ${reportScriptTags}
                </body>
            </html>`

        res.write(frontHtml);
        res.end();
    }
}

