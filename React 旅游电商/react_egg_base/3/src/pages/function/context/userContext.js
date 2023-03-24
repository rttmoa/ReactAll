import React, { useReducer } from 'react';

const initState = {
  isLogin: false,
  user: {
    id: '100',
    name: 'john'
  }
};

const UserContext = React.createContext();

const reducer = (state, action)=>{
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isLogin: action.payload
      }
  
    default:
      break;
  }
};

const UserContextProvider = (props)=>{
  const [state, dispatch] = useReducer(reducer, initState);
  return (
    <UserContext.Provider value={{state, dispatch}}>
      {props.children}
    </UserContext.Provider>
  )
}

export {
  UserContext,
  UserContextProvider
}