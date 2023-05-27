import * as React from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore'
import { getRelativeUrl } from '../../utils';

class Bootstrap extends React.Component {

	getChildContext() {
        let iconPath = getRelativeUrl('/assets/icons');
        return {
			iconPath: iconPath,
		};
    }
    
    static defaultProps = {
    };

    static propTypes = {
    };

    componentDidMount() { 
        // console.log("bootstrap props", this.props)
        const { loadBootstrap, isBootstrapLoaded, isRequestStarted } = this.props;
        if (!isBootstrapLoaded && !isRequestStarted && loadBootstrap) {
            loadBootstrap(this.props)
        }
    }

    state = {
        isBootstrapLoaded: false
    };

    render() {
        // FIXME: 返回null， 测试先注释掉
        if (this.props.isBootstrapLoaded){
            console.log("bootStrap.jsx组件返回了null哦！")
            return null;
        }
        
        return (
            <React.Fragment>
                {this.props.children}
            </React.Fragment>
        );
    }
}

Bootstrap.childContextTypes = {
	iconPath: PropTypes.string,
};

export default Bootstrap;