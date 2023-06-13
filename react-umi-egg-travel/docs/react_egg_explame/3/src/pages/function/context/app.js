import React, { useState, useEffect, useContext } from 'react';
import User from './user';
import { UserContext } from './userContext';
import { Button } from 'antd-mobile';

export default function(props){
  // const [state, setState] = useState()
  const {state, dispatch} = useContext(UserContext);

  useEffect(() => {

  }, [])

  const handleLogin = ()=>{
    dispatch({
      type: 'LOGIN',
      payload:  true
    })
  }

  return (
    <div>
      {state.isLogin ? <User /> : <Button type='primary' onClick={handleLogin}>登陆</Button>}
    </div>
  )
}