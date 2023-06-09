import React, { memo } from 'react';
import PropTypes from 'prop-types';
import '../css/Ticket.css';





/***--- 坐席 + 坐位 + 金额 ---**/
export const Ticket = memo(({price, type}) => (
    <div className='ticket'>
        <p>
            <span className="ticket-type">{type}</span>
            <span className="ticket-price">{price}</span>
        </p>
        <div className="label">坐席</div>
    </div>
));
Ticket.propTypes = {
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    type: PropTypes.string.isRequired,
}



// 原
// const Ticket = memo(function Ticket(props) {
//     const { price, type } = props;
//     return (
//         <div className="ticket">
//             <p>
//                 <span className="ticket-type">{type}</span>
//                 <span className="ticket-price">{price}</span>
//             </p>
//             <div className="label">坐席</div>
//         </div>
//     );
// });
// Ticket.propTypes = {
//     price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//     type: PropTypes.string.isRequired,
// };
// export default Ticket;
