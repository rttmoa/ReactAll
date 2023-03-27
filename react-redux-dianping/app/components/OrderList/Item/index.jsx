import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
// import { postComment } from '../../../fetch/user/orderlist.js'
import Star from '../../Star'
import Img from './hamburger.png'
import './style.less'




// 用户主页 - 您的订单渲染
// 渲染评价的状态、控制显示与隐藏及颜色、评价几颗星处理Star、评价的回调函数及星星的回调函数
class Item extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            commentState: 2,  // commentState  0-未评价 1-评价中 2-已评价
            stars: {}
        }
    }
    render() {
        const data = this.props.data

        return (
            <div className="order-item-container">
                <div className="clear-fix">

                    <div className="order-item-img float-left">
                        {/* <img src={data.img}/> */}
                        <img src={Img} />
                    </div>

                    <div className="order-item-comment float-right">
                        {
                            this.state.commentState === 0
                            ? <button className="btn" onClick={this.showComment.bind(this)}>评价</button>
                            : this.state.commentState === 1 ? '' : <button className="btn unseleted-btn">已评价</button>
                        }
                    </div>

                    <div className="order-item-content">
                        <span>商户：{data.title}</span>
                        <span>数量：{data.count}</span>
                        <span>价格：￥{data.price}</span>
                    </div>
                </div>
                {
                    // “评价中”才会显示输入框
                    this.state.commentState === 1
                    ? <div className="comment-text-container">
                        <textarea style={{width: '100%', height: '80px'}} className="comment-text" ref="commentText"></textarea>
                        <div style={{paddingTop: '10px', paddingBottom: '10px'}}>
                            {/* 封装<i className={'icon-star'}></i> */}
                            <Star star="0" clickCallback={this.starClickCallback.bind(this)} />
                        </div>
                        <button className="btn" onClick={this.submitComment.bind(this)}>提交</button>
                        &nbsp;
                        <button className="btn unseleted-btn" onClick={this.hideComment.bind(this)}>取消</button>
                    </div>
                    : ''
                }
            </div>
        )
    }
    componentDidMount() { 
        this.setState({ commentState: this.props.data.commentState })
    }
    showComment() {
        this.setState({ commentState: 1 })
    }
    submitComment() {/***--- 点击评价后的操作 ---**/
        // 获取操作函数
        const submitComments = this.props.submitComment
        // 获取id
        const id = this.props.data.id
        // 获取 star 数量
        const stars = this.state.stars
        const star = stars[id] || '0'
        // 获取评价内容
        const commentTextDOM = this.refs.commentText // textarea ref
        const value = commentTextDOM.value.trim()
        if (!value) {
            return
        }

        // 执行数据提交
        submitComments(id, value, star, this.commentOk.bind(this))
    } 
    commentOk() {/***--- 父组件接收这个函数并回调执行 ---**/
        // console.log('父组件处理成功执行callback') // 父组件的callback()函数
        // 已经评价，修改状态
        this.setState({
            commentState: 2
        })
    }
    hideComment() {/***--- 隐藏输入框 ---**/ 
        this.setState({commentState: 0 })
    }
    starClickCallback(star) {
        // console.log('子组件的star', star) // 4：传递过来的数量

        let stars = this.state.stars // {}： 空对象

        const id = this.props.data.id // 1664423526213: 时间戳的id格式

        // stars['id'] = star // {id: 4}
        // stars.id = star // {id: 4}
        stars[id] = star // {1664423526213: 4} 这个id是值传递到对象中

        console.log('stars', stars) // {1664423526213: 4}

        this.setState({stars: stars})
    }
}

export default Item