import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CommonEnum } from '@/enums';
import './index.less';





// NOTE: 滚动时，显示是加载还是无数据
export default function ShowLoading(props) {

  let loading = (<div id={CommonEnum.LOADING_ID} className='loading-info'>正在加载...</div>)
  let noData = (<div className='loading-info'>没有数据了~</div>)
  return (
    <div>
      {props.showLoading ? loading : noData}
    </div>
  )
}
ShowLoading.defaultProps = {
  showLoading: true,
};
ShowLoading.propTypes = {
  showLoading: PropTypes.bool
};
