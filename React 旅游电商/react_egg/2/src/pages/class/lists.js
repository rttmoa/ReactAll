import React, { Component } from 'react';
import ListItem from './list-item';
import ListItem2 from './list-item2';

export default class Lists extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id2: 10
    };
  }

  handleClick = (msg)=>{
    console.log(msg)
    this.setState({
      id2: 200
    })
  }

  render() {
    return (
      <div>
        <ListItem id={100} handleChild={this.handleClick}/>
        <ListItem2 id2={this.state.id2}/>
      </div>
    )
  }
}