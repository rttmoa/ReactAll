import './Menu.scss';
import React from 'react';
import { connect } from 'react-redux';
import { getListData, itemClick } from '../store/actions/menuAction';
import MenuItem from './MenuItem/MenuItem';
import ShopBar from './ShopBar/ShopBar';



/**
 * 点菜tab页面
 * @description <Menu />
 */
class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.props.dispatch(getListData());
    }


    /***--- TODO: 渲染spus数组中内容 ---**/
    renderRightList(array) {
        let _array = array || [];
        return _array.map((item, index)=>{
            if (!item.chooseCount) { // 如果没有chooseCount属性，就默认一个初始值为0
                item.chooseCount = 0;
            }
            return <MenuItem key={index} data={item} _index={index}></MenuItem>
        });
    }

    /***--- 点击index切换右边数据 ---**/
    itemClick(index) {this.props.dispatch(itemClick({currentLeftIndex: index}));}
    
    /***--- 渲染右边的列表 ---**/
    renderRight() {
        let index = this.props.currentLeftIndex; // 获取点击的索引
        let array = this.props.listData.food_spu_tags || []; // 获取所有数据
        let currentItem = array[index];
        // console.log("currentItem", currentItem) // 点击的Index中的数据

        if (currentItem) {
            // 此title是右侧内容顶部的标题
            let title = <p key={1} className="right-title">{currentItem.name}</p>
            return [
                title,
                <div key={2} className="right-list">
                    <div className="right-list-inner">{this.renderRightList(currentItem.spus)}</div>
                </div>
            ]
        } else {
            return null
        }
    }
    /***--- 渲染左边的列表 ---**/
    // TODO: 左边的每个item中的spus属性中有每个children
    renderLeft() {
        // console.log("this.props", this.props.listData)
        let list = this.props.listData.food_spu_tags || [];

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