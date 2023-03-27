import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'

class SearchInput extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            value: ""
        }
    }
    render() {
        return (
            <input
                className="search-input" 
                type="text" 
                placeholder="请输入关键字" 
                onChange={this.ChangeHandle.bind(this)} // 如果不绑定this, 那么this.setState()函数就没法使用
                onKeyUp={this.KeyUpHandle.bind(this)}
                value={this.state.value}
            />
        )
    }
    componentDidMount() {
        // 默认值
        this.setState({ value: this.props.value || "" })
    }
    ChangeHandle(e) {
        // 监控变化
        this.setState({ value: e.target.value })
    }
    KeyUpHandle(e) {
        if (e.keyCode !== 13) { return }
        this.props.enterHandle(e.target.value)
    }
}

export default SearchInput