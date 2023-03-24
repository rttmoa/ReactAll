import React, { Component } from 'react';
import SearchContext from './searchContext';
import { List } from 'antd-mobile'; 
import { Link } from 'umi';

export default class Lists extends Component {
  static contextType = SearchContext;

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    // console.log('render')
    const { text, lists } = this.context.state;
    return (
      <div>
        {/* <p>value: {text}</p> */}
        <List>
          {lists.map((item, i)=>(
            <Link to={"/class/context/"+i}>
              <List.Item key={item}>{item}</List.Item>
            </Link>
          ))}
        </List>
      </div>
    )
  }
}