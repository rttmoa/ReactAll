import React, { Component } from 'react';
import { List } from 'antd-mobile';

export default class Lists extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    console.log(this.props)
    const { lists: {text, data} } = this.props;
    return (
      <div>
        <p>{text}</p>
        <List>
          {data.map((item, i)=>(
            <List.Item key={i}>{item}</List.Item>
          ))}
        </List>
      </div>
    )
  }
}