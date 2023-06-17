import { COMMENT_LIST_DATA } from '../actions/actionTypes.js';


const initState = {
    commentData: {}, // 接口中 每次获取的评论
    commentList: []  // 接口中 所有的评论集合
};
/** #### 客户评价的数据： 好评 / 差评 ---*/
const getListData = (state, action) => {
    // console.log(action) // action: {type: 'COMMENT_LIST_DATA', obj: {data: {…}, code: 0, msg: '成功'}} 
    console.log("reducers commentList 客户评价的数据", action.obj.data)
    let list = [];
    if (state.commentList.length > 0) {
        list =  state.commentList.concat(action.obj.data.comments); // 需拼接之前的数据
    } else {
        list = action.obj.data.comments; // 第一次获取的数据
    }
    return {
        ...state, 
        commentData: action.obj.data,
        commentList: list
    }
}
const commentReducer = (state = initState, action) => {
    switch(action.type) {
        // TODO: 评论列表数据
        case COMMENT_LIST_DATA: return getListData(state, action);
        default: return state;
    }
};
export default commentReducer;