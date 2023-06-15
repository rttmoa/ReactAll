import React, { useState, useEffect } from 'react';
import { StoreProvider } from 'think-react-store';
import * as store from './stores';
import log from 'think-react-store/middlewares/log';
import User from './user';

export default function(props){
  const [state, setState] = useState()

  useEffect(() => {

  }, [])

  return (
    <StoreProvider store={store} middleware={[log]}>
      <User />
    </StoreProvider>
  )
}