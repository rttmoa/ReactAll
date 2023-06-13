import React, { useState, useEffect } from 'react';
import { Tabs } from 'antd-mobile';
import Lists from './components/Lists';
import { useHttpHook, useObserverHook } from '@/hooks';
import { CommonEnum } from '@/enums';
import { Http } from '@/utils';
import { isEmpty } from 'project-libs';
import { ErrorBoundary } from '@/components';
import './index.less';





// project-libs - npm
// useObserverHook()
export default function (props) {
  const [page, setPage] = useState(CommonEnum.PAGE); // 设置页码和每页的数量
  const [orders, setOrders] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const [type, setType] = useState(0);  // 设置类型：是未支付还是已支付
  // const [orders] = useHttpHook({
  //   url: '/order/lists',
  //   body: {
  //     ...page
  //   }
  // });

  // 执行Http
  const invokeHttp = async (pageNum) => {
    const result = await Http({
      url: '/orders/lists',
      body: {
        ...page,
        pageNum,
        type
      }
    });
    return result;
  };
  // 搜索订单
  const fetchOrder = async (pageNum) => {
    const result = await invokeHttp(pageNum);
    // console.log(result)
    if (!isEmpty(result) && result.length <= page.pageSize) {
      setOrders(result);
      setShowLoading(true);
    } else {
      setShowLoading(false);
    }
  };

  /***--- 切换 未支付/已支付 ---**/
  const handleChange = (e) => {
    // console.log(e)  //  {title: '已支付', sub: 1}  ||  {title: '未支付', sub: 0}
    setType(e.sub);
    setPage(CommonEnum.PAGE); // 枚举
    setOrders([]);
    setShowLoading(true);
  };
  const tabs = [
    { title: '未支付', sub: 0 },
    { title: '已支付', sub: 1 }
  ];

  /**
   * 1，页面初始化时候请求接口；
   * 2，监听loading组件是否展示出来；
   * 3，修改page,pageNum+1,再次重新请求接口；
   * 4，拼装数据，然后page
   */
  useObserverHook('#' + CommonEnum.LOADING_ID, async (entries) => {
    // console.log(entries[0])
    if (entries[0].isIntersecting) {
      const result = await invokeHttp(page.pageNum + 1);
      if (!isEmpty(orders) && !isEmpty(result) && result.length === page.pageSize) {
        setOrders([...orders, ...result]);
        setPage({
          ...page,
          pageNum: page.pageNum + 1
        });
        setShowLoading(true);
      } else {
        setShowLoading(false);
      }
    }
  }, null);

  useEffect(() => { fetchOrder(1) }, [type]) // 切换Tab时，类型改变，根据类型发请求



  return (
    <ErrorBoundary>
      <div className='order-page'>
        {/* Tab1：未支付 -- Tab2：已支付 */}
        <Tabs tabs={tabs} onChange={handleChange}>
          {/* 未支付 */}
          <div className='tab'>
            <Lists orders={orders} type={0} showLoading={showLoading} />
          </div>
          {/* 已支付 */}
          <div className='tab'>
            <Lists orders={orders} type={1} showLoading={showLoading} />
          </div>
        </Tabs>
      </div>
    </ErrorBoundary>
  )
}
