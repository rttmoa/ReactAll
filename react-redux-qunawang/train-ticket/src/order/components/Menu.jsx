import React, { memo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import '../css/Menu.css';





const MenuItem = memo(function MenuItem(props) {
    const { onPress, title, value, active } = props;
    return <li className={classnames({ active })} onClick={() => { onPress(value) }}>{title}</li>
});
MenuItem.propTypes = {
    onPress: PropTypes.func,
    title: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    active: PropTypes.bool.isRequired,
};


/***--- 是选择成人票还是儿童票 ---**/
const Menu = memo(function Menu(props) {
    const { show, options, onPress, hideMenu } = props;
    // console.log(options) // (2)[{title: '成人票', value: 'adult', active: true}, {title: '儿童票', value: 'child', active: false}]
    // console.log(options)    // (2)[{title: '男', value: 'male', active: false}, {title:'女',value:'female',active:false}]
    
    return (
        <div>
            {/* 盒子的遮罩部分 */}
            {show && <div className="menu-mask" onClick={() => hideMenu()}></div>}
            <div className={classnames('menu', { show })}>
                <div className="menu-title">test</div>
                <ul>
                    {options && options.map(option => {
                        return <MenuItem key={option.value} {...option} onPress={onPress}></MenuItem>
                    })}
                </ul>
            </div>
        </div>
    )
}); 
Menu.propTypes = {
    show: PropTypes.bool.isRequired,
    options: PropTypes.array,
    onPress: PropTypes.func,
    hideMenu: PropTypes.func.isRequired,
};

export default Menu;
