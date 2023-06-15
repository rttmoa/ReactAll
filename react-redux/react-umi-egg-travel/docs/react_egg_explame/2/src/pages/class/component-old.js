import React, { Component } from 'react'
import { Button } from 'antd-mobile'

export default class Index extends Component {
  constructor(props){
    super(props);
    this.state = {
      text: 'old'
    };
    console.log('constructor');
    // this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount(){
    console.log('componentDidMount');
  }

  // handleClick(){
  //   alert()
  // }

  handleClick = ()=>{
    this.setState({
      text: '_new'
    })
  }

  shouldComponentUpdate(props, state){
    console.log('shouldComponentUpdate')
    console.log(props, state);
    if(state === 'new'){
      return true;
    }else {
      return false;
    }
  }

  componentWillUpdate(){
    console.log('componentWillUpdate');
  }

  componentDidUpdate(){
    console.log('componentDidUpdate');
  }

  componentWillUnmount(){
    console.log('componentWillUnmount');
  }

  render(){
    console.log('render');
    return (
      <div>
        component-old demo
        <h1>{this.state.text}</h1>
        <Button onClick={this.handleClick} type="primary">修改</Button>
      </div>
    )
  }
}