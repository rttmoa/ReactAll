import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Header from '../../components/Header'     //---->  组件
import Info from './subpage/Info'    //---->  组件
import Buy from './subpage/buy'    //---->  组件
import Comment from './subpage/Comment'    //---->  组件



/**开发详情页-获取商户信息*/
class Detail extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        const id = this.props.params.id; // 获取商户ID 
        return (
            <div>
                <Header title="商户详情" type="share"/>

                <Info id={id}/>

                {/* 收藏和购买是用户登陆后才可以使用的组件 */}
                <Buy id={id}/>

                <Comment id={id}/>
            </div>
        )
    }
}
 
export default Detail