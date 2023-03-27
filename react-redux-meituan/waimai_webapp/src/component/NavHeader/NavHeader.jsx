import './NavHeader.scss';
import React from 'react';
// import jsinvoke from 'component/jsapi';



/**
 * @constructor <NavHeader title={string}/>
 * @description 导航栏
 */
export default function NavHeader({ title = "" }) {
    function goBack(){ window.history.back() }
    return (
        <div className="nav">
            <div onClick={goBack} className="back-icon"></div>
            <h4 className="title">{title}</h4>
        </div>
    );
}





// class NavHeader extends React.Component {
//     goBack(){
//         window.history.back();
//         // jsinvoke({
//         //     cmd: 'goBack',
//         //     data: {}
//         // });
//     }
//     render(){
//         return (
//             <div className="nav">
//                 <div onClick={()=>this.goBack()} className="back-icon"></div>
//                 <h4 className="title">{this.props.title}1</h4>
//             </div>
//         );
//     }
// }
// export default NavHeader;
