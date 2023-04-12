import { createStore, combineReducers, applyMiddleware } from 'redux';

import reducers from './reducers';
import thunk from 'redux-thunk';








export default createStore(combineReducers(reducers), {
        departDate: Date.now(), // 出发日期
        arriveDate: Date.now(), // 到达日期
        departTimeStr: null, // 出发时间
        arriveTimeStr: null, // 到达时间
        departStation: null, // 出发车站
        arriveStation: null, // 到达车站
        trainNumber: null, // 车次
        durationStr: null, // 持续时间
        tickets: [], // 车票
        isScheduleVisible: false, // 时间表是否显示
        searchParsed: false, // 搜索暂停
    },
    applyMiddleware(thunk)
);
