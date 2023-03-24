import React, { Component } from 'react';
import Search from './serach';
import Lists from './lists';
import { connect } from 'dva'; 

class Dva extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div>
        <Search {...this.props}/>
        <Lists {...this.props}/>
      </div>
    )
  }
}

export default connect(({search})=>({
  search
}))(Dva)