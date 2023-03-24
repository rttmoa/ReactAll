import React, { Component } from 'react';
import { List } from 'antd-mobile';
import SearchContext from './searchContext';

export default class Lists extends Component {
  static contextType = SearchContext;

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    console.log(this)
    const { text, lists } = this.context.state;
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