import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter); // Vue.use 全局router





const routes = [
  {
    path: "/",
    redirect: {
      name: "index",
    },
  },
  {
    // 首页
    path: "/index",
    name: "index",
    component: () =>
      import(/* webpackChunkName: "index" */ "./views/Home/Index.vue"),
  },
  {
    // 归档
    path: "/archives",
    name: "archives",
    component: () =>
      import(/* webpackChunkName: "archives" */ "./views/Archives/Index.vue"),
  },
  {
    // 分类
    path: "/categories",
    name: "categories",
    component: () =>
      import(
        /* webpackChunkName: "categories" */ "./views/Categories/Index.vue"
      ),
  },
  {
    // 分类详情
    path: "/categories/details",
    name: "categoriesDetails",
    component: () =>
      import(
        /* webpackChunkName: "categories" */ "./views/Categories/Details.vue"
      ),
  },
  {
    // 标签
    path: "/tags",
    name: "tags",
    component: () =>
      import(/* webpackChunkName: "tags" */ "./views/Tags/Index.vue"),
  },
  {
    // 标签详情
    path: "/tags/details",
    name: "tagsDetails",
    component: () =>
      import(/* webpackChunkName: "tags" */ "./views/Tags/Details.vue"),
  },
  {
    // 关于
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "./views/About/Index.vue"),
  },
  {
    // 文章
    path: "/articles",
    name: "articles",
    component: () =>
      import(/* webpackChunkName: "articles" */ "./views/Articles/Index.vue"),
  },
  {
    // 文章详情
    path: "/articles/details",
    name: "articlesDetails",
    component: () =>
      import(/* webpackChunkName: "articles" */ "./views/Articles/Details.vue"),
  },
  {
    // 用户中心
    path: "/user",
    name: "user",
    component: () =>
      import(/* webpackChunkName: "user" */ "./views/User/Index.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
