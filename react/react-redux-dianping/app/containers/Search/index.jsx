import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import SearchHeader from '../../components/SearchHeader'    //---->  组件
import SearchList from './subpage/List'    //---->  组件






class Search extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        // 由Home页搜索 UserName长 通过Route跳转到此
        const params = this.props.params
        // console.log("params", params) // {category: 'all', keyword: 'UserName长'}
        return (
            <div>
                {/* 搜索页：处理重新搜索 */}
                <SearchHeader keyword={params.keyword}/>
                {/* 搜索数据展示 */}
                <SearchList keyword={params.keyword} category={params.category}/>
            </div>
        )
    }
}

export default Search