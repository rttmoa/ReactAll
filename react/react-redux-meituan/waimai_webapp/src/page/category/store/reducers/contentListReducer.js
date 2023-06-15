import { GET_LIST_DATA } from '../actions/actionTypes';

const initState = {
    list: [], // 商家数据
    filterData: null, // 每次点击的过滤条件
    page: 0, // 初始页码为0
    isend: false, // 是否最后的数据
};

/***--- 这个滚动加载控制不好 ---**/
const getListData = (state, action) => {
    // console.log("getListData-state", state)
    // console.log("getListData-action", action)
    let _listData = [];
    let _filterData = action.filterData || state.filterData;
    let _page = action.toFirstPage ? 0 : state.page;
    let _isend = false;
    if (_page === 0) {
        _listData = action.obj.data.poilist;
    } else {
        _listData = state.list.concat(action.obj.data.poilist);
    }
    _page = _page + 1;
    if (_page > 3) {
        _isend = true;
    }
    // console.log("getListData-state2222", state)
    return { ...state, list: _listData, filterData: _filterData, page: _page, isend: _isend};
}

const contentListReducer = (state = initState, action) => {
    switch(action.type) {
        case GET_LIST_DATA: return getListData(state, action);
        default: return state;
    }
}

export default contentListReducer;