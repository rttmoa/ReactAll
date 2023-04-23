import { GET_LIST_DATA } from './actionTypes';
import axios from 'axios';




/***--- 获取列表数据 ---**/
export const getListData = (obj) => {
    // console.log("getListData", obj) // {filterData: {…}, toFirstPage: true}

    return async (dispatch, getState) =>{
        dispatch({
            type: 'SETLOADSTATE',
            obj: false
        });
        let url = './json/homelist.json'; // 刚进入页面时
        if (obj.filterData || getState().contentListReducer.filterData) {
            url = './json/listparams.json'; // 点击了过滤条件后
        }
        let resp = await axios({
            method: 'get',
            url: url
        }); 
    
        // eslint-disable-next-line no-undef
        setTimeout(() => {
            dispatch({
                type: GET_LIST_DATA,
                filterData: obj.filterData, //  {code: 101786, name: '包子粥店', quantity: 61, icon_url: '', click_url: '', …}
                toFirstPage: obj.toFirstPage, // true/false
                obj: resp.data
            })
            dispatch({
                type: 'SETLOADSTATE',
                obj: true
            });
        }, 500)
    
    }
}