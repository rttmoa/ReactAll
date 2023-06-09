import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { getInfoData } from '../../../fetch/detail/detai'
import DetailInfo from '../../../components/DetailInfo'    //---->  组件
// import s from '../../../../mock/server'



class Info extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            info: false
        }
    }
    render() {
        // console.log(this.state.info)
        return (<div> { this.state.info ? <DetailInfo data={this.state.info}/> : "" } </div>)
    }
    /***--- 获取商户信息 ---**/
    componentDidMount() { this.getInfo() }
    getInfo() {
        const id = this.props.id;
        const result = getInfoData(id)
        result.then(res => {
            return res.json();
        }).then(json => {
            // console.log('获取商户信息', json)
            this.setState({ info: json })
        }).catch(ex => {
            // if (__DEV__) {
            //     console.error('详情页，获取商户信息出错')
            // }
        })
    }
}

export default Info