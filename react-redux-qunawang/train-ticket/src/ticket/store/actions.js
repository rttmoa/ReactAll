import { h0 } from '../../common/fp';
export const ACTION_SET_DEPART_DATE = 'SET_DEPART_DATE';
export const ACTION_SET_ARRIVE_DATE = 'SET_ARRIVE_DATE';
export const ACTION_SET_DEPART_TIME_STR = 'SET_DEPART_TIME_STR';
export const ACTION_SET_ARRIVE_TIME_STR = 'SET_ARRIVE_TIME_STR';
export const ACTION_SET_DEPART_STATION = 'SET_DEPART_STATION';
export const ACTION_SET_ARRIVE_STATION = 'SET_ARRIVE_STATION';
export const ACTION_SET_TRAIN_NUMBER = 'SET_TRAIN_NUMBER';
export const ACTION_SET_DURATION_STR = 'SET_DURATION_STR';
export const ACTION_SET_TICKETS = 'SET_TICKETS';
/***--- 设置时刻表是否显示 ---**/
export const ACTION_SET_IS_SCHEDULE_VISIBLE = 'SET_IS_SCHEDULE_VISIBLE';
export const ACTION_SET_SEARCH_PARSED = 'SET_SEARCH_PARSED';



/***--- 设置出发日期 ---**/
export function setDepartDate(departDate) {
    return {
        type: ACTION_SET_DEPART_DATE,
        payload: departDate,
    };
}
export function setArriveDate(arriveDate) {
    return {
        type: ACTION_SET_ARRIVE_DATE,
        payload: arriveDate,
    };
}
export function setDepartTimeStr(departTimeStr) {
    return {
        type: ACTION_SET_DEPART_TIME_STR,
        payload: departTimeStr,
    };
}
export function setArriveTimeStr(arriveTimeStr) {
    return {
        type: ACTION_SET_ARRIVE_TIME_STR,
        payload: arriveTimeStr,
    };
}
export function setDepartStation(departStation) {
    return {
        type: ACTION_SET_DEPART_STATION,
        payload: departStation,
    };
}
export function setArriveStation(arriveStation) {
    return {
        type: ACTION_SET_ARRIVE_STATION,
        payload: arriveStation,
    };
}
export function setTrainNumber(trainNumber) {
    return {
        type: ACTION_SET_TRAIN_NUMBER,
        payload: trainNumber,
    };
}
export function setDurationStr(durationStr) {
    return {
        type: ACTION_SET_DURATION_STR,
        payload: durationStr,
    };
}
export function setTickets(tickets) {
    return {
        type: ACTION_SET_TICKETS,
        payload: tickets,
    };
}
/***--- 设置时刻表是否显示 ---**/
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
export function setSearchParsed(searchParsed) {
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
