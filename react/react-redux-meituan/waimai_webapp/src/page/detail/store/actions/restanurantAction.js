import {  RESTANURANT_DATA  } from './actionTypes';
import axios from 'axios';
import qs from 'component/queryString';




/**--- dispatch 商家信息 ---**/
export const getRestanurantData = () =>async(dispatch)=>{
    let id = qs('id');
    // console.log(id) // http://localhost:8080/detail.html?id=520752902260751#/restanurant   |||   520752902260751
    window.Rohr_Opt.Flag = 100011;
    let token = window.Rohr_Opt.reload('/ajax/v6/poi/info?wmpoiid=' + id);
    // console.log(token)
    // console.log(window)

    let resp = await axios({
      method: 'get',
      url: './json/restanurant.json',
      data: {
        url: encodeURIComponent('http://i.waimai.meituan.com/ajax/v6/poi/info?_token=' + token),
        params: {
          wmpoiid: id,
          uuid: "NxAlVM4plX_ixoEsoR4KJSuHBLo944rRZK5hwXfdReHfnuBqqar92I-K5PvFYuvi",
          platform: '3',
          partner: '4',
          userid: '280770501',
          xforwith: window.xforwith
        }
      }
    });
    // console.log(resp.data)
    if(resp.status === 200){
      dispatch({
        type: RESTANURANT_DATA,
        obj: resp.data
      })
    }
}