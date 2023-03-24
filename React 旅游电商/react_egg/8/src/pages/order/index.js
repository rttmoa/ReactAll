import React, { useState, useEffect } from 'react';
import { Tabs } from 'antd-mobile';
import Lists from './components/Lists';
import { useHttpHook, useObserverHook } from '@/hooks';
import { CommonEnum } from '@/enums';
import { Http } from '@/utils';
import { isEmpty } from 'project-libs';

import './index.less';
import order from '../../../mock/order';

export default function (props) {
  const [page, setPage] = useState(CommonEnum.PAGE);
  const [orders, setOrders] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const [type, setType] = useState(0);
  // const [orders] = useHttpHook({
  //   url: '/order/lists',
  //   body: {
  //     ...page
  //   }
  // });

  const invokeHttp = async (pageNum) => {
    const result = await Http({
      url: '/order/lists',
      body: {
        ...page,
        pageNum,
        type
      }
    });
    return result;
  };

  const fetchOrder = async (pageNum) => {
    const result = await invokeHttp(pageNum);
    if (!isEmpty(result) && result.length === page.pageSize) {
      setOrders(result);
      setShowLoading(true);
    } else {
      setShowLoading(false);
    }
  };

  const handleChange = (e) => {
    // console.log(e)
    setType(e.sub);
    setPage(CommonEnum.PAGE);
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
    console.log(entries)
    if (entries[0].isIntersecting) {
      const result = await invokeHttp(page.pageNum + 1);
      if (!isEmpty(orders) && !isEmpty(result) && result.length === page.pageSize) {
        setOrders([...orders, ...result]);
        setPage({
          ...page,
          pageNum: page.pageNum + 1
        });
        setShowLoading(true);
      }else {
        setShowLoading(false);
      }
    }
  }, null);

  useEffect(() => {
    fetchOrder(1);
  }, [type])

  return (
    <div className='order-page'>
      <Tabs
        tabs={tabs}
        onChange={handleChange}
      >
        <div className='tab'>
          <Lists orders={orders} type={0} showLoading={showLoading} />
        </div>
        <div className='tab'>
          <Lists orders={orders} type={1} showLoading={showLoading} />
        </div>
      </Tabs>
    </div>
  )
}