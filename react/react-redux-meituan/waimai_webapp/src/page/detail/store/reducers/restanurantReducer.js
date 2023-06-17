import { RESTANURANT_DATA } from '../actions/actionTypes.js';








const initState = {
    resData: {},
};

const restanurantReducer = (state = initState, action) => {
    // console.log("restanurantReducer", action) 
    // 商家信息：{type: 'RESTANURANT_DATA', obj: {data: {…}, code: 0, msg: '成功 -> /dev/json/restanrant.json'}}
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