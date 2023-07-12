import './NavHeader.scss';
import React from 'react';
// import jsinvoke from 'component/jsapi';



/**
 * @constructor <NavHeader title={string}/>
 * @description 导航栏
 */
export default function NavHeader({ title = "" }) {
    function goBack(){
        window.history.back() 
        // jsinvoke({cmd: "goBack", data: {}})
    }
    return (
        <div className="nav">
            <div onClick={goBack} className="back-icon"></div>
            <h4 className="title">{title}</h4>
        </div>
    );
} 
