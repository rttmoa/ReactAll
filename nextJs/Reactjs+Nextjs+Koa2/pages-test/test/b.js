import React, {  useState,  useReducer,  useContext,  useLayoutEffect,  useEffect,  useRef,  memo,  useMemo,  useCallback, } from 'react'

function countReducer(state, action) {
  switch (action.type) {
    case 'add':
      return state + 1
    case 'minus':
      return state - 1
    default:
      return state
  }
}


// 优化 减少组件的渲染   memo, useMemo, useCallback
function MyCountFunc() {
  const [count, dispatchCount] = useReducer(countReducer, 0)
  const [name, setName] = useState('jokcy')

  const countRef = useRef() // { current: '' }
  countRef.current = count

  // const config = {text: `count is ${count}`, color: count > 3 ? 'red' : 'blue'}

  const config = useMemo( () => ({
      text: `count is ${count}`,
      color: count > 3 ? 'red' : 'blue',
    }),
    [count],
  )

  // const handleButtonClick = useCallback( () => dispatchCount({ type: 'add' }), [] ) 

  const handleButtonClick = useMemo( () => 
    () => dispatchCount({ type: 'add' }),
  [] )
  

  // 先点击按钮让count变成3，再点此函数，再点按钮让count变为5，两秒后，alert(count)的值为3： 闭包陷阱
  const handleAlertButtonClick = function() {
    setTimeout(() => {
      alert(count)
      // alert(countRef.current)
    }, 2000)
  }

  return (
    <div>
      <input value={name} onChange={e => setName(e.target.value)} />
      <Child 
        config={config} 
        onButtonClick={handleButtonClick} 
      />
      <button onClick={handleAlertButtonClick}>alert count</button>
    </div>
  )
}

const Child = memo(function Child({ onButtonClick, config }) {
  console.log('child render')
  return (
    <button onClick={onButtonClick} style={{ color: config.color }}>
      {config.text}
    </button>
  )
})
// 每次在输入框输入内容 都会触发Child组件的渲染 - 是否更新会却决于 onButtonClick, config 是否变化
// function Child({ onButtonClick, config }) {
//   console.log('child render')
//   return (
//     <button onClick={onButtonClick} style={{ color: config.color }}>
//       {config.text}
//     </button>
//   )
// }

export default MyCountFunc
