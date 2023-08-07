import { FETCH_POSTS, NEW_POSTS } from '../actions/types';




const initialState = {
  items: [],
}

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_POSTS:
      return {
        ...state,
        items: action.payload
      };
    
    case NEW_POSTS: 
      return {
        ...state,
        items: state.items.concat(action.payload) // concat或者[]连接data
      };

    default:
      return state;
  }
}