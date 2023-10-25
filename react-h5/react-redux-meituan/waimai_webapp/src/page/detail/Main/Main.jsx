import 'component/common.scss';
import './Main.scss';
import React from 'react';
import { connect } from 'react-redux';
import NavHeader from 'component/NavHeader/NavHeader';
import { Route, withRouter, NavLink } from 'react-router-dom';

import Menu from '../Menu/Menu';
import Comment from '../Comment/Comment';
import Restanurant from '../Restanurant/Restanurant';





class Main extends React.Component {
    
    /** #### 渲染  点菜 / 评价 / 商家 ---*/
    // renderTabs() { 
    //     return this.props.tabs.map((item) => {
    //         return <NavLink 
    //             className="tab-item" activeClassName="active" replace={true} to={'/' + item.key} key={item.key} /* onClick={() => this.changeTab(item)} */>
    //             {item.name}
    //         </NavLink>
    //     })
    // }
    render(){
        let poiName = this.props.poiInfo.poi_info ? this.props.poiInfo.poi_info.name : '';
        return (
            <div className="detail">
                <NavHeader title={poiName} />

                <div className="tab-bar">
                    {/* {this.renderTabs()} */}
                    {this.props.tabs.map(item => {
                        return (
                            <NavLink className="tab-item" activeClassName="active" replace={true} to={'/' + item.key} key={item.key} 
                                /* onClick={() => this.changeTab(item)} */
                            >
                                {item.name}
                            </NavLink>
                        )
                    })}
                </div>

                {/* TODO: 切换Tabs地址栏变化，Route匹配path，渲染component */}
                <Route exact path="/menu" component={Menu} />
                <Route path="/comment" component={Comment} />
                <Route path="/restanurant" component={Restanurant} />

                {/* 全屏遮罩部分 */}
                {this.props.showChooseContent ? <div className="mask"></div> : null}
            </div>
        );
    }
}
function mapState(state) {
    return {
        tabs: state.tabReducer.tabs,
        showChooseContent: state.menuReducer.showChooseContent,
        poiInfo: state.menuReducer.poiInfo
    }
}
export default withRouter(connect(mapState, null)(Main));