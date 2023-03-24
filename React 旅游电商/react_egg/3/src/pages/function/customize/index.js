import React, { useState, useEffect } from 'react';
import { useTitleHook, useHttpHook } from '@/hooks'

export default function(props){
  const [state, setState] = useState('customize')
  const title = useTitleHook(state);
  useEffect(() => {

  }, [])

  const [listResult, loading] = useHttpHook({
    url: '/getListsAsync',
    method: 'get',
    watch: [state]
  });
  console.log(listResult, loading)

  const handleClick = ()=>{
    setState('customize changed!')
  }

  return (
    <div>
      <h1 onClick={handleClick}>{title}</h1>
    </div>
  )
}