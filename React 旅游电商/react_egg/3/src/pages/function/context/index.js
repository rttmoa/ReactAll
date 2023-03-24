import React, { useState, useEffect } from 'react';
import { UserContextProvider } from './userContext';
import  App from './app';

export default function(props){
  const [state, setState] = useState()

  useEffect(() => {

  }, [])

  return (
    <UserContextProvider>
      <App {...props}/>
    </UserContextProvider>
  )
}