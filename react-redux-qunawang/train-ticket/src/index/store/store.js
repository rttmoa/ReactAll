import { createStore, combineReducers, applyMiddleware } from 'redux';

import reducers from './reducers';
import thunk from 'redux-thunk';





export default createStore(combineReducers(reducers), {
        from: '北京', // 来自哪
        to: '上海', // 要去哪
        isCitySelectorVisible: false, // 是否显示城市组件
        currentSelectingLeftCity: false, //  当前选择左侧城市
        cityData: null, // 城市数据
        isLoadingCityData: false, // 是否加载城市数据
        isDateSelectorVisible: false, // 是否显示日期组件
        departDate: Date.now(),
        highSpeed: false, // 只看高铁/动车
    },
    applyMiddleware(thunk)
);
