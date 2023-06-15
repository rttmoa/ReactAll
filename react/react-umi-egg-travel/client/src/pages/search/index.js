import React, { useState, useEffect } from 'react';
import { SearchBar, ActivityIndicator } from 'antd-mobile';
import { useHttpHook, useObserverHook, useImgHook } from '@/hooks';
import { useLocation } from 'umi';
import { ShowLoading } from '@/components';
import { CommonEnum } from '@/enums';
import Img from './2.png'
import './index.less';




// 时间从 2013-至今就有数据了

// http://localhost:8000/#/search?code=10001&endTime=%202013-04-14&startTime=2023-04-13%20
export default function (props) {
  const { query } = useLocation();
  const [houseName, setHouseName] = useState("");  // 设置民宿名
  const [page, setPage] = useState(CommonEnum.PAGE);
  const [houseLists, setHouseLists] = useState([]); // 设置民宿数组
  const [showLoading, setShowLoading] = useState(true);  // 显示加载还是更多数据
  const [houseSubmitName, setHouseSubmitName] = useState(""); // 设置提交民宿名
  // console.log("query", query)  // {code: '10002', endTime: ' 2003-04-14', startTime: '2023-06-16 '}


  // TODO: 根据地址栏参数 发送到接口中 抓数据
  const [houses, loading] = useHttpHook({
    url: '/house/search',
    body: {
      ...page,
      houseName,
      code: query?.code,
      startTime: "2023-04-13" + " 00:00:00",  // 先给个默认值, 原： startTime: query?.startTime + " 00:00:00"
      endTime: "2003-04-13" + ' 23:59:59'     // 先给个默认值, 原： endTime: query?.endTime + ' 23:59:59'
    },
    watch: [page.pageNum, houseSubmitName] // 监听 page 和 houseSubmitName
  });

  /**
   * TODO: useObserverHook
   * 1，监听loading是否展示出来；
   * 2，修改分页数据；
   * 3，监听分页数据的修改，发送接口，请求下一页的数据；
   * 4，监听loading变化，拼装数据
   */
  useObserverHook('#' + CommonEnum.LOADING_ID, (entries) => {
    if (!loading && entries[0].isIntersecting) {
    // console.log(entries) // [IntersectionObserverEntry]
    // FIXME: 如果滚动了 加载下一页 useHttpHook监听watch
      setPage({
        ...page,
        pageNum: page.pageNum + 1
      });
    }
  }, null);

  // TODO: useImgHook
  useImgHook('.item-img', (enties)=>{}, null);

  /** #### 输入框 值改变   @description 设置民宿名 ---*/
  const handleChange = (value) => { setHouseName(value); };

  /** #### 输入框 取消 ---*/
  const handleCancle = () => {  }; // _handleSubmit('');

  const _handleSubmit = (value) => {
    setHouseName(value);
    setHouseSubmitName(value);
    setPage(CommonEnum.PAGE);
    setHouseLists([]);
  };
  /** #### 输入框 提交   @despri  设置民宿名 + 设置提交民宿名 + 设置Page + 设置House为[] ---*/
  const handleSubmit = (value) => { _handleSubmit(value); };

  // TODO: useEffect
  useEffect(() => {
    if (!loading && houses) {
      if(houses.length){
        setHouseLists([...houseLists, ...houses]);
        if(houses.length < page.pageSize){
          setShowLoading(false);
        }
      }else {
        setShowLoading(false);
      }
    }
  }, [loading])


  console.log("民宿Array", houseLists.length)
  return (
    <div className='search-page'>

      {/**顶部搜索栏 */}
      <SearchBar
        placeholder='搜索民宿'
        value={houseName}
        onChange={handleChange}
        onCancel={handleCancle}
        onSubmit={handleSubmit}
      />

      {/**搜索结果 */}
      {!houseLists.length ? <ActivityIndicator toast /> : <div className='result'>
          {houseLists.map((item, index) => (
            <div className='item' key={index}>
              {/* <img alt='img' className='item-img' src={require('../../assets/blank.png')} data-src={item?.imgs[0]?.url} /> */}
              <img alt='img' className='item-img' src={require('../../assets/blank.png')} data-src={Img} />
              <div className='item-right'>
                <div className='title'>{item.name}</div>
                <div className='price'>￥{item.price}</div>
              </div>
            </div>
          ))}
          <ShowLoading showLoading={showLoading} />
        </div>
      }

    </div>
  )
}
