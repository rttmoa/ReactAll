// 举一个简单的例子，一个简单计数器的实现
import React from 'react'
import useCounter from './1-useCounter'


// 快速创建 rcs
function Index() {
    const { count, increment, decrement, reset } = useCounter() 
    // console.log(count)

    return <div>
        <button onClick={increment}>+</button>
        <p>{count}</p>
        <button onClick={decrement}>-</button>
        <p></p>
        <button  onClick={reset}>reset</button>
    </div>
}
export default Index