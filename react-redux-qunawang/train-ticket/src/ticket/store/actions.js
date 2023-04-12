import { h0 } from '../../common/fp';
export const ACTION_SET_DEPART_DATE = 'SET_DEPART_DATE';
export const ACTION_SET_ARRIVE_DATE = 'SET_ARRIVE_DATE';
export const ACTION_SET_DEPART_TIME_STR = 'SET_DEPART_TIME_STR';
export const ACTION_SET_ARRIVE_TIME_STR = 'SET_ARRIVE_TIME_STR';
export const ACTION_SET_DEPART_STATION = 'SET_DEPART_STATION';
export const ACTION_SET_ARRIVE_STATION = 'SET_ARRIVE_STATION';
export const ACTION_SET_TRAIN_NUMBER = 'SET_TRAIN_NUMBER';
export const ACTION_SET_DURATION_STR = 'SET_DURATION_STR';
/***--- 座位信息 ---**/
export const ACTION_SET_TICKETS = 'SET_TICKETS';
/***--- 设置时刻表是否显示 ---**/
export const ACTION_SET_IS_SCHEDULE_VISIBLE = 'SET_IS_SCHEDULE_VISIBLE';
export const ACTION_SET_SEARCH_PARSED = 'SET_SEARCH_PARSED';



/***--- 设置 离开日期 ---**/
export function setDepartDate(departDate) {
    // console.log(departDate); // 1549728000000
    return {
        type: ACTION_SET_DEPART_DATE,
        payload: departDate,
    };
}
/***--- 设置 到达日期 ---**/
export function setArriveDate(arriveDate) {
    // console.log(arriveDate); // 1549728000000
    return {
        type: ACTION_SET_ARRIVE_DATE,
        payload: arriveDate,
    };
}
/***--- 设置 出发时间 ---**/
export function setDepartTimeStr(departTimeStr) {
    // console.log(departTimeStr); // 07:15
    return {
        type: ACTION_SET_DEPART_TIME_STR,
        payload: departTimeStr,
    };
}
/***--- 设置 到达时间 ---**/
export function setArriveTimeStr(arriveTimeStr) {
    // console.log(arriveTimeStr); // 11:47
    return {
        type: ACTION_SET_ARRIVE_TIME_STR,
        payload: arriveTimeStr,
    };
}
/***--- 设置 出发车站 ---**/
export function setDepartStation(departStation) {
    // console.log(departStation); // 北京南
    return {
        type: ACTION_SET_DEPART_STATION,
        payload: departStation,
    };
}
/***--- 设置 到达车站 ---**/
export function setArriveStation(arriveStation) {
    // console.log(arriveStation); // 南京南
    return {
        type: ACTION_SET_ARRIVE_STATION,
        payload: arriveStation,
    };
}
/***--- 设置 火车编号 ---**/
export function setTrainNumber(trainNumber) {
    // console.log(trainNumber); // G17
    return {
        type: ACTION_SET_TRAIN_NUMBER,
        payload: trainNumber,
    };
}
/***--- 设置 停留时间 ---**/
export function setDurationStr(durationStr) {
    // console.log(durationStr); // 4小时32分
    return {
        type: ACTION_SET_DURATION_STR,
        payload: durationStr,
    };
}
/***--- 座位信息，商务座，一等座，中包含 快速预定和普通预定 ---**/
export function setTickets(tickets) {
    // console.log(tickets); // (3)[{type: '二等座', priceMsg: '443.5', ticketsLeft: '有票', channels: Array(2)}, {…}, {…}] 
    return {
        type: ACTION_SET_TICKETS,
        payload: tickets,
    };
}
/***--- 设置 时刻表是否显示 ---**/
export function setIsScheduleVisible(isScheduleVisible) {
    return {
        type: ACTION_SET_IS_SCHEDULE_VISIBLE,
        payload: isScheduleVisible,
    };
}
/***--- 切换时刻表是否显示 ---**/
export function toggleIsScheduleVisible() {
    return (dispatch, getState) => {
        const { isScheduleVisible } = getState();

        dispatch(setIsScheduleVisible(!isScheduleVisible));
    };
}
/***--- 设置 搜索暂停 ---**/
export function setSearchParsed(searchParsed) {
    // console.log(searchParsed); // true 传递的是true，默认是false
    return {
        type: ACTION_SET_SEARCH_PARSED,
        payload: searchParsed,
    };
}
/***--- Nav - 下一页 ---**/
export function nextDate() {
    return (dispatch, getState) => {
        const { departDate } = getState();

        dispatch(setDepartDate(h0(departDate) + 86400 * 1000));
    };
}
/***--- Nav - 上一页 ---**/
export function prevDate() {
    return (dispatch, getState) => {
        const { departDate } = getState();

        dispatch(setDepartDate(h0(departDate) - 86400 * 1000));
    };
}
