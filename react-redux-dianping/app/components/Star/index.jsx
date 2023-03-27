import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'

class Star extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            star: 0
        }
    }
    render() {
        // 获取 star 数量，并取余5（最多5个star）
        let star = this.state.star || 0
        if (star > 5) {
            star = star % 5 // 8%5=3   12%5=2
        }
        // console.log('star', star)
        return (
            <div className="star-container">
                {
                    [1, 2, 3, 4, 5].map((item, index) => { 
                        const lightClass = star >= item ? ' light' : '';
                        // 在这里 index是0,1,2,3,4   item是1,2,3,4,5  所以点击的哪个直接把item传递过去就可以了
                        return <i key={index} className={'icon-star' + lightClass} onClick={this.clickHandle.bind(this, item)}></i>
                    })
                }
            </div>
        )
    }
    componentDidMount() {
        // console.log('this.props.star', this.props.star)//初始为0
        this.setState({star: this.props.star})
    }
    clickHandle(star) {
        // console.log(star) // 这个就是数组里面的item
        // return
        const clickCallback = this.props.clickCallback
        if (!clickCallback)  return

        this.setState({ star }) // 点击的item传递给this.state.star；  render()函数重新渲染 再重新赋值css属性
        // return

        clickCallback(star)// 传递给父组件
    }
}

export default Star