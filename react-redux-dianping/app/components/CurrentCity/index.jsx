import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'

class CurrentCity extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            // css样式： bgc、padding、text-align、border-bottom
            <div className="current-city">
                <h2>{this.props.cityName}</h2>
            </div>
        )
    }
}

export default CurrentCity