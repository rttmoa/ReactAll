import React, { Component } from 'react';
import { SearchBar } from 'antd-mobile';

export default class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }

  handleChange = (e)=>{
    this.setState({
      value: e
    });
  }

  handleSubmit = ()=>{
    console.log('submit')
    this.props.dispatch({
      type: 'lists/getDataAsync',
      payload: this.state.value
    })
  }

  render() {
    return (
      <div>
        <SearchBar 
          value={this.state.value}
          onSubmit={this.handleSubmit}
          onChange={this.handleChange}
        />
      </div>
    )
  }
}