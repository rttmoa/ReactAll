import React from 'react';
import Loadable from 'react-loadable';



/**--- 懒加载 - 加载器加载 ---**/
const LoadableComponent = Loadable({
  loader: () => import('./'),
  loading() {
  	return <div>正在加载</div>
  }
});

export default () => <LoadableComponent/>
