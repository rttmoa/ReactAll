import './Comment.scss';
import React from 'react';
import { connect } from 'react-redux';

import StarScore from 'component/StarScore/StarScore';
import CommentList from './CommentList/CommentList';
import { getListData } from '../store/actions/commentAction'



class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.fetchData();
    } 
    async fetchData() { await this.props.dispatch(getListData()) }
    render(){
        let data = this.props.commentData;
        return (
            <div className="comment-inner">

                <div className="comment-score">
                    <div className="mail-score-content">
                        <div className="mail-score">{data.comment_score ? data.comment_score.toFixed(1) : ''}</div>
                        <div className="mail-text">商家评价</div>
                    </div>
                    <div className="other-score-content">
                        <div className="taste-score">
                            <div className="taste-text">口味</div>
                            <div className="taste-star-wrap"><StarScore score={data.food_score}/></div>
                            <div className="taste-score-text">{data.food_score ? data.food_score.toFixed(1) : ''}</div>
                        </div>
                        <div className="package-score">
                            <div className="package-text">包装</div>
                            <div className="package-star-wrap"><StarScore score={data.pack_score}/></div>
                            <div className="package-score-text">{data.pack_score}</div>
                        </div>
                    </div>
                    <div className="send-score-content">
                        <div className="send-score">{data.delivery_score}</div>
                        <div className="send-text">商家评价</div>
                    </div>
                </div>

                {/* TODO: 渲染 客户评论列表数据 */}
                <CommentList />

            </div>
        );
    }
}

export default connect(state =>({commentData: state.commentReducer.commentData}), null)(Comment);