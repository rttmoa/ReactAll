import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { hashHistory } from 'react-router'
import LocalStore from '../../util/localStore'
import { USERINFO } from '../../config/localStoreKey'
import * as userInfoActionsFromOtherFile from '../../actions/userinfo' 
import Header from '../../components/Header'    //---->  组件
import LoginComponent from '../../components/Login'    //---->  组件
 




class Login extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = { 
            checking: true, // 是否已经登陆了
        }
    }
    render() {
        return (
            <div>
                <Header title="登录"/>
                { this.state.checking ? <div>{/* 等待中 */}</div> : <LoginComponent loginHandle={this.loginHandle.bind(this)}/> }
            </div>
        )
    }
    componentDidMount() { this.doCheck() }
    doCheck() {  /***--- 判断是否已经登录 ---**/
        // const userinfo = this.props.userinfo 
        // if (userinfo.username) {
        //     // 已经登录，则跳转到用户主页
        //     this.goUserPage();
        // } else {
        //     // 未登录，则验证结束
        //    this.setState({ checking: false  });
        // }
        const { userinfo } = this.props.userinfo; 
        userinfo ? this.goUserPage() : this.setState({checking: false}) // 修改代码
    }
    // 处理登录之后的事情 - 子组件直接传递过来的
    loginHandle(username) {
        // console.log('Login->loginHandle', this.props)
        // return
        // 保存用户名
        const actions = this.props.userInfoActions
        let userinfo = this.props.userinfo
        userinfo.username = username
        actions.update(userinfo)

        // 存储到localstoreage中
        LocalStore.setItem(USERINFO, username)

        const params = this.props.params // 路由中的参数 - 就是说从哪里来的
        const router = params.router
        
        if (router) {
            // 跳转到指定的页面
            hashHistory.push(router) // routeParams: router:"/detail/9940456493697718"
        } else {
            // 跳转到用户主页
            this.goUserPage() // 如果没有就是 undefined
        }
    }
    goUserPage() {
        hashHistory.push('/User')
    }
} 
function mapStateToProps(state) {
    // console.log(state) // 已登陆：userinfo:{cityName: '武汉', username: '123'} 
    return {
        userinfo: state.userinfo
    }
}
function mapDispatchToProps(dispatch) { 
    return {
        userInfoActions: bindActionCreators(userInfoActionsFromOtherFile, dispatch)
    }
}
export default connect( mapStateToProps, mapDispatchToProps )(Login)