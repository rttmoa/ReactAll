import './ContentList.scss';
import React from 'react';
import { connect } from 'react-redux';
import { getListData } from '../../actions/contentListAction';

import ListItem from '../../../../component/ListItem/ListItem.jsx';
import ScrollView from 'component/ScrollView/ScrollView.jsx';




/**
 * @constructor <ContentList />
 * @description 附近商家列表
 */
class ContentList extends React.Component {
    constructor(props) {
        super(props); 
        this.page = 0; // 记录当前页码 
        this.fetchData(this.page); // TODO: 请求第一屏数据 
        this.state = { isend: false }; // 是否end，有无数据了
    }
    fetchData(page){ this.props.dispatch(getListData(page))}
    
    onLoadPage() {
        this.page++; 
        if (this.page > 3) this.setState({ isend: true }); // 最多滚动3页3次
        else this.fetchData(this.page);
    }

    renderItems() { 
        return this.props.list.map((item, index) => <ListItem key={index} itemData={item}></ListItem>);
    }

    render(){
        // console.log(this.props.list.length)
        return (
            <div className="list-content">
                <h4 className="list-title">
                    <span className="title-line"></span>
                    <span>附近商家</span>
                    <span className="title-line"></span>
                </h4>
                <ScrollView dis="content" loadCallback={this.onLoadPage.bind(this)} isend={this.state.isend}>
                    {this.renderItems()}
                </ScrollView>
            </div>
        );
    }
}
export default connect( state =>({list: state.contentListReducer.list}), null )(ContentList);
