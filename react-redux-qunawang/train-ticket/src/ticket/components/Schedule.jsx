import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import URI from 'urijs';
import dayjs from 'dayjs';
import classnames from 'classnames';
import leftPad from 'left-pad';
import '../css/Schedule.css';





/***--- 列车时刻表 —— 每一站的数据 ---**/
const ScheduleRow = memo(function ScheduleRow(props) {
    const {
        index,
        station,    // 车站
        arriveTime, // 到达时间
        departTime, // 离开时间
        stay,       // 停留

        isStartStation,     // 始发站
        isEndStation,       // 终点站
        isDepartStation,    // 出发站
        isArriveStation,    // 到达站
        beforeDepartStation,// 出发之前站
        afterArriveStation, // 到达后的站
    } = props;
    return (
        <li>
            <div className={classnames('icon', {'icon-red': isDepartStation || isArriveStation})}>
                {isDepartStation ? '出' : isArriveStation ? '到' : leftPad(index, 2, 0)}
            </div>
            <div className={classnames('row', {grey: beforeDepartStation || afterArriveStation})}>
                {/* 车站 */}
                <span className={classnames('station', {red: isArriveStation || isDepartStation})}>
                    {station}
                </span>
                {/* 到达 */}
                <span className={classnames('arrtime', {red: isArriveStation})}>
                    {isStartStation ? '始发站' : arriveTime}
                </span>
                {/* 发车 */}
                <span className={classnames('deptime', {red: isDepartStation})}>
                    {isEndStation ? '终到站' : departTime}
                </span>
                {/* 停留时间 */}
                <span className="stoptime">
                    {isStartStation || isEndStation ? '-' : stay + '分'}
                </span>
            </div>
        </li>
    );
});
ScheduleRow.propTypes = {};



/***--- 列车时刻表 —— 弹出框 ---**/
const Schedule = memo(function Schedule(props) {
    
    const { date, trainNumber, departStation, arriveStation } = props;

    const [scheduleList, setScheduleList] = useState([]);  // 时刻表数据

    useEffect(() => {
        // 解析URL地址
        const url = new URI('/rest/schedule')
            .setSearch('trainNumber', trainNumber)
            .setSearch('departStation', departStation)
            .setSearch('arriveStation', arriveStation)
            .setSearch('date', dayjs(date).format('YYYY-MM-DD'))
        .toString();
        // console.log(url) //————   /rest/schedule?trainNumber=D707&departStation=%E5%8C%97%E4%BA%AC%E5%8D%97&arriveStation=%E5%8D%97%E4%BA%AC&date=2019-02-10

        fetch(url).then(response => response.json()).then(data => {
            // console.log("请求到的时刻表数据", data)

            let departRow; // 出发行
            let arriveRow; // 到达行

            // 贴图查看 始发站和终点站
            for (let i = 0; i < data.length; ++i) {
                if (!departRow) {
                    if (data[i].station === departStation) {
                        departRow = Object.assign(data[i], {
                            beforeDepartStation: false, // 始发站
                            isDepartStation: true,      // 出发站
                            afterArriveStation: false,  // 终点站
                            isArriveStation: false,     // 到达站
                        });
                    } else {
                        Object.assign(data[i], {
                            beforeDepartStation: true,  // 始发站
                            isDepartStation: false,     // 出发站
                            afterArriveStation: false,  // 终点站
                            isArriveStation: false,     // 到达站
                        });
                    }
                } else if (!arriveRow) {
                    if (data[i].station === arriveStation) {
                        arriveRow = Object.assign(data[i], {
                            beforeDepartStation: false, // 始发站
                            isDepartStation: false,     // 出发站
                            afterArriveStation: false,  // 终点站
                            isArriveStation: true,      // 到达站
                        });
                    } else {
                        Object.assign(data[i], {
                            beforeDepartStation: false, // 始发站
                            isDepartStation: false,     // 出发站
                            afterArriveStation: false,  // 终点站
                            isArriveStation: false,     // 到达站
                        });
                    }
                } else {
                    Object.assign(data[i], {
                        beforeDepartStation: false, // 始发站
                        isDepartStation: false,     // 出发站
                        afterArriveStation: true,   // 终点站
                        isArriveStation: false,     // 到达站
                    });
                }

                Object.assign(data[i], {
                    isStartStation: i === 0,             // 是否是始发站
                    isEndStation: i === data.length - 1, // 是否是终点站
                });
            }
            // console.log("时刻表数据", data)  // 处理后的data
            setScheduleList(data);
        });
    }, [date, trainNumber, departStation, arriveStation])


    /***--- 对话框 ---**/
    return (
        <div className="schedule">
            <div className="dialog">
                <h1>列车时刻表</h1>
                <div className="head">
                    <span className="station">车站</span>
                    <span className="deptime">到达</span>
                    <span className="arrtime">发车</span>
                    <span className="stoptime">停留时间</span>
                </div>
                <ul>
                    {scheduleList.map((schedule, index) => {
                        return <ScheduleRow key={schedule.station} index={index + 1} {...schedule}/>
                    })}
                </ul>
            </div>
        </div>
    );
});
Schedule.propTypes = {
    date: PropTypes.number.isRequired,
    trainNumber: PropTypes.string.isRequired,
    departStation: PropTypes.string.isRequired,
    arriveStation: PropTypes.string.isRequired,
};
export default Schedule;