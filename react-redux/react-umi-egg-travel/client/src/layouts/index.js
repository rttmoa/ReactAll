import { MenuBar } from '@/components';
import { useLocation } from 'umi';
import { StoreProvider } from 'think-react-store';
import * as store from '../stores';






function BasicLayout(props) {
  const location = useLocation();
  const paths = ['/', '/order', '/user'];
  // console.log("pathname", location.pathname) //-->    /    /user    /order

  return (
    <StoreProvider store={store}>

      {/* 这是底部的 Menu */}
      <MenuBar show={paths.includes(location.pathname)} pathname={location.pathname}/>

      {/* 这是页面中的内容 Children */}
      {props.children}

    </StoreProvider>
  );
}

export default BasicLayout;
