import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux'
import ListCompoent from '../../../components/List'    //---->  组件
import LoadMore from '../../../components/LoadMore'    //---->  组件
import { getSearchData } from '../../../fetch/search/search'
// import s from '../../../../mock/server'

// 初始化一个组件的 state
const initialState = {
    data: [],
    hasMore: false,
    isLoadingMore: false,
    page: 0
}

/**
 * 商户列表数据==>
 * 一、首页输入框中按下回车后跳转的： http://localhost:8080/#/search/all/?_k=zcjaz7 页面、里面的 [商户] 列表数据
 * 二、使用钩子函数 componentDidMount 和 componentDidUpdate
 * 三、搜索页的搜索的关键词和之前的关键词是否一致
 * 四、加载更多功能的组件复用功能<LoadMore />
 */
class SearchList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = initialState
    }
    render() {
        // console.log(this.state)
        console.log("page",this.state.page)
        return (
            <div>
                {this.state.data.length ? <ListCompoent data={this.state.data}/> : <div></div>}
                {this.state.hasMore ? <LoadMore isLoadingMore={this.state.isLoadingMore} loadMoreFn={this.loadMoreData.bind(this)}/> : ""}
            </div>
        )
    }
    /***--- 获取首页数据 ---**/
    componentDidMount() { this.loadFirstPageData() }
    /***--- 获取首页数据 ---**/
    loadFirstPageData() {
        const cityName = this.props.userinfo.cityName
        const keyword = this.props.keyword || ""
        const category = this.props.category
        const result = getSearchData(0, cityName, category, keyword) //-->    /api/search/0/北京/all/UserName长
        this.resultHandle(result)
    }
    /***--- 加载更多数据 ---**/
    loadMoreData() {
        // 记录状态
        this.setState({ isLoadingMore: true })

        const cityName = this.props.userinfo.cityName
        const page = this.state.page
        const keyword = this.props.keyword || ""
        const category = this.props.category
        const result = getSearchData(page, cityName, category, keyword) //-->    /api/search/0/北京/all/UserName长
        this.resultHandle(result)

        // 更新状态
        this.setState({ isLoadingMore: false })
    }
    /***--- 处理数据 ---**/
    resultHandle(result) {
        // 增加 page 计数
        const page = this.state.page;
        this.setState({ page: page + 1 })

        result.then(res => {
            return res.json();
        }).then(json => {
            const hasMore = json.hasMore
            const data = json.data

            this.setState({
                hasMore: hasMore,
                data: this.state.data.concat(data)
            })
        }).catch(ex => {
            // if (__DEV__) {
            //     console.error('搜索页获取数据报错, ', ex.message)
            // }
        })
    }

    /***--- 处理重新搜索 ---**/
    componentDidUpdate(prevProps, prevState) {// prevProps之前的keyword和category
        // 这是当前的keyword和category
        const keyword = this.props.keyword
        const category = this.props.category

        // 搜索条件完全相等时，忽略。重要！！！
        if (keyword === prevProps.keyword && category === prevProps.category) { return }

        // 重置 state
        this.setState(initialState)

        // 重新加载数据
        this.loadFirstPageData()
    }
} 
function mapStateToProps(state) {
    return {
        userinfo: state.userinfo
    }
} 
function mapDispatchToProps(dispatch) {
    return {
    }
}
export default connect( mapStateToProps,mapDispatchToProps )(SearchList)