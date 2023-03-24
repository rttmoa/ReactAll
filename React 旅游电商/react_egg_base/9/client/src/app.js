import { cookie } from 'project-libs';
import { history } from 'umi';

export function onRouteChange(route){
  // console.log(route)
  const nowPath = route.routes[0].routes.filter(item => item.path === route.location.pathname);
  // const isLogin = cookie.get('user');
  const isLogin = localStorage.getItem('token');

  if(nowPath.length === 1 && nowPath[0].auth && !isLogin){
    history.push({
      pathname: '/login',
      query: {
        from: route.location.pathname
      }
    });
  }
}