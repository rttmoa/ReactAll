import { CHANGE_TAB,GET_FILTER_DATA,CHANGE_FILTER } from './actionTypes';
import axios from 'axios';




export const changeTab = (obj)=> (dispatch) =>{
    dispatch({
        type: CHANGE_TAB,
        obj: obj
    })
}

/**--- 获取分类列表中：全部分类、综合排序、满返代金券 所有数据 ---**/
export const getFilterData = ()=> async (dispatch) =>{
    let resp = await axios({
        url: './json/filter.json',
        method: 'get'
    });
    dispatch({
        type: GET_FILTER_DATA,
        obj: resp.data
    })
}


export const changeFilter = (obj)=> (dispatch) =>{
    dispatch({
        type: CHANGE_FILTER,
        obj: obj
    })
    dispatch({
        type: CHANGE_TAB,
        obj: {
            closePanel: true
        }
    })
}
