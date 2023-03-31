/*青岛研锦网络科技有限公司  版权所有*/

// 本资源来源于云码资源淘宝店铺
// 访问地址：https://shop188702750.taobao.com
// 更多超优质资源欢迎访问
import { createStore, applyMiddleware, compose } from 'redux'

import rootReducer from './reducers'

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose

const middlewares = []

const enhancer = composeEnhancers(
  applyMiddleware(...middlewares)
)

export default function configStore() {
  return createStore(rootReducer, enhancer)
}
