import * as actionTypes from '../constants/store'








const initialState = []

export default function userinfo (state = initialState, action) {
    switch (action.type) {
        case actionTypes.USERINFO_UPDATE:
            return action.data
        case actionTypes.STORE_ADD:
            // 指的是添加哪些收藏 - 哪些数据的收藏
                state.unshift(action.data) // unshift() 方法可向数组的开头添加一个或更多元素，并返回新的长度
                return state
        case actionTypes.STORE_RM:
            return state.filter(item => {
                if (item.id !== action.data.id) {
                    return item
                }
            })
        default:
            return state
    }
}