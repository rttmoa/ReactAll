import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import Item from './Item'

import './style.less'

// 用户订单 -> 您的订单
class OrderList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        
        // 订单接口数据 + 提交评价
        const data = this.props.data
        const submitComment = this.props.submitComment

        return (
            <div>
                {data.map((item, index) => {
                    // 渲染出图片+商户、价格、数量
                    return <Item key={index} data={item} submitComment={submitComment}/>
                })}
            </div>
        )
    }
}

export default OrderList