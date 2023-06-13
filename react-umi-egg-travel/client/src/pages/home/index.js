import React, { useState, useEffect } from 'react';
import Header from './components/header';
import Search from './components/search';
import Hot from './components/hot';
import { useHttpHook } from '@/hooks';
import { ErrorBoundary } from '@/components';

import house from './components/json';
import './index.less';



/***--- 首页 ---**/
export default function (props) {

  const [city, setState] = useState([{ label: '杭州', value: '10001' }, { label: '苏州', value: '10002' }])
  const [citys, citysLoading] = useHttpHook({url: '/commons/citys'});
  const [houses] = useHttpHook({url: '/house/hot'});
  // console.log("houses", houses)


  return (
    <ErrorBoundary>
      <div className='home'>

        {/**header登录 */}
        <Header />

        {/**搜索 */}
        {city && <Search citys={city} citysLoading={citysLoading} />}

        {/**最热民宿 */}
        {houses && <Hot houses={houses} />}

      </div>
    </ErrorBoundary>
  )

}
