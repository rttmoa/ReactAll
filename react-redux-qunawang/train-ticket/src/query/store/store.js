import { createStore, combineReducers, applyMiddleware } from 'redux';

import reducers from './reducers';
import thunk from 'redux-thunk';

import { h0 } from '../../common/fp';
import { ORDER_DEPART } from '../utils/constant';







export default createStore(combineReducers(reducers), {
        from: null, // 来自
        to: null, // 去往
        departDate: h0(Date.now()),  // 出发日期
        highSpeed: false, // 高铁/动车
        trainList: [],  // 列车清单
        orderType: ORDER_DEPART, // 订单类型
        onlyTickets: false, // 仅有票
        ticketTypes: [], // 票类型
        checkedTicketTypes: {}, // 检票类型
        trainTypes: [], // 火车类型
        checkedTrainTypes: {},
        departStations: [], // 出发站
        checkedDepartStations: {}, // 检票出发站
        arriveStations: [], // 到达车站
        checkedArriveStations: {}, // 检票终点站
        departTimeStart: 0, // 出发开始时间
        departTimeEnd: 24, // 出发结束时间
        arriveTimeStart: 0, // 到达开始时间
        arriveTimeEnd: 24, // 到达结束时间
        isFiltersVisible: false,
        searchParsed: false, // 搜索信息
    },
    applyMiddleware(thunk)
);
