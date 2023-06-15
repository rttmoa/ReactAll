import React, { useState, useEffect } from 'react';
import Banner from './components/Banner';
import Info from './components/Info';
import Lists from './components/Lists';
import Footer from './components/Footer';
import { useStoreHook } from 'think-react-store';
import { useObserverHook } from '@/hooks';
import { CommonEnum } from '@/enums';
import { useLocation } from 'umi';
import './index.less';






/***--- 预定界面 ---**/
export default function (props) {
  const {
    house: {
      detail,
      getDetailAsync,

      getCommentsAsync,
      comments,
      reloadComments,
      reloadCommentsNum,

      showLoading,
      resetData,

      order,
      hasOrderAsync,
      addOrderAsync,
      delOrderAsync,
    },
  } = useStoreHook();
  // console.log(order) // {createTime: 1681389574000, updateTime: 0, id: 10, orderNumber: null, userId: 1, …}


  const { query } = useLocation();  // http://localhost:8000/#/house?id=3
  // console.log(query) // {id: 3}

  /** #### 预定民宿 / 取消预定 ---*/
  const handleBtnClick = (id) => { // 预定民宿： 传递过来的参数  如果有id那么就是取消预定， 如果没有id那么就是预定民宿
    if (!id) {
      addOrderAsync({
        id: query?.id,
      });
    } else {
      delOrderAsync({
        id: query?.id,
      });
    }
  };

  /**
   * 1，监听loading是否展示出来
   * 2，出发reload，修改分页
   * 3，监听reload变化，重新请求接口
   * 4，拼装数据
   */
  useObserverHook('#' + CommonEnum.LOADING_ID, (entries) => {
      // console.log(entries)
      if (comments && comments.length && showLoading && entries[0].isIntersecting) {
        reloadComments();
      }
    },
    [comments, showLoading],
  );

  useEffect(() => {
    // 获取订单详情
    getDetailAsync({
      id: query?.id,
    });
  }, []);

  useEffect(() => {
    // 获取评论数据
    getCommentsAsync({
      id: query?.id,
    });
  }, [reloadCommentsNum]);

  useEffect(() => {
    // 是否有订单
    hasOrderAsync({
      id: query?.id,
    });
  }, []);

  useEffect(() => {
    return () => {
      resetData({
        detail: {},
      });
    };
  }, []);


  // console.log("comments", comments) // 请求评论数据 失败
  const fakeCommonts = [{id:2, createTime: "2022", msg: "测试评论2"},{id:3, createTime: "2022", msg: "测试评论3"}]
  return (
    <div className="house-page">

      {/**轮播图 */}
      <Banner banner={detail?.banner} />

      {/**民宿信息 */}
      <Info detail={detail?.info} order={order} btnClick={handleBtnClick} />

      {/**评论列表 */}
      <Lists lists={fakeCommonts} showLoading={showLoading} />

      {/**footer 评论 */}
      <Footer />

    </div>
  );
}
