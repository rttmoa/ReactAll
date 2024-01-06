import React, { useState, useEffect, useLayoutEffect } from 'react'

// ? 箭头函数的写法，改变状态
const UseEffect = props => {
  const [hook, sethook] = useState('react hook 是真的好用啊')
  const [name] = useState('baby张')
  return (
    <header className="UseEffect-header">
      <h3>UseEffect</h3>
      <Child hook={hook} name={name} />
      <button onClick={() => sethook('我改变了react hook 的值' + new Date().getTime())}>改变hook</button>
    </header>
  )
}

const Child = props => {
  const [newhook, setnewhook] = useState(props.hook)

  useEffect(() => {
    console.log('first useEffect')
  }, [])

  useEffect(() => {
    console.log('second useEffect')
  }, [props.name])

  //第二个参数，数组里是hook,当hook变化时，useEffect会触发，当hook变化时，先销毁再执行第一个函数。
  useEffect(() => {
    setnewhook(props.hook + '-----setnewhook')
    console.log('third useEffect')
    return () => {
      console.log('useEffect componentWillUnmount 卸载1')
    }
  }, [props.hook])

  // ! useLayoutEffect 强制useeffect的执行为同步，并且先执行useLayoutEffect内部的函数
  useLayoutEffect(() => {
    console.log('useLayoutEffect')
    return () => {
      console.log('useLayoutEffect componentWillUnmount 卸载2')
    }
  }, [props.hook])

  
  console.log('---------分割------')
  return (
    <div>
      <p><b>props.name：</b>{props.name}</p>
      <p><b>props.hook：</b>{newhook}</p>
    </div>
  )
}

export default UseEffect
