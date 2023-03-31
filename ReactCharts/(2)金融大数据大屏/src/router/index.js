/*青岛研锦网络科技有限公司  版权所有*/

// 本资源来源于云码资源淘宝店铺
// 访问地址：https://shop188702750.taobao.com
// 更多超优质资源欢迎访问
import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from '@/pages/Home'

const BasicRoute = () => (
  <Switch>
    <Route path="/" exact component={Home} />
  </Switch>
)

export default BasicRoute
