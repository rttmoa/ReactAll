import React, { useMemo, memo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import dayjs from 'dayjs'; // dayjs格式化日期
import 'dayjs/locale/zh-cn';
import './css/Nav.css';





const Nav = memo(function Nav({ date, prev, next, isPrevDisabled, isNextDisabled }) {
    // const { date, prev, next, isPrevDisabled, isNextDisabled } = props;

    const currentString = useMemo(() => {
        const d = dayjs(date)
        // console.log(date); // data: 1549728000000
        // console.log(d);    // d: {$L: 'en', $d: Sun Feb 10 2019 00:00:00 GMT+0800 (中国标准时间), $y: 2019, $M: 1, $D:…}
        // console.log(d.format('M月D日 ') + d.locale('zh-cn').format('ddd'));  // 2月10日 周日
        return d.format('M月D日 ') + d.locale('zh-cn').format('ddd');
    }, [date])



    return (
        <div className="nav">
            <span onClick={prev} className={classnames('nav-prev', {'nav-disabled': isPrevDisabled})}>前一天</span>
            <span className="nav-current">{currentString}</span>
            <span onClick={next} className={classnames('nav-next', {'nav-disabled': isNextDisabled})}>后一天</span>
        </div>
    );
});
Nav.propTypes = {
    date: PropTypes.number.isRequired,
    prev: PropTypes.func.isRequired,
    next: PropTypes.func.isRequired,
    isPrevDisabled: PropTypes.bool.isRequired,
    isNextDisabled: PropTypes.bool.isRequired,
};
export default Nav;