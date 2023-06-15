import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { getCommentData } from '../../../fetch/detail/detai'
import ListComponent from '../../../components/CommentList'    //---->  组件
import LoadMore from '../../../components/LoadMore'    //---->  组件

import './style.less'





class Comment extends React.Component {
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
    render() {
        return (
            <div className="detail-comment-subpage">
                <h2>用户点评</h2>
                {this.state.data.length ? <ListComponent data={this.state.data}/> : <div></div>}
                {this.state.hasMore ? <LoadMore isLoadingMore={this.state.isLoadingMore} loadMoreFn={this.loadMoreData.bind(this)}/> : ""}
            </div>
        )
    }
    componentDidMount() { this.loadFirstPageData() }
    // 获取首页数据
    loadFirstPageData() {
        const id = this.props.id
        const result = getCommentData(0, id)  //-->    /api/detail/comment/0/5889520870693865
        this.resultHandle(result)
    }
    // 加载更多数据
    loadMoreData() {
        this.setState({ isLoadingMore: true })

        const id = this.props.id
        const { page } = this.state;
        const result = getCommentData(page, id)  //-->    /api/detail/comment/1/5889520870693865
        this.resultHandle(result)

        this.setState({ isLoadingMore: false })
    }
    // 处理数据
    resultHandle(result) {
        result.then(res => {
            return res.json()
        }).then(json => {
            const { page } = this.state;  
            const { hasMore, data } = json;

            this.setState({
                page: page + 1,
                hasMore: hasMore,
                data: this.state.data.concat(data)
            })
        }).catch(ex => {
            // if (__DEV__) { console.error('详情页获取用户评论数据出错, ', ex.message) }
        })
    }
}

export default Comment