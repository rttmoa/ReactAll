import './ScrollView.scss';
import React from 'react';
import { connect } from 'react-redux';

import Loading from 'component/Loading/Loading.jsx';



/**
 * <ScrollView loadCallback={function} isend={bool}/>
 * @description 滚动加载组件
 */
class ScrollView extends React.Component {
    constructor(props) {
        super(props);
        this._onLoadPage = this.onLoadPage.bind(this);
    }
    componentDidMount(){ window.addEventListener('scroll', this._onLoadPage); }
    componentWillUnmount(){ window.removeEventListener('scroll', this._onLoadPage); }
    onLoadPage(){ // 滚动监听函数
        let clientHeight = document.documentElement.clientHeight;   // 可视区高度  
        let scrollHeight = document.body.scrollHeight;  // 可滚动的总高度 ||  列表的总高度
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;  // 滚动的高度 | 距离顶部的高度
        let proLoadDis = 30;  // Loading的高度
        // console.log(clientHeight, scrollHeight, Math.floor(scrollTop))
        if ((scrollTop + clientHeight) >= (scrollHeight - proLoadDis)) {
            // debugger
            if (!this.props.isend) {
                if (!this.props.readyToLoad) {
                    return;
                }
                this.props.loadCallback && this.props.loadCallback();
            }
        }
    }
    render(){
        return (
            <div className="scrollview">
                {
                    this.props.children
                }
                <Loading isend={this.props.isend} />
            </div>
        );
    }
}


export default connect(
    state =>({
        readyToLoad: state.scrollViewReducer.readyToLoad,
    })
)(ScrollView);
