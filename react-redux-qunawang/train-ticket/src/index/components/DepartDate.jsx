import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { h0 } from '../../common/fp';
import dayjs from 'dayjs';
import '../css/DepartDate.css';




/***--- 首页 - 时间日期的显示 ---**/
export default function DepartDate(props) {
    const { time, onClick } = props;
    // console.log(time) // 1681296841686

    const h0OfDepart = h0(time);
    // console.log(h0OfDepart) // 1681228800000
    const departDate = new Date(h0OfDepart);
    // console.log(departDate) // Wed Apr 12 2023 00:00:00 GMT+0800 (中国标准时间)
    // console.log(departDate.getDay()) // 3

    const departDateString = useMemo(() => {
        // return dayjs(1281296841686).format('YYYY-MM-DD') // 2010-08-09
        return dayjs(h0OfDepart).format('YYYY-MM-DD'); // 2023-04-12
    }, [h0OfDepart]);

    const isToday = h0OfDepart === h0();

    const weekString = '周' + ['日', '一', '二', '三', '四', '五', '六'][departDate.getDay()] + (isToday ? '(今天)' : '');

    return (
        <div className="depart-date" onClick={onClick}>
            <input type="hidden" name="date" value={departDateString} />
            {departDateString} <span className="depart-week">{weekString}</span>
        </div>
    );
}
DepartDate.propTypes = {
    time: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
};
