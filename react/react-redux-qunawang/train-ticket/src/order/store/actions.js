export const ACTION_SET_TRAIN_NUMBER = 'SET_TRAIN_NUMBER';
export const ACTION_SET_DEPART_STATION = 'SET_DEPART_STATION';
export const ACTION_SET_ARRIVE_STATION = 'SET_ARRIVE_STATION';
export const ACTION_SET_SEAT_TYPE = 'SET_SEAT_TYPE';
export const ACTION_SET_DEPART_DATE = 'SET_DEPART_DATE';
export const ACTION_SET_ARRIVE_DATE = 'SET_ARRIVE_DATE';
export const ACTION_SET_DEPART_TIME_STR = 'SET_DEPART_TIME_STR';
export const ACTION_SET_ARRIVE_TIME_STR = 'SET_ARRIVE_TIME_STR';
export const ACTION_SET_DURATION_STR = 'SET_DURATION_STR';
export const ACTION_SET_PRICE = 'SET_PRICE';
export const ACTION_SET_PASSENGERS = 'SET_PASSENGERS';
export const ACTION_SET_MENU = 'SET_MENU';
export const ACTION_SET_IS_MENU_VISIBLE = 'SET_IS_MENU_VISIBLE';
export const ACTION_SET_SEARCH_PARSED = 'SET_SEARCH_PARSED';




/***--- 设置 火车编号 ---**/
export function setTrainNumber(trainNumber) {
    return {
        type: ACTION_SET_TRAIN_NUMBER,
        payload: trainNumber,
    };
}
/***--- 设置 出发车站 ---**/
export function setDepartStation(departStation) {
    return {
        type: ACTION_SET_DEPART_STATION,
        payload: departStation,
    };
}
/***--- 设置 到达车站 ---**/
export function setArriveStation(arriveStation) {
    return {
        type: ACTION_SET_ARRIVE_STATION,
        payload: arriveStation,
    };
}
/***--- 设置 座位类型 ---**/
export function setSeatType(seatType) {
    return {
        type: ACTION_SET_SEAT_TYPE,
        payload: seatType,
    };
}
/***--- 设置 出发日期 ---**/
export function setDepartDate(departDate) {
    return {
        type: ACTION_SET_DEPART_DATE,
        payload: departDate,
    };
}
/***--- 设置 到达日期 ---**/
export function setArriveDate(arriveDate) {
    return {
        type: ACTION_SET_ARRIVE_DATE,
        payload: arriveDate,
    };
}
/***--- 设置 出发时间 ---**/
export function setDepartTimeStr(departTimeStr) {
    return {
        type: ACTION_SET_DEPART_TIME_STR,
        payload: departTimeStr,
    };
}
/***--- 设置 到达时间 ---**/
export function setArriveTimeStr(arriveTimeStr) {
    return {
        type: ACTION_SET_ARRIVE_TIME_STR,
        payload: arriveTimeStr,
    };
}
/***--- 设置 停留时间 ---**/
export function setDurationStr(durationStr) {
    return {
        type: ACTION_SET_DURATION_STR,
        payload: durationStr,
    };
}
/***--- 设置 价格 ---**/
export function setPrice(price) {
    return {
        type: ACTION_SET_PRICE,
        payload: price,
    };
}
/***--- 设置 乘客 ---**/
export function setPassengers(passengers) {
    return {
        type: ACTION_SET_PASSENGERS,
        payload: passengers,
    };
}
export function setMenu(menu) {
    return {
        type: ACTION_SET_MENU,
        payload: menu,
    };
}
export function setIsMenuVisible(isMenuVisible) {
    return {
        type: ACTION_SET_IS_MENU_VISIBLE,
        payload: isMenuVisible,
    };
}
/***--- 设置 搜索暂停 ---**/
export function setSearchParsed(searchParsed) {
    return {
        type: ACTION_SET_SEARCH_PARSED,
        payload: searchParsed,
    };
}

/***--- 进入页面时，根据 出发站，到达站，座位类型，时间 处理URL地址 ---**/
export function fetchInitial(url) {
    return (dispatch, getState) => {
        fetch(url).then(res => {/* console.log("fetch", res); */ return res.json()}).then(data => {
                // console.log(data); // {departTimeStr: '07:15', arriveTimeStr: '11:47', arriveDate: 1549900800000, durationStr: '4小时32分', price: 483.5}
                const {
                    departTimeStr, // 出发时间
                    arriveTimeStr, // 到达时间
                    arriveDate, // 到达日期
                    durationStr, // 停留时间
                    price, // 价格
                } = data;

                dispatch(setDepartTimeStr(departTimeStr));
                dispatch(setArriveTimeStr(arriveTimeStr));
                dispatch(setArriveDate(arriveDate));
                dispatch(setDurationStr(durationStr));
                dispatch(setPrice(price));
        });
    };
}

/***--- 添加成人 ---**/
let passengerIdSeed = 0;
export function createAdult() {
    return (dispatch, getState) => {
        const { passengers } = getState();
        // console.log(passengers) // 

        for (let passenger of passengers) {
            const keys = Object.keys(passenger); // 获取属性名数组
            for (let key of keys) { // 获取属性名
                if (!passenger[key]) { // 获取属性值：Obj['name']
                    console.info("提示：上一个乘客信息不完整")
                    return;
                }
            }
        }

        dispatch(setPassengers([...passengers, {
                    id: ++passengerIdSeed,
                    name: "",
                    ticketType: 'adult',
                    licenceNo: "",
                    seat: 'Z',
                },
            ])
        );
    };
}
/***--- 添加儿童 ---**/
export function createChild() {
    return (dispatch, getState) => {
        const { passengers } = getState();

        let adultFound = null;

        for (let passenger of passengers) {
            const keys = Object.keys(passenger); // 获取属性名数组
            for (let key of keys) { // 获取属性名
                if (!passenger[key]) { // 获取属性值：Obj['name']
                    console.info("提示：上一个乘客信息不完整")
                    return;
                }
            }
            if (passenger.ticketType === 'adult') {
                adultFound = passenger.id;
            }
        }
        // console.log("初始adultFound", !!adultFound) // false
        // debugger

        if (!adultFound) {
            alert('请至少正确添加一个同行成人');
            return;
        }
        dispatch(setPassengers([ ...passengers, {
                    id: ++passengerIdSeed,
                    name: '',
                    gender: 'none',
                    birthday: '',
                    followAdult: adultFound,
                    ticketType: 'child',
                    seat: 'Z',
                },
            ])
        );
    };
}
/***--- 移除乘客 ---**/
export function removePassenger(id) {
    return (dispatch, getState) => {
        const { passengers } = getState();

        const newPassengers = passengers.filter(passenger => {
            return passenger.id !== id && passenger.followAdult !== id;
        });

        dispatch(setPassengers(newPassengers));
    };
}
/***--- 修改乘客信息 ---**/
export function updatePassenger(id, data, keysToBeRemoved = []) {
    return (dispatch, getState) => {
        const { passengers } = getState();

        for (let i = 0; i < passengers.length; ++i) {
            if (passengers[i].id === id) {
                const newPassengers = [...passengers];
                newPassengers[i] = Object.assign({}, passengers[i], data)

                for (let key of keysToBeRemoved) {
                    delete newPassengers[i][key];
                }

                dispatch(setPassengers(newPassengers));

                break;
            }
        }
    };
}

export function showMenu(menu) {
    return dispatch => {
        dispatch(setMenu(menu));
        dispatch(setIsMenuVisible(true));
    };
}
/***--- 弹出框 选择 男/女   ---**/
export function showGenderMenu(id) {
    return (dispatch, getState) => {
        const { passengers } = getState();

        const passenger = passengers.find(passenger => passenger.id === id);

        if (!passenger) return;

        dispatch(
            showMenu({
                onPress(gender) {
                    dispatch(updatePassenger(id, { gender }));
                    dispatch(hideMenu());
                },
                options: [
                    {
                        title: '男',
                        value: 'male',
                        active: 'male' === passenger.gender,
                    },
                    {
                        title: '女',
                        value: 'female',
                        active: 'female' === passenger.gender,
                    },
                ],
            })
        );
    };
}

export function showFollowAdultMenu(id) {
    return (dispatch, getState) => {
        const { passengers } = getState();

        const passenger = passengers.find(passenger => passenger.id === id);

        if (!passenger) {
            return;
        }

        dispatch(
            showMenu({
                onPress(followAdult) {
                    dispatch(updatePassenger(id, { followAdult }));
                    dispatch(hideMenu());
                },
                options: passengers
                    .filter(passenger => passenger.ticketType === 'adult')
                    .map(adult => {
                        return {
                            title: adult.name,
                            value: adult.id,
                            active: adult.id === passenger.followAdult,
                        };
                    }),
            })
        );
    };
}

export function showTicketTypeMenu(id) {
    return (dispatch, getState) => {
        const { passengers } = getState();

        const passenger = passengers.find(passenger => passenger.id === id);

        if (!passenger) {
            return;
        }

        dispatch(
            showMenu({
                onPress(ticketType) {
                    if ('adult' === ticketType) {
                        dispatch(
                            updatePassenger(
                                id,
                                {
                                    ticketType,
                                    licenceNo: '',
                                },
                                ['gender', 'followAdult', 'birthday']
                            )
                        );
                    } else {
                        const adult = passengers.find(passenger => passenger.id === id && passenger.ticketType === 'adult');

                        if (adult) {
                            dispatch(
                                updatePassenger(id, {
                                    ticketType,
                                    gender: '',
                                    followAdult: adult.id,
                                    birthday: '',
                                },
                                ['licenceNo'])
                            );
                        } else {
                            alert('没有其他成人乘客');
                        }
                    }
                    dispatch(hideMenu());
                },
                options: [
                    {
                        title: '成人票',
                        value: 'adult',
                        active: 'adult' === passenger.ticketType,
                    },
                    {
                        title: '儿童票',
                        value: 'child',
                        active: 'child' === passenger.ticketType,
                    },
                ],
            })
        );
    };
}

export function hideMenu() {
    return setIsMenuVisible(false);
}
