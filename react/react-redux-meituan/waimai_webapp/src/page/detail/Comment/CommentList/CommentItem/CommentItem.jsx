import './CommentItem.scss';
import React from 'react';
import { connect } from 'react-redux';
import StarScore from 'component/StarScore/StarScore';



/** #### 评论单页组件 ---*/
class CommentItem extends React.Component {

    /** #### 渲染 发表的相册图片 ---*/
    renderImgs(item) { 
        let comment_Img = (
            <div className="img-content clearfix">
                {item.comment_pics.map((item, index)=>{ 
                    let style = { backgroundImage: 'url(' + item.url + ')' }
                    return <div key={index} className={'img-item'} style={style}></div>
                })}
            </div>
        )
        return item.comment_pics.length ? comment_Img : null;
    }
    renderTags(label){
        return label.map((item)=>{
            return item.content + ','
        });
    }
    formatTime(time){
        let date = new Date(Number(time + '000')); 
        return date.getFullYear() + '.' + (date.getMonth() + 1) + '.' + date.getDate();
    }
 
    render() {
        let item = this.props.data;
        // console.log('tip', item.praise_food_tip) // typeof: string
        // console.log('tags', item.comment_labels) // typeof: Array
        return (
            <div className="comment-item">
                {/* 时间 、 头像 、 右侧Content */}
                <div className="comment-time">{this.formatTime(item.comment_time)}</div>
                <img className="avatar" src={item.user_pic_url || 'http://xs01.meituan.net/waimai_i/img/default-avatar.c4e0230d.png'} />
                <div className="item-right">
                    <p className="nickname">{item.user_name}</p>
                    <div className="star-and-time">
                        <div className="star-content"><StarScore score={item.order_comment_score}/></div>
                        <div className="send-time">{item.ship_time + '分钟送达'}</div>
                    </div>
                    <div className="comment-text">{item.comment}</div>
                    {this.renderImgs(item)}
                    {item.praise_food_tip ? <div className="like-info">tip: {item.praise_food_tip}</div> : null}
                    {/* {item.comment_labels.length ? <div className="tag-info">Tags: {this.renderTags(item.comment_labels)}</div> : null} */}
                    {item.comment_labels.length ? <div className="tag-info">Tags: {item.comment_labels.map(item => item.content + ',')}</div> : null}
                </div>
            </div>
        );
    }
}

export default connect()(CommentItem);

