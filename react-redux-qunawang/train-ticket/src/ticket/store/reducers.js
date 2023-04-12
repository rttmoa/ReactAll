import {
    ACTION_SET_DEPART_DATE,
    ACTION_SET_ARRIVE_DATE,
    ACTION_SET_DEPART_TIME_STR,
    ACTION_SET_ARRIVE_TIME_STR,
    ACTION_SET_DEPART_STATION,
    ACTION_SET_ARRIVE_STATION,
    ACTION_SET_TRAIN_NUMBER,
    ACTION_SET_DURATION_STR,
    ACTION_SET_TICKETS,
    ACTION_SET_IS_SCHEDULE_VISIBLE,
    ACTION_SET_SEARCH_PARSED,
} from './actions.js';





export default {
    departDate(state = Date.now(), action) {
        const { type, payload } = action;
        switch (type) {
            case ACTION_SET_DEPART_DATE:
                return payload;
            default:
        }
        return state;
    },
    arriveDate(state = Date.now(), action) {
        const { type, payload } = action;
        switch (type) {
            case ACTION_SET_ARRIVE_DATE:
                return payload;
            default:
        }
        return state;
    },
    departTimeStr(state = null, action) {
        const { type, payload } = action;
        switch (type) {
            case ACTION_SET_DEPART_TIME_STR:
                return payload;
            default:
        }
        return state;
    },
    arriveTimeStr(state = null, action) {
        const { type, payload } = action;
        switch (type) {
            case ACTION_SET_ARRIVE_TIME_STR:
                return payload;
            default:
        }
        return state;
    },
    departStation(state = null, action) {
        const { type, payload } = action;
        switch (type) {
            case ACTION_SET_DEPART_STATION:
                return payload;
            default:
        }
        return state;
    },
    arriveStation(state = null, action) {
        const { type, payload } = action;
        switch (type) {
            case ACTION_SET_ARRIVE_STATION:
                return payload;
            default:
        }
        return state;
    },
    trainNumber(state = null, action) {
        const { type, payload } = action;
        switch (type) {
            case ACTION_SET_TRAIN_NUMBER:
                return payload;
            default:
        }
        return state;
    },
    durationStr(state = null, action) { // 停留时间，默认 null
        const { type, payload } = action;
        switch (type) {
            case ACTION_SET_DURATION_STR:
                return payload;
            default:
        }
        return state;
    },
    tickets(state = [], action) { // 座位信息，默认是 []
        const { type, payload } = action;
        switch (type) {
            case ACTION_SET_TICKETS:
                return payload;
            default:
        }
        return state;
    },
    isScheduleVisible(state = false, action) { // 时刻表，默认是false
        const { type, payload } = action;
        switch (type) {
            case ACTION_SET_IS_SCHEDULE_VISIBLE:
                return payload;
            default:
        }

        return state;
    },
    searchParsed(state = false, action) { // 搜索暂停，默认是false
        const { type, payload } = action;
        switch (type) {
            case ACTION_SET_SEARCH_PARSED:
                return payload;
            default:
        }

        return state;
    },
};
