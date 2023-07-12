/* eslint-disable no-unused-vars */
import React from 'react';
import { connect } from 'react-redux';
import NavHeader from 'component/NavHeader/NavHeader';
import Header from '../Header/Header';
import ContentList from '../ContentList/ContentList';
import 'component/common.scss';


class Main extends React.Component {
    render() { 
        const { state, /* dispatch */ } = this.props;
        // console.log(state)   
        // List结果 + Filter条件 + ScrollViewer滚动
        // {
        //     contentListReducer: {list: Array(54), filterData: null, page: 3, isend: false}
        //     headerReducer: {tabs: {…}, activeKey: 'cate', filterData: {…}, closePanel: false}
        //     scrollViewReducer: {readyToLoad: true}
        // }  

        // TODO: 过滤条件中获取headerReducer的Redux数据，渲染到页面
        // TODO: 调试时，打开 查看结果
        // console.log("Filter", state.headerReducer) 
        return (
            <div className="category">

                <NavHeader title="分类"/>

                {/* Filter   过滤数据条件 */}
                {/* 
                    introduction： 跟据哪个过滤条件显示哪个面板的内容，渲染标题及每项条件，哪个隐藏，哪个显示 使用class
                    let cls = tabs[key].key + ' item';
                    if (item.key === this.props.activeKey && !this.props.closePanel) cls += ' current';
                */}
                <Header />
                  
                {/* ListData  滚动数据列表 */}
                <ContentList />

            </div>
        );
    }
}
export default connect(state =>({ state }), null)(Main);