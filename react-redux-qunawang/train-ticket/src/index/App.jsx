import React, { useCallback, useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './css/App.css';

import Header from '../common/Header.jsx';
import DepartDate from './components/DepartDate.jsx';
import HighSpeed from './components/HighSpeed.jsx';
import Journey from './components/Journey.jsx';
import Submit from './components/Submit.jsx';

import CitySelector from '../common/CitySelector.jsx';
import DateSelector from '../common/DateSelector.jsx';

import { h0 } from '../common/fp';

import { exchangeFromTo, showCitySelector, hideCitySelector, fetchCityData, setSelectedCity,    
    showDateSelector, hideDateSelector, setDepartDate, toggleHighSpeed, 
} from './store/actions';




    
function App(props) {
    
    // redux数据
    const { from, to, isCitySelectorVisible, isDateSelectorVisible, cityData, isLoadingCityData,  highSpeed, dispatch, departDate, } = props;
    // console.log(from)

    const onBack = useCallback(() => window.history.back(), []);

    /***--- 城市 置换 ---**/
    const cbs = useMemo(() => {
        return bindActionCreators({
                exchangeFromTo,
                showCitySelector,
            }, dispatch);
    }, []);

    /***--- 城市选择回调 -  ---**/
    const citySelectorCbs = useMemo(() => {
        return bindActionCreators({
                onBack: hideCitySelector,
                fetchCityData,
                onSelect: setSelectedCity,
            },dispatch);
    }, []);
    /***--- 点击 进入 日期组件 ---**/
    const departDateCbs = useMemo(() => { 
        return bindActionCreators({onClick: showDateSelector}, dispatch);
    }, []);
    /***--- 日期组件关闭 ---**/
    const dateSelectorCbs = useMemo(() => { 
        return bindActionCreators({onBack: hideDateSelector}, dispatch);
    }, []);
    /***--- 切换高铁/动车 ---**/
    const highSpeedCbs = useMemo(() => {
        return bindActionCreators({toggle: toggleHighSpeed}, dispatch);
    }, []);

    const onSelectDate = useCallback(day => {
        if (!day) return;
        if (day < h0()) return;
        dispatch(setDepartDate(day)); // 将选择的日期 存储到redux
        dispatch(hideDateSelector()); // 隐藏日期组件
    }, []);



    return (
        <div>
            <div className="header-wrapper">
                <Header title="火车票" onBack={onBack} />
            </div>
            {/* 点击搜索按钮时，跳转到query页面 */}
            <form action="./query.html" className="form">
                {/* 从x到x */}
                <Journey from={from} to={to} {...cbs} />
                {/* 出发日期 */}
                <DepartDate time={departDate} {...departDateCbs} />
                {/* 只看高铁 */}
                <HighSpeed highSpeed={highSpeed} {...highSpeedCbs} />
                {/* 提交 */}
                <Submit />
            </form>
            <CitySelector show={isCitySelectorVisible} cityData={cityData} isLoading={isLoadingCityData} {...citySelectorCbs}/>
            <DateSelector show={isDateSelectorVisible} {...dateSelectorCbs} onSelect={onSelectDate}/>
        </div>
    );
}
// function mapStateToProps(state) {return state;}
// function mapDispatchToProps(dispatch) { return { dispatch } }
export default connect(state => state, dispatch => {return { dispatch }} )(App);
