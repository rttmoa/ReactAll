import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { Link, hashHistory } from 'react-router'
import SearchInput from '../SearchInput'
import './style.less'



/***--- 
 * 当搜索时、输入关键词时、按下回车、路由变成： http://localhost:8080/#/search/all/?_k=bz6gm9
 * 
 */
class HomeHeader extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            <div id="home-header" className="clear-fix">
                <div className="home-header-left float-left">
                    <Link to="/city">
                        <span>{this.props.cityName}</span>
                        &nbsp;
                        <i className="icon-angle-down"></i>
                    </Link>
                </div>
                <div className="home-header-right float-right">
                    <Link to="/Login">
                        <i className="icon-user"></i>
                    </Link>
                </div>
                <div className="home-header-middle">
                    <div className="search-container">
                        <i className="icon-search"></i>&nbsp;
                        <SearchInput value="" enterHandle={this.enterHandle.bind(this)}/>
                    </div>
                </div>
            </div>
        )
    }
    enterHandle(value) {
        let res = `/search/all/${encodeURIComponent(value)}` // UserName长  --> /search/all/UserName%E9%95%BF
        // console.log(res)
        // return
        hashHistory.push('/search/all/' + encodeURIComponent(value))
    }
}

export default HomeHeader