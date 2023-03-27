import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Img from './暑假.png'
import './style.less'



class HomeAd extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            <div className='hhhomeAd'>{/* home-ad/homeAd 这里会出现注入样式表 - 设置了display:none !importance */}
                <h2>超值特惠</h2>
                <div className="ad-container clear-fix">
                    {this.props.data.map((item, index) => {
                        // console.log(item)
                        return <div key={index} className="adDD-item float-left">
                            <a href="#" target="">
                                {/* <span>Picture</span> */}
                                {/* <img src={item.img} alt={item.title}/> */}
                                <img src={Img} alt="正在加载中..." />
                            </a>
                        </div>
                    })}
                </div>
            </div>
        )
    }
}

export default HomeAd