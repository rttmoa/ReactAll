import 'component/common.scss';
import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import Loadable from 'react-loadable';
import BottomBar from '../BottomBar/BottomBar';
import Home from '../Home/Home';
import Loading from './Loading';



/** #### TODO: Home ---*/ 
class Main extends React.Component {
    // loadMy(location, cb){ import(/* webpackChunkName: "my" */'../My/My').then((component)=>{ cb(null, component.default) }) }
    
    render(){  
        // console.log(this.props.thing) // redux所有数据
        return (
            <div>
                <Route exact path="/home" component={Home}/>
                <Route path="/order" component={Order}/>
                <Route path="/my" component={My}/>
                <BottomBar />
            </div>  
        );
    }
}
// 懒加载加载器
const Order = Loadable({
    loader: () => import(/* webpackChunkName: "order" */'../Order/Order'),
    loading: Loading,
});
const My = Loadable({
    loader: () => import('../My/My'),
    loading: Loading,
});
export default withRouter(connect(state => ({thing: state}), null)(Main));