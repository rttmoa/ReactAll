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
    /***--- TODO: 渲染列表数据 ---**/
    renderList () {
        return this.state.data.length ? <ListCompoent data={this.state.data}/> : <div>正在加载中...</div>
    }
    /***--- TODO: 加载更多滚动处理.... ---**/
    renderLoadMore () { 
        const { hasMore } = this.state;
        let loadMore = <LoadMore isLoadingMore={this.state.isLoadingMore} loadMoreFn={this.loadMoreData.bind(this)}/>
        return  hasMore ? loadMore : null
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
        this.loadFirstPageData()
    }
    // 获取首页数据
    loadFirstPageData() {
        const cityName = this.props.cityName; 
        const result = getListData(cityName, 0) // 请求地址： /api/homelist/%E5%A4%A9%E6%B4%A5/0
        this.resultHandle(result)// promise
    }
    // TODO: 加载更多数据
    loadMoreData() { 
        this.setState({ isLoadingMore: true })  
        const result = getListData(this.props.cityName, this.state.page); // query：{cityName, page} 
        this.resultHandle(result); // promise
        this.setState({
            page: this.state.page + 1,
            isLoadingMore: false
        })
    }
    // 处理数据
    resultHandle(result) {
        result.then(res => { return res.json() }).then(json => { // res: 在这里可以看到状态码、是否成功、URL地址等返回的基本信息
            // console.log(json) // 返回的数据为数组和hasMore、 {distance, id, img, number, price, subTitle, title}
            const hasMore = json.hasMore
            const data = json.data
            this.setState({ hasMore: hasMore, data: this.state.data.concat(data) }) 
        }).catch(ex => {
            // if (__DEV__) console.error('首页”猜你喜欢“获取数据报错, ', ex.message)
        })
    }
}

export default List