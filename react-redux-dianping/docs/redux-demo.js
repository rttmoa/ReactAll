import { createStore } from 'redux'

export default function () {
    // 下面这一段代码，就是 https://github.com/reactjs/redux 中的入门demo

    // 第一步：定义计算规则，即 reducer
    function counter(state = 0, action) {
        switch (action.type) {
            case 'INCREMENT':
                return state + 1
            case 'DECREMENT':
                return state - 1
            default:
                return state
        }
    }

    // 第二步：根据计算规则生成 store
    let store = createStore(counter)

    // 第三步：定义数据（即 state）变化之后的派发规则  - - 监听函数
    store.subscribe(() => {
        console.log('current state', store.getState())
    })

    store.subscribe( () => {console.log('fn2 ===>', store.getState())})

    store.subscribe( () => {console.log('fn3 ===>', store.getState())})

    // 第四步：触发数据变化
    store.dispatch({type: 'INCREMENT'})
    store.dispatch({type: 'INCREMENT'})
    store.dispatch({type: 'DECREMENT'})
}
