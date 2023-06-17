import './ContentList.scss';
import React from 'react';
import { connect } from 'react-redux';
import { getListData } from '../store/actions/contentListAction';

import ListItem from '../../../component/ListItem/ListItem.jsx';
import ScrollView from '../../../component/ScrollView/ScrollView.jsx';




/** #### TODO: 分类中 附近商家列表 ---*/
class ContentList extends React.Component {
    constructor(props) {
        super(props); 
        this.fetchData();
    }
    fetchData() {this.props.dispatch(getListData({}))}

    onLoadPage(){ 
        // FIXME: 最多滚动3页3次， 这里一次加载了10多次
        if (this.props.page <= 3) {
            this.fetchData();
        }
    }


    renderItems(){ 
        return this.props.list.map((item, index)=> <ListItem key={index} itemData={item}></ListItem> );
    }

    render(){
        return (
            <div className="list-content">
                {/* TODO:  ScrollView是外组件 包裹着renderItems的children内容 */}
                <ScrollView loadCallback={this.onLoadPage.bind(this)} isend={this.props.isend}>
                    {this.renderItems()}
                </ScrollView>
            </div>
        );
    }
}
function mapState(state) {
    return {
        list: state.contentListReducer.list,
        page: state.contentListReducer.page,
        isend: state.contentListReducer.isend,
    }
}
export default connect(mapState, null)(ContentList);
