import React, { useState, useEffect, memo } from 'react';
import { history } from 'umi';
import Img from './360-202.png'



/** #### TODO: 最热民宿  */
function Hot(props) {
  // console.log("最热民宿 props", props)

  const handleClick = (id) => {
    history.push({
      pathname: '/house',
      query: { id }
    });
  }

  useEffect(() => {}, [])

  return (
    <div className='hot'>
      <h1>最热民宿</h1>
      <div className='hot-lists'>
        {props?.houses?.map(item => (
          <div className='hot-lists-item' key={item.id} onClick={() => handleClick(item.id)}>
            {/* <img className='img' alt='img' src={item?.imgs[0]?.url} onError={e => e.target.onerror = null}/> */}
            <img className='img' alt='img' src={Img} onError={e => e.target.onerror = null}/>
            <div className='title'><b>{item.title}</b></div>
            <div className='info'><b>{item.info}</b></div>
            <div className='price'>￥{item.price}</div>
          </div>
        ))}
      </div>
    </div>
  )
  // 如果尝试加载远程地址的图片失败，可能是以下原因导致的：
  //   1、图片 URL 错误：确保图片的 URL 是正确的，没有拼写错误或者遗漏的字符。
  //   2、跨域问题：如果远程服务器未设置正确的跨域策略（CORS），浏览器可能会阻止你从远程服务器加载图片。你可以检查浏览器的控制台，看是否有关于跨域问题的错误信息。
  //   3、图片不存在或已删除：可能图片已经从远程服务器上删除或移动到其他位置。
  //   4、网络问题：检查你的网络连接是否正常。网络不稳定或中断可能导致图片加载失败。
  //   5、服务器问题：远程服务器可能暂时不可用或者响应缓慢。稍后再尝试加载图片，看是否能成功。
}

export default memo(Hot);
