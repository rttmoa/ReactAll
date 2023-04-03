import { createStore, combineReducers, applyMiddleware } from 'redux';

import reducers from './reducers';
import thunk from 'redux-thunk';







export default createStore(combineReducers(reducers), {
        trainNumber: null, // 车次
        departStation: null, // 出发车站
        arriveStation: null, // 终点车站
        seatType: null, // 座位类型
        departDate: Date.now(), // 出发日期
        arriveDate: Date.now(), // 到达日期
        departTimeStr: null, // 出发时间
        arriveTimeStr: null, // 到达时间
        durationStr: null, // 持续时间
        price: null, // 价格
        passengers: [], // 乘客
        menu: null, // 菜单
        isMenuVisible: false, // 是否显示Menu
        searchParsed: false, // 搜索信息
    },
    applyMiddleware(thunk)
)
