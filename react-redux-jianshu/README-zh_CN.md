# 仿简书

技术栈：react + redux + styled-components + immutable.fromJS + react-loadable + react-transition-group

**项目较小，查看实现功能**


一、使用加载器懒加载页面

```
import Loadable from 'react-loadable';
/**--- 懒加载 - 加载器加载 ---**/
const LoadableComponent = Loadable({
  loader: () => import('./'),
  loading() {return <div>正在加载</div>
  }
}); 
export default () => <LoadableComponent/>
```

二、es6导出全部供组件使用

```
import reducer from './reducer';
import * as actionCreators from './actionCreators';
import * as constants from './constants';
export { reducer, actionCreators, constants };
```
