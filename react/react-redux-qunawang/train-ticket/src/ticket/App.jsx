import React, { useEffect, useCallback, useMemo, lazy, Suspense } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import URI from 'urijs';
import dayjs from 'dayjs';
import { h0 } from '../common/fp';
import useNav from '../common/useNav';
import Header from '../common/Header.jsx';
import Nav from '../common/Nav.jsx';
import Detail from '../common/Detail.jsx';
import Candidate from './components/Candidate.jsx';
import { TrainContext } from './utils/context';
import './css/App.css';
import {
    setDepartStation,setArriveStation,setTrainNumber,setDepartDate,setSearchParsed,
    prevDate,nextDate,
    setDepartTimeStr,setArriveTimeStr,setArriveDate,setDurationStr,setTickets,
    toggleIsScheduleVisible, // 切换时刻表
} from './store/actions';
 
/***--- 时刻表弹出框 ---**/
const Schedule = lazy(() => import('./components/Schedule.jsx'));







function App(props) {

    const { 
        departDate, arriveDate, departTimeStr, arriveTimeStr, 
        departStation, arriveStation, // 离开站，到达站
        trainNumber, durationStr, tickets,
        isScheduleVisible, // 时刻表是否显示
        searchParsed, // 设置一个搜索暂停，默认为false，防止第一次渲染时出错
        dispatch 
    } = props;
    // console.log("searchParsed", searchParsed);

    const onBack = useCallback(() => window.history.back(), []);

    useEffect(() => {
        const queries = URI.parseQuery(window.location.search); // "?aStation=%E5%8D%97%E4%BA%AC&dStation=%E5%8C%97%E4%BA%AC%E5%8D%97&trainNumber=D707&date=2019-02-10"
        const { aStation, dStation, date, trainNumber } = queries; // queries: {aStation:"南京", dStation:"北京南", date:"2019-02-10", trainNumber:"D707"}
        // debugger
        
        dispatch(setDepartStation(dStation));
        dispatch(setArriveStation(aStation));
        dispatch(setTrainNumber(trainNumber));
        dispatch(setDepartDate(h0(dayjs(date).valueOf())));

        dispatch(setSearchParsed(true));
    }, []);

    useEffect(() => {
        document.title = trainNumber;
    }, [trainNumber]);

    useEffect(() => {
        if (!searchParsed)  return;

        const url = new URI('/rest/ticket')
            .setSearch('date', dayjs(departDate).format('YYYY-MM-DD')).setSearch('trainNumber', trainNumber).toString();
        // console.log(url) //————  /rest/ticket?date=2019-02-10&trainNumber=D707

        fetch(url).then(response => response.json()).then(result => {
            const { detail, candidates } = result;
            const { departTimeStr, arriveTimeStr, arriveDate, durationStr } = detail;

            dispatch(setDepartTimeStr(departTimeStr));
            dispatch(setArriveTimeStr(arriveTimeStr));
            dispatch(setArriveDate(arriveDate));
            dispatch(setDurationStr(durationStr));
            dispatch(setTickets(candidates));  // candidates: 座位信息，商务座，一等座，中包含 快速预定和普通预定

            // console.log("车票详情信息", result)
            // debugger
        });
    }, [searchParsed, departDate, trainNumber]);

    const { isPrevDisabled, isNextDisabled, prev, next } = useNav(departDate, dispatch, prevDate, nextDate);

    /***--- 列车时刻表 - 详情信息 ---**/
    const detailCbs = useMemo(() => {
        return bindActionCreators({toggleIsScheduleVisible}, dispatch);
    }, []);

    if (!searchParsed) {
        return null;
    }




    return (
        <div className="app">
            {/* 动车车次号 */}
            <div className="header-wrapper">
                <Header title={trainNumber} onBack={onBack} />
            </div>
            {/* 前一天 —— 时间 —— 后一天 */}
            <div className="nav-wrapper">
                <Nav
                    date={departDate}
                    isPrevDisabled={isPrevDisabled}
                    isNextDisabled={isNextDisabled}
                    prev={prev}  // 上一页
                    next={next}  // 下一页
                />
            </div>
            {/* 车次信息 */}
            <div className="detail-wrapper">
                <Detail
                    departDate={departDate} // 离开日期
                    arriveDate={arriveDate} // 到达日期
                    departTimeStr={departTimeStr} // 离开时间
                    arriveTimeStr={arriveTimeStr} // 到达时间
                    trainNumber={trainNumber}   // 火车编号
                    departStation={departStation}
                    arriveStation={arriveStation}
                    durationStr={durationStr}   // 持续时间
                >
                    {/* 这部分是children */}
                    <span className="left"></span>
                    <span className="schedule" onClick={() => detailCbs.toggleIsScheduleVisible()}>时刻表</span>
                    <span className="right"></span>
                </Detail>
            </div>

            {/* 一等座、二等座、商务座 */}
            {/* TrainContext 上下文（Context）提供了一种在组件树中跨层级传递数据的方法，使得你可以在树中的任意组件共享数据，而无需显式地将数据逐层传递 */}
            <TrainContext.Provider value={{ trainNumber, departStation, arriveStation, departDate }}>
                <Candidate tickets={tickets} />
            </TrainContext.Provider>

            {/* 点击时 时刻表弹出框 关闭/显示 */}
            {isScheduleVisible && (
                <div className="mask" onClick={() => dispatch(toggleIsScheduleVisible())}>
                    <Suspense fallback={<div>loading...</div>}>
                        <Schedule
                            date={departDate}
                            trainNumber={trainNumber}
                            departStation={departStation}
                            arriveStation={arriveStation}
                        />
                    </Suspense>
                </div>
            )}
        </div>
    );
}
function mapStateToProps(state) {return state}
function mapDispatchToProps(dispatch) {return { dispatch }}
export default connect(mapStateToProps,mapDispatchToProps)(App);
