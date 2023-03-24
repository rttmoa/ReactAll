import React, { useState, useEffect, useLayoutEffect, useMemo, useCallback } from 'react';

export default function(props){
  const [count, setCount] = useState(0)
  const [text, setText] = useState('test-demo')
  // const [state, setState] = useState()

  async function demo(){
    console.log('demo')
  }

  useEffect(() => {
    console.log('useEffect')
    demo()

    // fetch('/api/getLists')
  }, [count])

  useEffect(()=>{
    console.log('useEffect 2')
  }, [])

  useLayoutEffect(()=>{
    console.log('useLayoutEffect')
  }, [])

  // const handleCount = ()=>{
  //   setCount(count + 1)
  // }

  const handleCount = useCallback(()=>{
    console.log('count changed')
    setCount(count + 1)
  }, [count])

  const noCacheText = ()=>{
    console.log('text changed')
    return text
  }

  const memoText = useMemo(()=>{
    console.log('text changed')
    return text
  }, [text])

  return (
    <div>
      <h1 onClick={handleCount}>count: {count}</h1>
      {/* <h1>text: {noCacheText()}</h1> */}
      <h1>text: {memoText}</h1>
    </div>
  )
}