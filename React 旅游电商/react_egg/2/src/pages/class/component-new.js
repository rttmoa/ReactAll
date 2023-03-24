import React, { Component } from 'react'
import { Button } from 'antd-mobile'

export default class New extends React.PureComponent {
  static getDerivedStateFromProps(props, state){
    console.log('getDerivedStateFromProps');
    console.log(props, state);
    return state
  }

  constructor(props){
    super(props);
    this.state = {
      text: 'old'
    };
    console.log('constructor');
    // this.handleClick = this.handleClick.bind(this);
  }

  handleClick = ()=>{
    this.setState({
      text: 'new'
    })
  }

  // shouldComponentUpdate(props, state){
  //   console.log('shouldComponentUpdate')
  //   // console.log(props, state);
  //   if(state === 'new'){
  //     return true;
  //   }else {
  //     return false;
  //   }
  // }

  getSnapshotBeforeUpdate(){
    return 'getSnapshotBeforeUpdate'
  }

  componentDidUpdate(props, state, snapshot){
    console.log(snapshot);
  }

  render(){
    console.log('render');
    return (
      <div>
        component-new demo
        <h1>{this.state.text}</h1>
        <Button onClick={this.handleClick} type="primary">修改</Button>
      </div>
    )
  }
}