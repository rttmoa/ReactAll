import './CommentList.scss';
import React from 'react';
import { connect } from 'react-redux';

import CommentItem from './CommentItem/CommentItem';
import ScrollView from '../../../../component/ScrollView/ScrollView.jsx';
import { getListData } from '../../store/actions/commentAction';



/** #### 评论列表数据 ---*/
class CommentList extends React.Component {
    // ScrollView加载更多数据， 需要使用Loading控制page加载页码
    onLoadPage(){this.props.dispatch(getListData({}));}
    render(){
        return (
            <div className="comment-list">
                <ScrollView loadCallback={this.onLoadPage.bind(this)} isend={0}>
                    {/* {this.renderList()} */}
                    {this.props.commentList.map((item, index) => <CommentItem key={index} data={item}></CommentItem>)}
                </ScrollView>
            </div>
        );
    }
}

export default connect(state => ({commentList: state.commentReducer.commentList}), null)(CommentList);

