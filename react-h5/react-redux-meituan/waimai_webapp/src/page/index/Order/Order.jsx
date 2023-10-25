import React from 'react';
import { connect } from 'react-redux';
import { getOrderData } from '../actions/orderAction';
import ScrollView from '../../../component/ScrollView/ScrollView.jsx';
import ListItem from './ListItem/ListItem';
import './Order.scss';


/** #### TODO: 订单页 ---*/
class Order extends React.Component {
    constructor(props){
        super(props); 
        this.page = 0;
        this.state = { isend: false }; // 是否结束！
        this.fetchData(this.page);
    }
    // 请求数据
    fetchData(page){ this.props.dispatch(getOrderData(page)); }
    // 是否加载更多数据 || 无数据
    loadPage() {
        this.page++;
        if (this.page > 3) this.setState({ isend: true });  // console.log(this.page) // page=4 结束不再请求
        else this.fetchData(this.page);
    }
    renderList() {
        return this.props.list.map((item, index) => {
            // TODO: 渲染每一项Item中 可查看商家详情(/evaluation.html) / 可评价(/detail.html)
            return <ListItem itemData={item} key={index}></ListItem>
        });
    }
    render() {
        return (
            <div className="order">
                <div className="header">订单</div>
                <ScrollView dis="order" loadCallback={this.loadPage.bind(this)} isend={this.state.isend}>
                    <div className="order-list">{this.renderList()}</div>
                </ScrollView>
            </div>
        );
    }
}
export default connect(state => ({list: state.orderReducer.list}))(Order);