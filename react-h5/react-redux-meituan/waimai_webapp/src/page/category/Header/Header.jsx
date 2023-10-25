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
    
    
    
    renderFilterInnerContent(items, filterList) { /** 筛选 内部的每个类目*/
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
    /** #### TODO: 渲染Tabs中所有的过滤条件  ---*/
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
            // FIXME: 显示面板
            // console.log(cls) 
            // 点击筛选条件后： cate-panel || type-panel || filter-panel current
            // 哪个current为true后显示新仓的面板
            // > ul{
            //     display:none; 
            //     &.current{ dispaly: block }
            // } 
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





    /** #### 点击切换Tabs.Item ---*/
    changeTab(key) {  
        let closePanel = false; 
        // 如果前后点击的是同一个tab 就关闭panel
        if (this.props.activeKey === key && !this.props.closePanel) {
            closePanel = true;
        }
        this.props.dispatch(changeTab({ activeKey: key, closePanel: closePanel }));
    }
    /** #### TODO: 渲染顶部Nav：全部分类cate||综合排序type||筛选filter  ---*/
    renderTabs(params, arr = []) {
        let tabs = this.props.tabs;  // tabs: {cate: {…}, type: {…}, filter: {…}}
        for (let key in tabs) {
            let item = tabs[key];  
            let cls = item.key + ' item';
            if (item.key === this.props.activeKey && !this.props.closePanel) { // 点击key && 关闭面板+false取反为true
                cls += ' current';
            }
            // console.log(cls) // type item current
            arr.push(<div className={cls} key={item.key} onClick={() => {this.changeTab(item.key)}}>{item.text}</div>);
        }
        return arr;
    }




    render() {
        let cls = 'panel';
        if (!this.props.closePanel)  cls += ' show';
        else cls = 'panel';
        // console.log(cls) // 面板条件：  如选中：panel show  未选中：panel


        return (
            <div className="header">
                {/* 三个Tabs */}
                <div className="header-top">
                    {this.renderTabs()}
                </div>
                {/* 三个Tabs下的 选项 */}
                <div className={cls}>
                    <div className="panel-inner">
                        {this.renderContent()}
                    </div>
                </div>
            </div>
        );
    }
}
// 
export default connect(state => ({
        tabs: state.headerReducer.tabs,
        activeKey: state.headerReducer.activeKey,
        filterData: state.headerReducer.filterData,
        closePanel: state.headerReducer.closePanel
}), null)(Header);