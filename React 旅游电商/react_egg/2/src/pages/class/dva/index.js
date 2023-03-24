import React, { Component } from 'react';
import { connect } from 'dva';
import Search from './search';
import Lists from './lists';
import LazyLoad from '@/components/suspence'

class DvaDemo extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount(){
    // console.log(this.props)
    // fetch('/api/lists')
    //   .then(res=>res.json())
    //   .then(res=>{
    //     console.log(res)
    //   })
    // throw new Error('I crashed!');
  }

  render() {
    const aa = {}
    return (
      <div>
        <Search {...this.props}/>
        {/* {aa.data.id} */}
        {/* <Lists {...this.props}/> */}
        <LazyLoad component={import('./lists')} delay={1000} {...this.props} />
      </div>
    )
  }
}

export default connect(({lists})=>({
  lists
}))(DvaDemo)