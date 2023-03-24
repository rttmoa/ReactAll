import React, { Component } from 'react';

export default class Demo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: '桌子'
    };
  }

  changeText(){
    console.log('change text');
    this.setState({
      text: '椅子'
    });
  }

  render() {
    return (
      <div>
        demo子组件-{this.state.text}
      </div>
    )
  }
}