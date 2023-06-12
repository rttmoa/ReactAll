import ReportList from './components/report-list';
import ReportDesigner from './components/report-designer';
import ReportViewer from './components/report-viewer';
import NotFound from './components/not-found';

import loadData from './helpers/load-data';

const Routes = [
    {
        path: '/ui/',
        exact: true,
        component: ReportList,
        loadData: () => loadData('list', true)
    },
    {
        path: '/ui/:id',
        exact: true,
        component: ReportViewer,
        isReport: true
    },
    {
        path: '/ui/designer/:id',
        exact: true,
        component: ReportDesigner,
        isReport: true
    },
    {
        path: '/ui/viewer/:id',
        exact: true,
        component: ReportViewer,
        isReport: true
    },
    {
        component: NotFound
    }
];

export default Routes;