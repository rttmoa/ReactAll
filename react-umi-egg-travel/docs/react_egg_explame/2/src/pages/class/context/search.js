import React, { Component } from 'react';
import { SearchBar } from 'antd-mobile';
import SearchContext from './searchContext';

export default class Search extends Component {
  static contextType = SearchContext;

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
    console.log('submit', this.context)
    // this.context.dispatch({
    //   type: 'TEXT',
    //   payload: this.state.value
    // })
    this.context.dispatch({
      type: 'LISTS',
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