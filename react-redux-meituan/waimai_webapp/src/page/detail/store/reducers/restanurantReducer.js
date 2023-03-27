import { RESTANURANT_DATA } from '../actions/actionTypes.js';



const initState = {
    resData: {},
};

 

/**--- 当进入 点餐 查看商家模块时 会有action数据 ---**/
const restanurantReducer = (state = initState, action) => {
    // console.log(action)
    switch(action.type) {
        case RESTANURANT_DATA: 
        return {
            ...state,
            resData: action.obj.data
        }
        default: return state;
    }
};

export default restanurantReducer;