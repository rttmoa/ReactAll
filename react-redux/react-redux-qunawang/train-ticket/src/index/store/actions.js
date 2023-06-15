/***--- 来自于哪个城市 ---**/
export const ACTION_SET_FROM = 'SET_FROM';
/***--- 去哪个城市 ---**/
export const ACTION_SET_TO = 'SET_TO';
/***--- 隐藏/显示 选择城市 组件 ---**/
export const ACTION_SET_IS_CITY_SELECTOR_VISIBLE = 'SET_IS_CITY_SELECTOR_VISIBLE';
/***--- 设置左侧城市 (来源于哪里) ---**/
export const ACTION_SET_CURRENT_SELECTING_LEFT_CITY = 'SET_CURRENT_SELECTING_LEFT_CITY';
export const ACTION_SET_CITY_DATA = 'SET_CITY_DATA';
export const ACTION_SET_IS_LOADING_CITY_DATA = 'SET_IS_LOADING_CITY_DATA';
export const ACTION_SET_IS_DATE_SELECTOR_VISIBLE = 'SET_IS_DATE_SELECTOR_VISIBLE';
export const ACTION_SET_HIGH_SPEED = 'SET_HIGH_SPEED';
export const ACTION_SET_DEPART_DATE = 'SET_DEPART_DATE';


/***--- 来自于哪个城市 ---**/
export function setFrom(from) {
    return {
        type: ACTION_SET_FROM,
        payload: from,
    };
}
/***--- 去哪个城市 ---**/
export function setTo(to) {
    return {
        type: ACTION_SET_TO,
        payload: to,
    };
}

export function setIsLoadingCityData(isLoadingCityData) {
    return {
        type: ACTION_SET_IS_LOADING_CITY_DATA,
        payload: isLoadingCityData,
    };
}

export function setCityData(cityDate) {
    return {
        type: ACTION_SET_CITY_DATA,
        payload: cityDate,
    };
}
/***--- 首页 - 切换高铁/动车 ---**/
export function toggleHighSpeed() {
    return (dispatch, getState) => {
        const { highSpeed } = getState();
        dispatch({
            type: ACTION_SET_HIGH_SPEED,
            payload: !highSpeed,
        });
    };
}
/***--- 城市选择 - 置换 换向 ---**/
export function showCitySelector(currentSelectingLeftCity) {
    return dispatch => {
        dispatch({
            type: ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
            payload: true,
        });

        dispatch({
            type: ACTION_SET_CURRENT_SELECTING_LEFT_CITY,
            payload: currentSelectingLeftCity,
        });
    };
}
/***--- 隐藏/显示 选择城市 组件 ---**/
export function hideCitySelector() {
    return {
        type: ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
        payload: false,
    };
}
/***--- 设置选择城市 ---**/
export function setSelectedCity(city) {
    return (dispatch, getState) => {
        const { currentSelectingLeftCity } = getState(); 
        if (currentSelectingLeftCity) {
            dispatch(setFrom(city));
        } else {
            dispatch(setTo(city));
        } 
        dispatch(hideCitySelector());
    };
}
/***--- 日期选择 ---**/
export function showDateSelector() {
    return {
        type: ACTION_SET_IS_DATE_SELECTOR_VISIBLE,
        payload: true,
    };
}
/***--- 隐藏日期组件 ---**/
export function hideDateSelector() {
    return {
        type: ACTION_SET_IS_DATE_SELECTOR_VISIBLE,
        payload: false,
    };
}

/***--- 置换图标 ---**/
export function exchangeFromTo() {
    return (dispatch, getState) => {
        const { from, to } = getState();
        dispatch(setFrom(to));
        dispatch(setTo(from));
    };
}
/***--- 设置选择的日期 - 存储redux ---**/
export function setDepartDate(departDate) {
    return {
        type: ACTION_SET_DEPART_DATE,
        payload: departDate,
    };
}

/***--- 城市 - 选择城市 获取数据 ---**/
export function fetchCityData() {
    return (dispatch, getState) => {
        const { isLoadingCityData } = getState(); // false

        
        if (isLoadingCityData) return;

        const cache = JSON.parse(localStorage.getItem('city_data_cache') || '{}');
        // console.log("get city_data_cache", cache)

        if (Date.now() < cache.expires) {
            dispatch(setCityData(cache.data));
            return;
        }

        dispatch(setIsLoadingCityData(true));

        fetch('/rest/cities?_' + Date.now()).then(res => res.json()).then(cityData => {
                // console.log("cityData", cityData)

                dispatch(setCityData(cityData))

                localStorage.setItem('city_data_cache',
                    JSON.stringify({
                        expires: Date.now() + 60 * 1000,
                        data: cityData,
                    })
                );
                dispatch(setIsLoadingCityData(false));
            })
            .catch(() => {
                dispatch(setIsLoadingCityData(false));
            });
    };
}
