import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import HomeAd from '../../../components/HomeAd/index'    //---->  组件
import { getAdData } from '../../../fetch/home/home'



class Ad extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            data: []
        }
    }
    render() {
        // console.log(this.state.data) //有6条记录 ： [6: {title: '暑假5折', img: 'http://images2015.c7796.png',link:"http://www.imooc.com/wap/index"]
        
        return <div>{this.state.data.length ? <HomeAd data={this.state.data}/> : <div>加载中...</div>}</div>
    }
    componentDidMount() {
        // 获取广告数据
        const result = getAdData()
        result.then(res => {
            // console.log(res)
            return res.json()
        }).then(json => {
            // 处理获取的数据
            const data = json
            // console.log(data) // true
            if (data.length) this.setState({ data })
        }).catch(ex => { 
            // if (__DEV__) { console.error('首页广告模块获取数据报错, ', ex.message) }
        })
    }
}

export default Ad