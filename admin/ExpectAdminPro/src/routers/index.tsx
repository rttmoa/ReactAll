import { useState, useEffect } from "react";
import { RouterProvider as Router, RouteObject, createHashRouter, createBrowserRouter } from "react-router-dom";
import { convertToDynamicRouterFormat } from "./helper/ConvertRouter";
import { wrappedStaticRouter } from "./modules/staticRouter"; // 静态 Router
import { RootState, useSelector } from "@/redux";
import { RouteObjectType } from "./interface";
import useTheme from "@/hooks/useTheme";
import useMessage from "@/hooks/useMessage";
import usePermissions from "@/hooks/usePermissions";
import NotFound from "@/components/Error/404";
const mode = import.meta.env.VITE_ROUTER_MODE;

// todo 路由
// todo 处理主题
// todo 处理全局 Message、Modal、notification
// todo 处理用户权限
// todo finially 处理 <Route />
const RouterProvider: React.FC = () => {
  // console.log("登陆成功/刷新页面 进入 routers");

  // 自定义 Hooks
  useTheme(); // ! 使用 主题
  useMessage(); // ! 使用 消息

  const { initPermissions } = usePermissions();

  const token = useSelector((state: RootState) => state.user.token);
  const authMenuList = useSelector((state: RootState) => state.auth.authMenuList); // ! authMenuList: 接口中获取的菜单列表
  const [routerList, setRouterList] = useState<RouteObjectType[]>(wrappedStaticRouter); // ! 静态路由 -> 所有路由

  useEffect(() => {
    // 刷新页面时，redux 中没有菜单列表
    if (!authMenuList.length) {
      initPermissions(token);
      return;
    }

    /** #### 处理动态路由  */
    const dynamicRouter = convertToDynamicRouterFormat(authMenuList); // ! 接口菜单列表 转换为 react-router 所需的路由结构
    let allRouter = [...wrappedStaticRouter, ...dynamicRouter];

    allRouter.forEach(item => item.path === "*" && (item.element = <NotFound />)); // 为了防止404刷新页面，在最后添加*路由

    setRouterList(allRouter);
  }, [authMenuList]);

  // console.log(routerList); // 6个static + 3个dynamic
  const routerMode = {
    hash: () => createHashRouter(routerList as RouteObject[]),
    history: () => createBrowserRouter(routerList as RouteObject[])
  };
  return <Router router={routerMode[mode]()} />;
  // Props：<Route path={item.path} exact={item.exact} render={item.render} key={index} component {...props} />
};
// 处理路由，返回 <Route /> 组件
export default RouterProvider;
