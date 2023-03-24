import React, { Component } from 'react';

export default class Layout extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div>
        <h1>class header</h1>
        {this.props.children}
      </div>
    )
  }
}