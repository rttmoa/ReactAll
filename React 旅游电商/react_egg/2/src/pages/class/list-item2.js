import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ListItem2 extends Component {

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

  componentWillReceiveProps(props, state){
    console.log('componentWillReceiveProps');
    console.log(props, state);
  }

  render() {
    return (
      <div>
        <h1>list-item2--{this.props.id2}</h1>
      </div>
    )
  }
}