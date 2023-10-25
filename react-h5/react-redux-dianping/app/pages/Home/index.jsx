import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
// import { bindActionCreators } from 'redux'  // 此Home不需要dispatch
import { connect } from 'react-redux'
import HomeHeader from '../../components/HomeHeader'    //---->  组件
import Category from '../../components/Category'    //---->  组件
import Ad from './subpage/Ad'
import List from './subpage/List'

class Home extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            <div> 
                {/* 头部选择城市 -> 去City路由中处理 存储redux中了 */}
                <HomeHeader cityName={this.props.userinfo.cityName}/>

                {/* 轮播图 - CSS结构 */}
                <Category />
                
                <div style={{height: '3px',textAlign:'center'  }}>{/* '分割线' */}</div>

                {/* 超值特惠 */}
                <Ad/>

                {/* TODO: 猜你喜欢 - 滚动加载(节流) */}
                <List cityName={this.props.userinfo.cityName} />
            </div>
        )
    }
} 
export default connect((state) => { return { userinfo: state.userinfo }}, null )(Home)