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
        // FIXME: 当进入分类页面时，在redux中发请求，获取所有 过滤条件
        this.props.dispatch(getFilterData());   
    }
    /** FIXME: */
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
     * FIXME: 当点击分类条件中内部数据时，都会经过此函数到redux中
     */
    changeDoFilter(item, key, dataList){
        // console.log("changeDoFilter", item, key, dataList)
        this.revertActive(key, dataList);
        item.active = true;

        this.props.dispatch(changeFilter({  // FIXME: 切换过滤条件，将条件存储到redux
            item,
            key
        }));
        // console.log("item", item) // 点击的条件的那一个对象
        this.props.dispatch(getListData({  // FIXME: 获取 商家数据，根据条件获取商家数据
            filterData: item,
            toFirstPage: true
        }));
    }
    
    changeTab(key) { /***--- 点击切换tab ---**/
        // 是否关闭面板：否
        let closePanel = false; 
        // 如果前后点击的是同一个tab 就关闭panel
        if (this.props.activeKey === key && !this.props.closePanel) {
            closePanel = true;
        }
        this.props.dispatch(changeTab({ // 切换tabs将key传递给redux
            activeKey: key,
            closePanel: closePanel
        }));
    }
    /**
     * TODO: 渲染顶部Nav：全部分类cate||综合排序type||筛选filter 
     */
    renderTabs() {
        // console.log(this.props)
        let tabs = this.props.tabs;
        let array = [];
        for (let key in tabs) { // 遍历tabs对象
            let item = tabs[key]; // item是tabs中每一个对象
            let cls = item.key + ' item';
            if (item.key === this.props.activeKey && !this.props.closePanel) { // 点击key && 关闭面板+false取反为true
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
    
    renderFilterInnerContent(items, filterList) { /** 筛选内部的每个类目*/
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
    
    renderFilterContent() { /** 筛选表头-多选 */
        // console.log("筛选", this.props.filterData.activity_filter_list)
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
   
    renderTypeContent(){  /** 综合排序表头-6种*/
        // console.log("综合排序", this.props.filterData.sort_type_list)
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
   
    renderCateInnerContent(items, cateList) {  /** 全部分类里面的每个条目 */
        // 这段遍历 相当于children数据
        return items.sub_category_list.map((item, index)=>{
            let cls = item.active ? 'cate-box-inner active' : 'cate-box-inner';
            return (
                <div onClick={() => this.changeDoFilter(item, TABKEY.cate, cateList)} key={index} className="cate-box">
                    <div className={cls}>
                        {/* 菜品名+数量 */}
                        {item.name}({item.quantity})
                    </div>
                </div>
            )
        })
    }
    
    renderCateContent(){ /** 全部分类表头-2844种*/ 
        // console.log("全部分类", this.props.filterData.category_filter_list)
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
     * TODO: 渲染面板中数据 
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
        // console.log("array", array)
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

export default connect(state =>({
        tabs: state.headerReducer.tabs,
        activeKey: state.headerReducer.activeKey,
        filterData: state.headerReducer.filterData,
        closePanel: state.headerReducer.closePanel
}), null)(Header);