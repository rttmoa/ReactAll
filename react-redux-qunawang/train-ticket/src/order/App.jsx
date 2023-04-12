import React, { useCallback, useEffect, useMemo } from 'react';
import URI from 'urijs';
import dayjs from 'dayjs';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../common/Header.jsx';
import Detail from '../common/Detail.jsx';
import Account from './components/Account.jsx';
import Choose from './components/Choose.jsx';
import Passengers from './components/Passengers.jsx';
import { Ticket } from './components/Ticket.jsx';
import Menu from './components/Menu.jsx';
import './css/App.css';
import { 
    setDepartStation, setArriveStation, // 设置 出发站,到达站
    setTrainNumber, setSeatType, setDepartDate, // 设置 火车号,座位号,出发日期
    setSearchParsed, // 设置 搜索暂停
    fetchInitial,  // 搜索条件初始化
    createAdult, // 添加成人
    createChild, // 添加儿童
    removePassenger, updatePassenger, hideMenu, showGenderMenu, showFollowAdultMenu, showTicketTypeMenu,
} from './store/actions';




// Ticket 做优化

function App(props) {
    
    const {
        trainNumber,departStation,arriveStation,seatType,departDate,arriveDate,departTimeStr,
        arriveTimeStr,durationStr,price,passengers,menu,isMenuVisible,searchParsed,dispatch,
    } = props;

    const onBack = useCallback(() => {window.history.back();}, []);

    /***--- 处理地址栏数据 —— 存redux ---**/
    useEffect(() => {
        const queries = URI.parseQuery(window.location.search); // "?trainNumber=D707&dStation=%E5%8C%97%E4%BA%AC%E5%8D%97&aStation=%E5%8D%97%E4%BA%AC&type=%E4%B8%80%E7%AD%89%E5%BA%A7&date=2019-02-10"
        const { trainNumber, dStation, aStation, type, date } = queries; // {aStation:"南京", dStation:"北京南", date:"2019-02-10", trainNumber:"D707", type:"一等座"}
        // debugger
        
        dispatch(setDepartStation(dStation));
        dispatch(setArriveStation(aStation));
        dispatch(setTrainNumber(trainNumber));
        dispatch(setSeatType(type));
        dispatch(setDepartDate(dayjs(date).valueOf()));

        dispatch(setSearchParsed(true)); // 设置搜索暂停为 true
    }, []);

    /***--- fetch数据 ---**/
    useEffect(() => {
        if (!searchParsed) return;

        const url = new URI('/rest/order')
            .setSearch('dStation', departStation)
            .setSearch('aStation', arriveStation)
            .setSearch('type', seatType)
            .setSearch('date', dayjs(departDate).format('YYYY-MM-DD'))
        .toString();
        // console.log(url) //————   /rest/order?dStation=%E5%8C%97%E4%BA%AC%E5%8D%97&aStation=%E5%8D%97%E4%BA%AC&type=%E4%B8%80%E7%AD%89%E5%BA%A7&date=2019-02-10

        dispatch(fetchInitial(url)); // redux中处理 根据地址栏搜索数据
    }, [searchParsed, departStation, arriveStation, seatType, departDate]);

    const passengersCbs = useMemo(() => {
        return bindActionCreators({
            createAdult,
            createChild,
            removePassenger,
            updatePassenger,
            showGenderMenu,
            showFollowAdultMenu,
            showTicketTypeMenu,
        }, dispatch);
    }, []);

    const menuCbs = useMemo(() => {
        return bindActionCreators({hideMenu}, dispatch);
    }, []);

    const chooseCbs = useMemo(() => {
        return bindActionCreators({updatePassenger}, dispatch);
    }, []);

    if (!searchParsed) return null;



    return (
        <div className="app">
            {/* Header */}
            <div className="header-wrapper">
                <Header title="订单填写" onBack={onBack} />
            </div>
            {/* Info */}
            <div className="detail-wrapper">
                <Detail
                    departDate={departDate}
                    arriveDate={arriveDate}
                    departTimeStr={departTimeStr}
                    arriveTimeStr={arriveTimeStr}
                    trainNumber={trainNumber}
                    departStation={departStation}
                    arriveStation={arriveStation}
                    durationStr={durationStr}
                >
                    <span style={{ display: 'block' }} className="train-icon"></span>
                </Detail>
            </div>

            {/* 坐席 */}
            <Ticket price={price} type={seatType} />

            {/* 乘客信息填写 */}
            <Passengers passengers={passengers} {...passengersCbs} />

            {/* 选择座位 */}
            {passengers.length > 0 && <Choose passengers={passengers} {...chooseCbs} />}

            {/* 账户：金额+提交按钮+弹出金额详情 */}
            <Account length={passengers.length} price={price} />

            {/* 底部弹出框 +  成人票/儿童票  男/女  */}
            <Menu show={isMenuVisible} {...menu} {...menuCbs} />
        </div>
    );
} 
function mapStateToProps(state) {return state}
function mapDispatchToProps(dispatch) {return { dispatch }}
export default connect(mapStateToProps,mapDispatchToProps)(App);