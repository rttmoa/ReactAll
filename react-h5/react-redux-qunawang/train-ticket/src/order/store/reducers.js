import {
    ACTION_SET_TRAIN_NUMBER,
    ACTION_SET_DEPART_STATION,
    ACTION_SET_ARRIVE_STATION,
    ACTION_SET_SEAT_TYPE,
    ACTION_SET_DEPART_DATE,
    ACTION_SET_ARRIVE_DATE,
    ACTION_SET_DEPART_TIME_STR,
    ACTION_SET_ARRIVE_TIME_STR,
    ACTION_SET_DURATION_STR,
    ACTION_SET_PRICE,
    ACTION_SET_PASSENGERS,
    ACTION_SET_MENU,
    ACTION_SET_IS_MENU_VISIBLE,
    ACTION_SET_SEARCH_PARSED,
} from './actions';




export default {
    trainNumber(state = null, action) {
        const { type, payload } = action;
        switch (type) {
            case ACTION_SET_TRAIN_NUMBER:
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
    seatType(state = null, action) {
        const { type, payload } = action;
        switch (type) {
            case ACTION_SET_SEAT_TYPE:
                return payload;
            default:
        } 
        return state;
    },
    departDate(state = null, action) {
        const { type, payload } = action;
        switch (type) {
            case ACTION_SET_DEPART_DATE:
                return payload;
            default:
        } 
        return state;
    },
    arriveDate(state = null, action) {
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
    durationStr(state = null, action) {
        const { type, payload } = action;
        switch (type) {
            case ACTION_SET_DURATION_STR:
                return payload;
            default:
        } 
        return state;
    },
    price(state = null, action) {
        const { type, payload } = action;
        switch (type) {
            case ACTION_SET_PRICE:
                return payload;
            default:
        } 
        return state;
    },
    passengers(state = [], action) { // 乘客信息，默认是 []
        const { type, payload } = action;
        switch (type) {
            case ACTION_SET_PASSENGERS:
                return payload;
            default:
        }

        return state;
    },
    menu(state = null, action) {
        const { type, payload } = action;
        switch (type) {
            case ACTION_SET_MENU:
                return payload;
            default:
        }

        return state;
    },
    isMenuVisible(state = false, action) { // 菜单是否显示 默认是 false
        const { type, payload } = action;
        switch (type) {
            case ACTION_SET_IS_MENU_VISIBLE:
                return payload;
            default:
        }

        return state;
    },
    searchParsed(state = false, action) { // 搜索暂停 默认是 false
        const { type, payload } = action;
        switch (type) {
            case ACTION_SET_SEARCH_PARSED:
                return payload;
            default:
        }

        return state;
    },
};
