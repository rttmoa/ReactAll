import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ListItem extends Component {

  static defaultProps = {
    id: 10
  };

  static propTypes = {
    id: PropTypes.number
  };

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  handleClick = ()=>{
    this.props.handleChild(20);
  }

  render() {
    return (
      <div>
        <h1 onClick={this.handleClick}>list-item--{this.props.id}</h1>
      </div>
    )
  }
}