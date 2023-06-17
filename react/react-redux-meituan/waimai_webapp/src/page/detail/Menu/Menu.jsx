import './Menu.scss';
import React from 'react';
import { connect } from 'react-redux';
import { getListData, itemClick } from '../store/actions/menuAction';
import MenuItem from './MenuItem/MenuItem';
import ShopBar from './ShopBar/ShopBar';



/** #### TODO: 点菜 / 购物车 页面 ---*/
class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.props.dispatch(getListData());
    }


    /***--- 渲染右侧商品列表数据 ---**/
    renderRightList(rightArray) {
        let _rightArray = rightArray || [];
        return _rightArray.map((item, index)=>{
            if (!item.chooseCount) { // 如果没有chooseCount属性，就默认一个初始值为0
                item.chooseCount = 0;
            }
            return <MenuItem key={index} data={item} _index={index}></MenuItem>
        });
    }

    /***--- 点击index切换右边数据 ---**/
    itemClick(index) {this.props.dispatch(itemClick({currentLeftIndex: index}));}
    
    /** #### TODO: 渲染右边的列表 ---*/
    renderRight() {
        let currentLeftIndex = this.props.currentLeftIndex; // 获取左侧点击的索引
        let list = this.props.listData.food_spu_tags || [];  
        let currentItem = list[currentLeftIndex]; // 同下
        if (currentItem) {
            let title = <p key={1} className="right-title">{currentItem.name}</p>
            return [
                title,
                <div key={2} className="right-list">
                    <div className="right-list-inner">{this.renderRightList(currentItem.spus)}</div>
                </div>
            ]
        } else return null
    }
    /** #### TODO: 渲染左边的列表 ,,,, 左边的每个item中的spus属性中是右侧商品的内容  ---*/
    renderLeft() {
        let list = this.props.listData.food_spu_tags || [];
        // console.log(list) // list: (13)[{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
        return list.map((item, index) => {
            let cls = this.props.currentLeftIndex === index ? 'left-item active' : 'left-item';
            return (
                <div onClick={() => this.itemClick(index)} key={index} className={cls}>
                    <div className="item-text">{item.icon ? <img className="item-icon" src={item.icon} /> : null} {item.name}</div>
                </div>
            )
        })
    }




    render(){ 
        // TODO: 渲染左侧的item时，根据点击的哪个index，渲染具体的哪些内容
        return (
            <div className="menu-inner">
                <div className="left-bar">
                    <div className="left-bar-inner">
                        {this.renderLeft()}
                    </div>
                </div>
                <div className="right-content">
                    {this.renderRight()}
                </div>
                <ShopBar />
            </div>
        );
    }
}
function mapState(state) {
    return {
        listData: state.menuReducer.listData,
        currentLeftIndex: state.menuReducer.currentLeftIndex
    }
}
export default connect(mapState, null)(Menu);