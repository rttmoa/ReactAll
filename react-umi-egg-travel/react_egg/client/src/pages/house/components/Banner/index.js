import React, { useState, useEffect } from 'react';
import AwesomeSwiper from 'react-awesome-swiper';
import Img from './02.png'



/***--- react-awesome-swiper ---**/
export default function (props) {
  // console.log("Banner", props)

  const [config, setConfig] = useState({
    loop: true,
    autoplay: {
      delay: 1500
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
