
import React, { Component } from 'react';
import { List } from 'antd-mobile';
import { Link } from 'umi';

export default class Index extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div>
        <h1>class demo</h1>
        <List>
          <List.Item>
            <Link to="/class/component-old">
              component-old
            </Link>
          </List.Item>
          <List.Item>
            <Link to="/class/component-new">
              component-new
            </Link>
          </List.Item>
          <List.Item>
            <Link to="/class/lists">
              lists
            </Link>
          </List.Item>
          <List.Item>
            <Link to="/class/dva">
              dva
            </Link>
          </List.Item>
          <List.Item>
            <Link to="/class/context">
              context
            </Link>
          </List.Item>
          <List.Item>
            <Link to="/class/lazy-load">
              lazyLoad
            </Link>
          </List.Item>
          <List.Item>
            <Link to="/class/modal">
              modal
            </Link>
          </List.Item>
        </List>
      </div>
    )
  }
}
