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
    renderRightList(rightArray) { // @params: currentItem.spus
        let _rightArray = rightArray || [];
        return _rightArray.map((item, index)=>{
            if (!item.chooseCount) { // 如果没有chooseCount属性，就默认一个初始值为0
                item.chooseCount = 0;
            }
            return <MenuItem key={index} data={item} _index={index}></MenuItem>
        });
    } 
    itemClick(index) {this.props.dispatch(itemClick({currentLeftIndex: index}));}

    
    /** #### TODO: 渲染右边的列表 ---*/
    renderRight() {
        if(this.props){   
            let arrayList = this.props.listData.food_spu_tags; // 左侧13个菜单
            let currentItem = arrayList[this.props.currentLeftIndex];  // 当前选中的菜单项
            if(currentItem){
                // 右侧的数据列表
                let rightList = [
                    <p key={1} className="right-title">{currentItem.name}</p>,
                    <div key={2} className="right-list">
                        <div className="right-list-inner"> 
                            {currentItem.spus.map((item, index) => {
                                if(!item.chooseCount) item.chooseCount = 0;
                                return <MenuItem key={index} data={item} _index={index}></MenuItem>
                            })}
                        </div>
                    </div>
                ];
                return rightList
            }
            else{
                return null
            } 
        }
    }
    
    /** #### TODO: 菜单 ,,,, 左边的每个item中的spus属性中是右侧商品的内容  ---*/
    renderLeft() {
        return this.props && this.props.listData.food_spu_tags.map((item, index) => {
            const { icon, name } = item;
            let classNames = this.props.currentLeftIndex === index ? 'left-item active' : 'left-item';
            return (
                <div
                    className={classNames}
                    key={index} 
                    onClick={() => this.props.dispatch(itemClick({currentLeftIndex: index}))}  
                >
                    <div className="item-text">
                        {icon ? <img className="item-icon" src={icon} /> : null} {name}
                    </div>
                </div>
            )
        })
    }




    render(){ 
        // TODO: 渲染左侧的item时，根据点击的哪个index，渲染具体的哪些内容
        {/* // FIXME: 修改高和字体，且左侧可滚动 */}
        {/* 左侧CSS：对齐方式：(vertical-align; line-height: 0.53333rem; align-self: center; text-align: center;) */} 
        {/* 滚动：overflow：auto， overflow: x, overflow: y */}
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
    const { listData, currentLeftIndex } =  state.menuReducer;
    return { listData, currentLeftIndex }
}
export default connect(mapState, null)(Menu);