import React, { Component } from 'react';
import SearchBar from './search';
import SearchContext from './searchContext';
import Lists from './lists';
import Consumer from './consumer';
import { getLists } from '@/services/lists'; 
import LazyLoad from '@/components/suspence'

export default class Index extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      lists: []
    };
  }

  handleDispatch = async (action)=>{
    switch(action.type){
      case 'TEXT':
        return this.setState({
          text: action.payload
        });
      case 'LISTS':
          // this.setState({
          //   lists: []
          // })
        const res = await getLists(action.payload);
        return this.setState({
          lists: res.data
        });
      default:
        return;
    }
  }

  render() {
    // console.log(this.props)
    return (
      <div>
        <SearchContext.Provider value={{
          state: this.state,
          dispatch: this.handleDispatch
        }}>
          <SearchBar {...this.props}/>
          {/* <Lists {...this.props}/> */}
          <LazyLoad component={import('./lists')} delay={300} {...this.props}/>
          <Consumer />
        </SearchContext.Provider>
      </div>
    )
  }
}