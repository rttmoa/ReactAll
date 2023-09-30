import React, {
  useState,
  useReducer,
  useContext,
  useLayoutEffect,
  useEffect,
  useRef,
} from 'react'

import MyContext from '../../lib/my-context'





class MyCount extends React.Component {
  constructor() {
    super()
    this.ref = React.createRef()
  }
  state = {
    count: 0,
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({ count: this.state.count + 1 })
    }, 1000)
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval)
    }
  }

  handleButtonClick() {
    // const count = this.state.count
    // setTimeout(() => alert(count), 2000)
    
    setTimeout(() => alert(this.state.count), 2000)  // 闭包的是this，而不是this.state.count
  }

  render() {
    return <span ref={this.ref}>{this.state.count}</span>
  }
}






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

function MyCountFunc() {
  // const [count, setCount] = useState(0) // [a, b]

  const [count, dispatchCount] = useReducer(countReducer, 0)  // useReducer的参数1，参数2
  const [name, setName] = useState('jokcy')

  const context = useContext(MyContext)

  const inputRef = useRef()


  // setCount(1) // 不基于最新的值
  // setCount((c) => c + 1)  基于最新的值  回调 
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     // setCount(count + 1) //  闭包陷阱 
  //     // setCount(c => c + 1) // 正常最新的值
  //     // dispatchCount({ type: 'add' }) // useReducer钩子搭配使用
  //     dispatchCount({ type: 'minus' })
  //   }, 1000)
  //   return () => clearInterval(interval)
  // }, [])



  useEffect(() => {
    // console.log(inputRef)
    return () => console.log('effect deteched')
  }, [count])

  // 会在  下面return函数中的DOM只有 useLayoutEffect 函数执行完才会执行 return中的DOM
  // useLayoutEffect(() => {
  //   console.log('layout effect invoked')
  //   return () => console.log('layout effect deteched')
  // }, [count])

  return (
    <div>
      <input
        ref={inputRef}
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button onClick={() => dispatchCount({ type: 'add' })}>{count}</button>
      <p>{context}</p>
    </div>
  )
}

export default MyCountFunc
