import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import LocalStore from '../util/localStore'
import { CITYNAME } from '../config/localStoreKey'
import * as userInfoActionsFromOtherFile from '../actions/userinfo' 



/***--- 1、获取localstoreage存储数据 | 2、存储到Redux | 3、展示主页面 ---**/
class App extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            initDone: false
        }
    }
    componentDidMount() {
        // 获取位置信息
        let cityName = LocalStore.getItem(CITYNAME) // 在本地存储中清除USER_CURRENT_CITY_NAME、返回的cityName=null
        // console.log(cityName) // null
        // console.log(cityName === null) // true
        // console.log(cityName == undefined) // true
        // console.log(cityName === undefined) // false
        if (cityName == null) {
            cityName = '北京'
        }
        this.props.userInfoActions.update({
            cityName: cityName
        })

        // 更改状态
        this.setState({ initDone: true })
    }
    render() {
        // console.log(this.props)
        return (
            <div>
                { this.state.initDone ? this.props.children : <div>正在加载...</div> }
            </div>
        )
    }
    
} 
function mapStateToProps(state) {
    return {
    }
}

function mapDispatchToProps(dispatch) {
    // console.log(userInfoActionsFromOtherFile) // {__esModule: true, update: ƒ, User: ƒ}
    return {
        userInfoActions: bindActionCreators(userInfoActionsFromOtherFile, dispatch),
    }
}
export default connect( mapStateToProps, mapDispatchToProps )(App) 