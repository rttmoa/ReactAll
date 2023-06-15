import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { getListData } from '../../../fetch/home/home'
import ListCompoent from '../../../components/List'    //---->  组件
import LoadMore from '../../../components/LoadMore'    //---->  组件
 

class List extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            data: [],
            hasMore: false,
            isLoadingMore: false,
            page: 0
        }
    }
    /***--- 渲染数据处理 ---**/
    renderList () {
        return this.state.data.length ? <ListCompoent data={this.state.data}/> : <div>正在加载中...</div>
    }
    /***--- 加载更多滚动处理.... ---**/
    renderLoadMore () {
        return  this.state.hasMore ? 
            <LoadMore isLoadingMore={this.state.isLoadingMore} loadMoreFn={this.loadMoreData.bind(this)}/> : null
    }
    render() {
        return (
            <div>
                <h2 style={{fontSize: '16px', color: '#666', margin: '10px 15px'}}>猜你喜欢</h2>
                {this.renderList()}
                {this.renderLoadMore()}
            </div>
        )
    }
    componentDidMount() {
        // 获取首页数据
        this.loadFirstPageData()
    }
    // 获取首页数据
    loadFirstPageData() {
        const cityName = this.props.cityName
        // console.log(cityName)
        const result = getListData(cityName, 0) // 请求地址： /api/homelist/%E5%A4%A9%E6%B4%A5/0
        this.resultHandle(result)// result回来的是Promise、所以需要.then()处理、 函数可复用、所以要封装使用
    }
    // 加载更多数据
    loadMoreData() {
        // 记录状态
        this.setState({isLoadingMore: true}) 
        const cityName = this.props.cityName
        const page = this.state.page
        const result = getListData(cityName, page) 
        this.resultHandle(result);
        this.setState({
            page: page + 1,
            isLoadingMore: false
        })
    }
    // 处理数据
    resultHandle(result) {
        result.then(res => {
            // console.log(res)// 在这里可以看到状态码、是否成功、URL地址等返回的基本信息
            return res.json()
        }).then(json => {
            // console.log(json) // 返回的数据为数组和hasMore、 {distance, id, img, number, price, subTitle, title}
            const hasMore = json.hasMore
            const data = json.data

            this.setState({
                hasMore: hasMore,
                // 注意，这里讲最新获取的数据，拼接到原数据之后，使用 concat 函数
                // 两种方法都可以ES6、ES7语法
                data: this.state.data.concat(data)
            })
            // console.log('同步2')
        }).catch(ex => {
            // if (__DEV__) {
            //     console.error('首页”猜你喜欢“获取数据报错, ', ex.message)
            // }
        })
    }
}

export default List