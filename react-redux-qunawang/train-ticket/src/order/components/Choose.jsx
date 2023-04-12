import React, { memo } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import '../css/Choose.css';




/***--- 在线选座 ---**/
const Choose = memo(function Choose(props) {
    const { passengers, updatePassenger } = props;
    // console.log(passengers) //  {id: 1, name: '', ticketType: 'adult', licenceNo: '', seat: 'C'}  
    // SEAT: 默认是 Z
    
    function createSeat(seatType) {
        return (
            <div>
                {passengers.map(passenger => {
                    return (
                        <p key={passenger.id} data-text={seatType}
                            className={classnames('seat', {active: passenger.seat === seatType})} 
                            onClick={() => updatePassenger(passenger.id, { seat: seatType })}
                        >&#xe02d;</p>
                    )
                })}
            </div>
        );
    }

    return (
        <div className="choose">
            <p className="tip">在线选座</p>
            <div className="container">
                <div className="seats">
                    <div>窗</div>
                    {createSeat('A')}
                    {createSeat('B')}
                    {createSeat('C')}
                    <div>过道</div>
                    {createSeat('D')}
                    {createSeat('F')}
                    <div>窗</div>
                </div>
            </div>
        </div>
    );
});
Choose.propTypes = {
    passengers: PropTypes.array.isRequired,
    updatePassenger: PropTypes.func.isRequired,
};

export default Choose;
