import React, { useState, useEffect } from 'react';
import AwesomeSwiper from 'react-awesome-swiper';
import Img from './02.png'



/***--- react-awesome-swiper ---**/
export default function (props) {
  // console.log("Banner", props)
  // {
  //   banner: [
  //     {
  //         "url": "http://img3.mukewang.com/szimg/5d1032ab08719e0906000338-360-202.jpg"
  //     },
  //     {
  //         "url": "http://img2.mukewang.com/szimg/5dc9047a09bae31e12000676-360-202.png"
  //     },
  //     {
  //         "url": "http://img2.mukewang.com/szimg/5ad05dc00001eae705400300-360-202.jpg"
  //     }
  //   ]
  // }
  const [config, setConfig] = useState({
    loop: true,
    autoplay: {
      delay: 600
    },
    pagination: {
      el: '.swiper-pagination'
    }
  })

  useEffect(() => {}, [])

  return (
    <AwesomeSwiper className='banner' config={config}>
      <div className='swiper-wrapper'>
        {props?.banner?.map(item => (
          <div className='swiper-slide' key={item.id}>
            {/* <img alt='banner' src={item.url} /> */}
            <img alt='banner' src={Img} />
          </div>
        ))}
      </div>
      <div className='swiper-pagination'></div>
    </AwesomeSwiper>
  )
}
