import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CommonEnum } from '@/enums';
import './index.less';







export default function ShowLoading(props) {

  let loading = (<div id={CommonEnum.LOADING_ID} className='loading-info'>loading...</div>)
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
