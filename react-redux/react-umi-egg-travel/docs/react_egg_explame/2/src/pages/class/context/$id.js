import React, { Component } from 'react';

export default class Detail extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const detail = {
      info: {
        title: ''
      }
    };
    return (
      <div>
        <h1>id--{this.props.match.params.id}</h1>
        地址： {detail.addr?.name}
      </div>
    )
  }
}