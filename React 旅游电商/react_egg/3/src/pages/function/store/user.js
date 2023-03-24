import React, { useState, useEffect } from 'react';
import { useStoreHook, useStateHook, useDispatchHook } from 'think-react-store';

export default function(props){
  const [state, setState] = useState()
  const { user: { id, username, getUserAsync } } = useStoreHook();
  const states = useStateHook('user');
  // console.log(states)
  const dispatchs = useDispatchHook();

  const handleClick = () => {
    // getUserAsync({
    //   id: 20,
    //   username: 'admin2'
    // });
    dispatchs({
      key: 'user',
      type: 'getUserAsync',
      payload: {
        id: 20,
        username: 'admin2'
      }
    });
  };

  useEffect(() => {
    getUserAsync({
      id: 10,
      username: 'admin'
    });
  }, [])

  return (
    <div>
      user-id: {id}
      <br/>
      username: {username}
      <br/>
      <button onClick={handleClick}>修改</button>
    </div>
  )
}