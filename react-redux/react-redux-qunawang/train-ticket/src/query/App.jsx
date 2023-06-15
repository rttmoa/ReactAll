import React, { useCallback, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import URI from 'urijs';
import dayjs from 'dayjs';
import { bindActionCreators } from 'redux';
import { h0 } from '../common/fp';
import Header from '../common/Header.jsx';
import Nav from '../common/Nav.jsx';
import List from './components/List.jsx';
import Bottom from './components/Bottom.jsx';
import useNav from '../common/useNav';
import './css/App.css';
import {
    setFrom,setTo,setDepartDate,setHighSpeed,setSearchParsed,setTrainList,setTicketTypes,setTrainTypes,setDepartStations,setArriveStations,// 设置
    prevDate,nextDate, // 翻页
    toggleOrderType,toggleHighSpeed,toggleOnlyTickets,toggleIsFiltersVisible, // 底部切换*4
    setCheckedTicketTypes,setCheckedTrainTypes, // 设置 检票类型/火车类型
    setCheckedDepartStations,setCheckedArriveStations, // 设置出发/到达车站
    setDepartTimeStart,setDepartTimeEnd,setArriveTimeStart,setArriveTimeEnd, // 设置日期,时间
} from './store/actions';









function App(props) {

    const {
        trainList,from,to,departDate,highSpeed,searchParsed,dispatch,
        orderType,onlyTickets,isFiltersVisible,ticketTypes,trainTypes,
        departStations,arriveStations,checkedTicketTypes,
        checkedTrainTypes,checkedDepartStations,checkedArriveStations,
        departTimeStart,departTimeEnd,arriveTimeStart,arriveTimeEnd
    } = props;


    // http://localhost:3032/query.html?from=北京&to=上海&date=2023-04-01&highSpeed=false
    useEffect(() => {
        const queries = URI.parseQuery(window.location.search); // ?from=%E5%8C%97%E4%BA%AC&to=%E4%B8%8A%E6%B5%B7&date=2023-04-02&highSpeed=false
        const { from, to, date, highSpeed } = queries; // {from: '北京', to: '上海', date: '2023-04-02', highSpeed: 'false'}
        // debugger

        dispatch(setFrom(from));
        dispatch(setTo(to));
        dispatch(setDepartDate(h0(dayjs(date).valueOf()))); // console.log(h0(dayjs(date).valueOf()))  1680364800000
        dispatch(setHighSpeed(highSpeed === 'true'));
        dispatch(setSearchParsed(true));
    }, []);


    useEffect(() => {
        if (!searchParsed) return;

        const url = new URI('/rest/query')
            .setSearch('from', from)
            .setSearch('to', to)
            .setSearch('date', dayjs(departDate).format('YYYY-MM-DD'))
            .setSearch('highSpeed', highSpeed)
            .setSearch('orderType', orderType)
            .setSearch('onlyTickets', onlyTickets)
            .setSearch('checkedTicketTypes', Object.keys(checkedTicketTypes).join())
            .setSearch('checkedTrainTypes', Object.keys(checkedTrainTypes).join())
            .setSearch('checkedDepartStations', Object.keys(checkedDepartStations).join())
            .setSearch('checkedArriveStations', Object.keys(checkedArriveStations).join())
            .setSearch('departTimeStart', departTimeStart)
            .setSearch('departTimeEnd', departTimeEnd)
            .setSearch('arriveTimeStart', arriveTimeStart)
            .setSearch('arriveTimeEnd', arriveTimeEnd)
        .toString();
        // console.log(Object.keys({uname: "zhangsan", age: 34}).join()) // uname,age
        // console.log(url) //——>  /rest/query?from=%E5%8C%97%E4%BA%AC&to=%E4%B8%8A%E6%B5%B7&date=2023-04-02&highSpeed=false&orderType=1&onlyTickets=false&checkedTicketTypes=&checkedTrainTypes=&checkedDepartStations=&checkedArriveStations=&departTimeStart=0&departTimeEnd=24&arriveTimeStart=0&arriveTimeEnd=24
        // debugger


        fetch(url).then(response => response.json()).then(result => {  // 代理的ip地址是 去哪儿网的服务器
            const {dataMap: {directTrainInfo: {trains, filter: {ticketType, trainType, depStation, arrStation}}}} = result;

            dispatch(setTrainList(trains)); // Array(14) {endStationCode: 'AOH', remainTicketCount: 0, dTimeStr: '201902101716', sort: 3, time: '4时27分', …}
            dispatch(setTicketTypes(ticketType)); // Array(10)  {value: '4', name: '二等座'}
            dispatch(setTrainTypes(trainType)); // Array(5) {value: '1', name: 'D-动车组'}
            dispatch(setDepartStations(depStation)); // Array(2) [{value: '北京南', name: '北京南'}, {value: '北京', name: '北京'}]
            dispatch(setArriveStations(arrStation)); // Array(2) [{value: '南京南', name: '南京南'}, {value: '南京', name: '南京'}]
            // console.log(result) // {msg: '操作成功', status: 0, dataMap: {…}}
            // debugger
        });
    }, [from,to,departDate,highSpeed,searchParsed,orderType,onlyTickets,checkedTicketTypes,checkedTrainTypes,
        checkedDepartStations,checkedArriveStations,departTimeStart,departTimeEnd,arriveTimeStart,arriveTimeEnd
    ]); // useEffect监听数据


    const onBack = useCallback(() => {
        window.history.back();
    }, []);

    const { isPrevDisabled, isNextDisabled, prev, next } = useNav( departDate, dispatch, prevDate, nextDate );

    const bottomCbs = useMemo(() => {
        return bindActionCreators({
                toggleOrderType, // 耗时长短
                toggleHighSpeed, // 切换 高铁动车
                toggleOnlyTickets, // 只看有票
                toggleIsFiltersVisible, // 综合筛选
                setCheckedTicketTypes,setCheckedTrainTypes, // 车票类型，火车类型
                setCheckedDepartStations,setCheckedArriveStations, // 出发车站，到达车站
                setDepartTimeStart,setDepartTimeEnd,setArriveTimeStart,setArriveTimeEnd, // 出发日期，到达日期，出发时间，到达时间
            }, dispatch);
    }, []);

    if (!searchParsed) { return null }




    return (
        <div>
            {/* 头部 */}
            <div className="header-wrapper">
                <Header title={`${from} ⇀ ${to}`} onBack={onBack} />
            </div>
            {/* 导航 —— 前一天 后一天 */}
            <Nav
                date={departDate}
                isPrevDisabled={isPrevDisabled}
                isNextDisabled={isNextDisabled}
                prev={prev}
                next={next}
            />
            {/* 中间部分 —— 数据 */}
            <List list={trainList} />
            {/* 底部 —— 筛选条件 */}
            <Bottom
                highSpeed={highSpeed}
                orderType={orderType}
                onlyTickets={onlyTickets}
                isFiltersVisible={isFiltersVisible}
                ticketTypes={ticketTypes}
                trainTypes={trainTypes}
                departStations={departStations}
                arriveStations={arriveStations}
                checkedTicketTypes={checkedTicketTypes}
                checkedTrainTypes={checkedTrainTypes}
                checkedDepartStations={checkedDepartStations}
                checkedArriveStations={checkedArriveStations}
                departTimeStart={departTimeStart}
                departTimeEnd={departTimeEnd}
                arriveTimeStart={arriveTimeStart}
                arriveTimeEnd={arriveTimeEnd}
                {...bottomCbs}
            />
        </div>
    );
}

function mapStateToProps(state) { return state }
function mapDispatchToProps(dispatch) { return { dispatch } }
export default connect(mapStateToProps, mapDispatchToProps)(App);
