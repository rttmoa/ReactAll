import React, { Component } from 'react';
import { List } from 'antd-mobile';

export default class Lists extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    console.log(this.props);
    const { text, lists } = this.props.search;
    return (
      <div>
        <h1>text: {text}</h1>
        <List>
          {lists.map((item, i)=>(
            <List.Item key={i}>{item}</List.Item>
          ))}
        </List>
      </div>
    )
  }
}