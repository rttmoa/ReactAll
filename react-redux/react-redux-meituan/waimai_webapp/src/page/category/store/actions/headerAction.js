import { CHANGE_TAB,GET_FILTER_DATA,CHANGE_FILTER } from './actionTypes';
import axios from 'axios';




/***--- 切换 tabs ---**/
export const changeTab = (obj) => {
    // console.log("obj", obj) // {activeKey: 'type', closePanel: false} || {activeKey: 'filter', closePanel: true}
    return (dispatch) => {
        dispatch({
            type: CHANGE_TAB,
            obj: obj
        })
    }
}

/**--- 获取分类列表中：全部分类、综合排序、筛选 所有过滤条件 ---**/
export const getFilterData = () => {
    return async (dispatch) => {
        let resp = await axios({
            url: './json/filter.json',
            method: 'get'
        })
        // console.log("过滤条件", resp.data) 
        // {data: 0, data: {category_filter_list: Array(14), sort_type_list: Array(6), activity_filter_list: Array(3)}, msg:"成功"}
        dispatch ({
            type: GET_FILTER_DATA,
            obj: resp.data
        })
    }
}


export const changeFilter = (obj) => {
    // console.log("changeFilter", obj) // {item: {…}, key: 'type'}||{item: {…}, key: 'filter'}||{item: {…}, key: 'cate'}
    return (dispatch) =>{
        dispatch({
            type: CHANGE_FILTER,
            obj: obj
        })
        dispatch({
            type: CHANGE_TAB,
            obj: {
                closePanel: true // FIXME: 点击条件后，关闭面板 && 发送请求获取数据
            }
        })
    }
}
