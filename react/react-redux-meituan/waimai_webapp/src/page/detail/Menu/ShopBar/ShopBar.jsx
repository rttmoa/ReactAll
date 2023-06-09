import './ShopBar.scss';
import React from 'react';
import { connect } from 'react-redux';
import { showChoose,addSelectItem,minusSelectItem, clearCar } from '../../store/actions/menuAction';



class ShopBar extends React.Component {
    /**
     * 获取总价
     */
    getTotalPrice(){
        let listData = this.props.listData.food_spu_tags || [];
        let totalPrice = 0;
        let dotNum = 0;
        let chooseList = [];

        for (let i = 0 ; i < listData.length ; i++) {
            let spus = listData[i].spus || [];
            for (let j = 0 ; j < spus.length ; j++) {
                let chooseCount = spus[j].chooseCount;
                if (chooseCount > 0) {
                    dotNum += chooseCount;
                    spus[j]._index = j;
                    spus[j]._outIndex = i;
                    chooseList.push(spus[j]);
                    totalPrice += spus[j].min_price * chooseCount;
                }
            }
        }

        return {
            dotNum,     // 选择的商品数量
            totalPrice, // 选择的商品总价
            chooseList  // 选择的商品数据
        }
    }
    /***--- 添加菜品数量 ---**/
    addSelectItem(item){
        this.props.dispatch(addSelectItem({
            index: item._index,
            outIndex: item._outIndex
        }));
    }
    /***--- 减少菜品数量 ---**/
    minusSelectItem(item){
        this.props.dispatch(minusSelectItem({
            index: item._index,
            outIndex: item._outIndex
        }));
    }
    /***--- 已选择的商品 ---**/
    renderChooseItem(data){
        let array = data.chooseList || [];
        return array.map((item, index)=>{
            return (
                <div key={index} className="choose-item">
                    <div className="item-name">{item.name}</div>
                    <div className="price">¥{item.min_price * item.chooseCount}</div>
                    <div className="select-content">
                        <div onClick={()=>this.minusSelectItem(item)} className="minus"></div>
                        <div className="count">{item.chooseCount}</div>
                        <div onClick={()=>this.addSelectItem(item)} className="plus"></div>
                    </div>
                </div>
            )
        })
    }
    /***--- 打开或隐藏购物车已选择列表 ---**/
    openChooseContent(){
        let flag = this.props.showChooseContent;
        this.props.dispatch(showChoose({
            flag: !flag
        }));
    }
    /***--- 晴空购物车 ---**/
    clearCar(){
        this.props.dispatch(clearCar());
        this.props.dispatch(showChoose({
            flag: false
        }));
    }



    render(){
        // console.log("this.props.listData", this.props.listData)
        let shipping_fee = this.props.listData.poi_info ? this.props.listData.poi_info.shipping_fee : 0; // 配送费
        let data = this.getTotalPrice();
        return (
            <div className="shop-bar">
                {/* 使用点击黄色购物车控制购物车中的内容显示与隐藏 */}
                {this.props.showChooseContent ?
                    <div className="choose-content">
                        <div className="content-top">
                            <div onClick={()=>this.clearCar()} className="clear-car">清空购物车</div>
                        </div>
                        {this.renderChooseItem(data)}
                    </div>  : null
                }
                {/* 底部 */}
                <div className="bottom-content">
                    <div onClick={() => this.openChooseContent()} className="shop-icon">
                        {data.dotNum > 0 ? <div className="dot-num">{data.dotNum}</div> : null}
                    </div>
                    <div className="price-content">
                        <p className="total-price">¥{data.totalPrice}</p>
                        <p className="other-price">另需配送&nbsp;¥{shipping_fee}</p>
                    </div>
                    <div className="submit-btn">去结算</div>
                </div>
            </div>
        );
    }
}
function mapState (state) {
    return {
        listData: state.menuReducer.listData,
        showChooseContent: state.menuReducer.showChooseContent,
    }
}
export default connect(mapState, null)(ShopBar);

