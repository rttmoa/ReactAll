export default {
  npmClient: "yarn",
  fastRefresh: true,
  dva: {},
  plugins: ["@umijs/plugins/dist/dva",
    "@umijs/plugins/dist/locale",
    "@umijs/plugins/dist/qiankun",
    "@umijs/plugins/dist/model",
  ],
  history: {
    type: 'hash'
  },
  // 启用本地化配置
  locale: {
    default: 'zh-CN',
    antd: true,
    title: true,
    baseNavigator: true,
    baseSeparator: '-',
  },
  theme: {
    'primary-color': '#ff5c28',
    'table-header-bg': '#1c1b1b',
    'table-header-color': '#ffffff',
    'table-selected-row-bg': '#1c1b1b',
    'table-header-sort-bg': '#1c1b1b',
    'table-body-sort-bg': '#1c1b1b',
    'table-row-hover-bg': '#1b1d23',
    'table-border-color': 'rgba(0,0,0,0)',
    'tabs-card-head-background': '#1b1d23',
    'tabs-card-gutter': '0',
    'tabs-card-tab-active-border-top': '2px solid #ffffff',
    'text-color': '#ffffff',
    'body-background': '#1c1b1b',
    'component-background': '#1c1b1b',
    'layout-body-background': '#1c1b1b',
    'layout-header-background': '#1c1b1b',
    'menu-item-active-bg': 'rgba(0,0,0,0)',
  },
  model: {},
  routes: [
    { path: '/', redirect: '/transfer' },
    {
      path: '/transfer',
      title: 'Send Finance',
      component: '@/pages/Transfer',
    },
    {
      path: '/pool',
      title: 'Send Finance',
      component: '@/pages/Pool',
      wrappers: [
        '@/wrappers/auth',
      ],
    },
  ],
  proxy: {
    '/api': {
      'target': 'http://147.182.251.92:3000',
      'changeOrigin': true,
    },
  },
};
