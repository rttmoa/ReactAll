import React, { memo, useMemo } from 'react';
import URI from 'urijs';
import PropTypes from 'prop-types';
import '../css/List.css';






const ListItem = memo(function ListItem(props) {
    // console.log(props);
    const { dTime = "", aTime, dStation, aStation, trainNumber, date, time, priceMsg, dayAfter } = props;

    const url = useMemo(() => {
        return new URI('ticket.html')
            .setSearch('aStation', aStation)
            .setSearch('dStation', dStation)
            .setSearch('trainNumber', trainNumber)
            .setSearch('date', date)
        .toString();
    }, [aStation, dStation, trainNumber, date])
    // console.log(url) // 渲染14次： ticket.html?aStation=%E5%8D%97%E4%BA%AC&dStation=%E5%8C%97%E4%BA%AC&trainNumber=D717&date=2019-02-10

    return (
        <li className="list-item">
            <a href={url}>
                {/* 出发时间 - 到达时间 */}
                <span className="item-time">
                    <em>{dTime}</em>
                    <br />
                    <em className="em-light">{aTime} <i className="time-after">{dayAfter}</i></em>
                </span>
                {/* 始发站 - 终点站 */}
                <span className="item-stations">
                    <em><i className="train-station train-start">始</i>{dStation}</em>
                    <br />
                    <em className="em-light"><i className="train-station train-end">终</i>{aStation}</em>
                </span>
                {/* 火车编号 - 路程时长 */}
                <span className="item-train">
                    <em>{trainNumber}</em>
                    <br />
                    <em className="em-light">{time}</em>
                </span>
                {/* 价格 - 可抢票 */}
                <span className="item-ticket">
                    <em>{priceMsg}</em>
                    <br />
                    <em className="em-light-orange">可抢票</em>
                </span>
            </a>
        </li>
    );
});
ListItem.propTypes = {
    dTime: PropTypes.string.isRequired,
    aTime: PropTypes.string.isRequired,
    dStation: PropTypes.string.isRequired,
    aStation: PropTypes.string.isRequired,
    trainNumber: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    priceMsg: PropTypes.string.isRequired,
    dayAfter: PropTypes.string.isRequired,
}



const List = memo(function List(props) {
    const { list } = props;
    // console.log(list) // 14 条车票信息

    return (<ul className="list">
        {list.map(item => (
            <ListItem {...item} key={item.trainNumber} />
        ))}
    </ul>);
})
List.propTypes = {
    list: PropTypes.array.isRequired,
};

export default List;
