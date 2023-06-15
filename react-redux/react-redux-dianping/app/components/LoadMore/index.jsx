import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import './style.less'


// 用户点评 和 首页下拉加载 都用到了这个组件
class LoadMore extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            // 父组件中处理, 控制是否加载更多, 控制数据的增加
            <div className="load-more" ref="wrapper">  
                {this.props.isLoadingMore ? <span>加载中...</span> : <span onClick={this.loadMoreHandle.bind(this)}>加载更多</span>}
            </div>
        )
    }
    loadMoreHandle() { this.props.loadMoreFn() } // 点击加载更多 || scroll触发加载更多

    /***--- 节流函数 ---**/
    componentDidMount() {  
        // 使用滚动时自动加载更多
        const loadMoreFn = this.props.loadMoreFn;
        const wrapper = this.refs.wrapper;
        let timeoutId;

        function callback() {
            const top = wrapper.getBoundingClientRect().top   // 加载更多盒子距离最顶部的距离 
            const windowHeight = window.screen.height; // S8+: 740(可以滚动)     S20U: 915(不可滚动)
            // console.log('top', top)
            // console.log('windowHeight', windowHeight)

            // 证明 wrapper 已经被滚动到暴露在页面可视范围之内了
            if (top && top < windowHeight) {
                loadMoreFn()
            }
        }
        function scrollFn() {
            // console.log(this.props.isLoadingMore)
            // console.log(this.refs.wrapper.getBoundingClientRect())// 获取DOM属性的上下左右的距离
            if (this.props.isLoadingMore) return 
            if (timeoutId) {
                clearTimeout(timeoutId)
            }
            timeoutId = setTimeout(callback, 1000) 
        }
        window.addEventListener('scroll', scrollFn.bind(this), false);
    }
}

export default LoadMore