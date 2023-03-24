import React, { useState, useEffect } from 'react';
import { history } from 'umi';
import { useObserverHook } from '@/hooks';

let observer;
export default function(props){
  const [state, setState] = useState()

  useObserverHook('#loading', (entries)=>{
    console.log(entries)
  });

  const handleClick = () => {
    history.push('/');
  };

  // useEffect(() => {
  //   console.log('进入页面')
  //   observer = new IntersectionObserver(entries => {
  //     console.log(entries)
  //   });
  //   observer.observe(document.querySelector('#loading'));

  //   return () => {
  //     console.log('离开页面')
  //     if(observer){
  //       // 解绑元素
  //       observer.unobserve(document.querySelector('#loading'));

  //       // 停止监听
  //       observer.disconnect();
  //     }
  //   }
  // }, [])

  return (
    <div>
      observer
      <button onClick={handleClick}>首页</button>
      <div id='loading' style={{width:'100px',height:'100px',background:'#f60', marginTop:'1000px'}}>
        loading
      </div>
    </div>
  )
}