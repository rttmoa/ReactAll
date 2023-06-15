import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import Header from '../../components/Header'     //---->  组件
import CurrentCity from '../../components/CurrentCity'     //---->  组件
import CityList from '../../components/CityList'      //---->  组件
import * as userInfoActionsFromOtherFile from '../../actions/userinfo'
import { CITYNAME } from '../../config/localStoreKey'
import localStore from '../../util/localStore'




// this.clickHandle.bind(this, '南京') 带参数传递
// newCity == null 比较null是两个等号还是三个等号
// 点击要修改的城市后, 保存到Redux, 保存到localStoreage, 跳转到首页
class City extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            <div>
                <Header title="选择城市"/>
                <CurrentCity cityName={this.props.userinfo.cityName}/>
                <CityList changeFn={this.changeCity.bind(this)}/>
            </div>
        )
    }
    changeCity(newCity) {
        // console.log(newCity) // 分别测试 null和undefined的取值
        // console.log(newCity == null)
        // console.log(newCity === null)
        // console.log(newCity == undefined)
        // console.log(newCity === undefined)
        // return
        if (newCity == null || newCity ==  Object) { return }
        const userinfo = this.props.userinfo
        userinfo.cityName = newCity
        this.props.userInfoActions.update(userinfo) 

        // 修改 cookie
        localStore.setItem(CITYNAME, newCity)

        // 跳转页面
        hashHistory.push('/')
    }
} 
function mapStateToProps(state) {
    return {
        userinfo: state.userinfo
    }
} 
function mapDispatchToProps(dispatch) {
    return {
        userInfoActions: bindActionCreators(userInfoActionsFromOtherFile, dispatch)
    }
}
export default connect( mapStateToProps, mapDispatchToProps )(City)