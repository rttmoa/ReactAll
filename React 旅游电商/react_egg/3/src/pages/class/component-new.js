import React, { Component } from 'react';

export default class ComponentNew extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: {id:1}
    };
    console.log('constructor');
    // this.handleClick = this.handleClick.bind(this);
  }

  static getDerivedStateFromProps(props, state){
    console.log('getDerivedStateFromProps');
    console.log(props, state);
    return state;
  }

  getSnapshotBeforeUpdate(){
    console.log('getSnapshotBeforeUpdate');
    return 'getSnapshotBeforeUpdate'
  }

  componentDidUpdate(props, state, snapshot){
    console.log(snapshot)
  }


  handleClick = ()=>{
    this.setState({
      text: {id:2}
    })
  }


  render() {
    console.log('render');
    return (
      <div onClick={this.handleClick}>
        Component-new--{this.state.text.id}
      </div>
    )
  }
}