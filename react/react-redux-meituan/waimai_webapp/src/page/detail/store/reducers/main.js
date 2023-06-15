import tabReducer from './tabReducer.js';
import menuReducer from './menuReducer.js';
import commentReducer from './commentReducer.js';
import restanurantReducer from './restanurantReducer.js';
import scrollViewReducer from 'component/ScrollView/scrollViewReducer.js';

import { combineReducers } from 'redux';




const reducers = combineReducers({
    scrollViewReducer,
    tabReducer, // Tabs：点菜、评价、商家
    menuReducer,
    commentReducer, // 评论列表数据
    restanurantReducer,
});

export default reducers;