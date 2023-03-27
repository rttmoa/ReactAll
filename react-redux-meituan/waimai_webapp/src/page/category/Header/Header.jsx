import './Header.scss';
import React from 'react';
import { connect } from 'react-redux';
import { TABKEY } from '../config';
import { changeTab, getFilterData,changeFilter } from '../store/actions/headerAction'; 
import { getListData } from '../store/actions/contentListAction';




    


class Header extends React.Component {
    constructor(props) {
        super(props);
        this.fetchData();
    }
    fetchData(){
        this.props.dispatch(getFilterData());  // 获取全部分类过滤数据：全部分类、综合排序、满返代金券 所有数据
    }
    /**
     * 充值其他item的active状态
     */
    revertActive(key, dataList){
        if (key === TABKEY.cate) {
            for (let i = 0 ; i < dataList.length ; i++) {
                for (let j = 0 ; j < dataList[i].sub_category_list.length ;j++) {
                    dataList[i].sub_category_list[j].active = false;
                }
            }
        } else if (key === TABKEY.type) {
            for (let x = 0 ; x < dataList.length ; x++) {
                dataList[x].active = false;
            }
        } else {
            for (let k = 0 ; k < dataList.length ; k++) {
                for (let o = 0 ; o < dataList[k].items.length ;o++) {
                    dataList[k].items[o].active = false;
                }
            }
        }
    }
    /**
     * 变化当前点击的item状态 同时发起filter的请求
     */
    changeDoFilter(item, key, dataList){
        this.revertActive(key, dataList);
        item.active = true;
        this.props.dispatch(changeFilter({
            item,
            key
        }));

        this.props.dispatch(getListData({
            filterData: item,
            toFirstPage: true
        }));
    } 
    /***--- 点击切换tab ---**/
    changeTab(key) {
        let closePanel = false; // 是否关闭面板：否
        // 如果前后点击的是同一个tab 就关闭panel
        if (this.props.activeKey === key && !this.props.closePanel) {
            closePanel = true;
        }
        this.props.dispatch(changeTab({
            activeKey: key,
            closePanel: closePanel
        }));
    }
    /***--- 渲染顶部默认 Tabs --- {this.renderTabs()} ---**/
    renderTabs() {
        // console.log(this.props)
        let tabs = this.props.tabs;
        let array = [];
        for (let key in tabs) {
            let item = tabs[key]; // item是tabs中每一个对象
            let cls = item.key + ' item';
            if (item.key === this.props.activeKey && !this.props.closePanel) { // 点击key && 关闭面板
                cls += ' current';
            }
            array.push(
                <div className={cls} key={item.key} onClick={() => {this.changeTab(item.key)}}>
                    {item.text}
                </div>
            );
        }
        return array;
    }
    /**
     * 筛选内部的每个类目
     */
    renderFilterInnerContent(items, filterList) {
        return items.map((item, index) => {
            let cls = item.icon ? 'cate-box-inner has-icon' : 'cate-box-inner';
            if (item.active) {
                cls += ' active';
            }
            return (
                <div onClick={() => this.changeDoFilter(item, TABKEY.filter, filterList)} key={index} className="cate-box">
                    <div className={cls}>
                        {item.icon ? <img src={item.icon}/> : null}{item.name}
                    </div>
                </div>
            )
        });
    }
    /**
     * 筛选 - 筛选(一级分类)
     */
    renderFilterContent(){
        let filterList = this.props.filterData.activity_filter_list || [];
        return filterList.map((item, index)=>{
            return (
                <li key={index} className="filter-item">
                    <p className="filter-title">{item.group_title}</p>
                    <div className="item-content clearfix">
                        {this.renderFilterInnerContent(item.items, filterList)}
                    </div>
                </li>
            );
        })
    }
    /**
     * 筛选 - 综合排序(一级分类)
     */
    renderTypeContent(){
        let typeList = this.props.filterData.sort_type_list || [];
        return typeList.map((item, index)=>{
            let cls = item.active ? "type-item active" : "type-item";
            return (
                <li onClick={() => this.changeDoFilter(item, TABKEY.type, typeList)} key={index} className={cls}>
                    {item.name}
                </li>
            );
        })
    }
    /**
     * 全部分类里面的每个条目
     */
    renderCateInnerContent(items, cateList) {
        // 查看JSON文件中数据
        return items.sub_category_list.map((item, index)=>{
            let cls = item.active ? 'cate-box-inner active' : 'cate-box-inner';
            return (
                <div onClick={()=>this.changeDoFilter(item, TABKEY.cate, cateList)} key={index} className="cate-box">
                    <div className={cls}>
                        {item.name}({item.quantity})
                    </div>
                </div>
            )
        })
    }
    /**
     * 筛选 - 全部分类(一级分类)
     */
    renderCateContent(){
        // console.log(this.props)
        // 查看JSON文件中数据
        let cateList = this.props.filterData.category_filter_list || [];
        // 遍历全部分类中(二级分类)
        return cateList.map((item, index)=>{
            return (
                <li key={index} className="cate-item">
                    <p className="item-title">{item.name}<span className="item-count">{item.quantity}</span></p>
                    <div className="item-content clearfix">
                        {/* 遍历全部分类中(三级分类) */}
                        {this.renderCateInnerContent(item, cateList)}
                    </div>
                </li>
            )
        });
    }
    /**
     * 渲染过滤面板 --- {this.renderContent()}
     */
    renderContent() {
        let tabs = this.props.tabs;
        // console.log(tabs)
        let array = [];
        for (let key in tabs) {
            let item = tabs[key]; // item是tabs中每一个对象
            let cls = item.key + '-panel';
            if (item.key === this.props.activeKey) { // 点击的key
                cls += ' current';
            }

            if (item.key === TABKEY.cate) { // 如果是 cate && 全部分类
                array.push(
                    <ul key={item.key} className={cls}>
                        {this.renderCateContent()}
                    </ul>
                );
            } else if (item.key === TABKEY.type) { // 如果是type && 综合排序
                array.push(
                    <ul key={item.key} className={cls}>
                        {this.renderTypeContent()}
                    </ul>
                );
            } else if (item.key === TABKEY.filter) { // 如果是filter && 筛选
                array.push(
                    <ul key={item.key} className={cls}>
                        {this.renderFilterContent()}
                    </ul>
                );
            }
        }
        return array;
    }

    render() {
        let cls = 'panel';
        if (!this.props.closePanel) {
            cls += ' show';
        } else {
            cls = 'panel';
        }
        
        return (
            <div className="header">
                <div className="header-top">
                    {this.renderTabs()}
                </div>
                <div className={cls}>
                    <div className="panel-inner">
                        {this.renderContent()}
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    state =>({
        tabs: state.headerReducer.tabs,
        activeKey: state.headerReducer.activeKey,
        filterData: state.headerReducer.filterData,
        closePanel: state.headerReducer.closePanel
    }),
    null
)(Header);