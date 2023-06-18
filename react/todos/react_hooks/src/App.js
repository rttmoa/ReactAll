import TodoHeader from './components/TodoHeader'
import TodoMain from './components/TodoMain'
import TodoFooter from './components/TodoFooter'
import './styles/base.css'
import './styles/index.css'
import React, { useEffect, useState } from 'react'

export const Context = React.createContext()
const { Provider } = Context

function useTodos() {
  // useState支持两种写法
  // useState(initValue)
  // useState(() => initValue)
  const [list, setList] = useState(() => {      /* useState 传递 函数 只调用一次  */
    return JSON.parse(localStorage.getItem('todos')) || []
  })

  // 保存到本地，属于副作用
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(list))
  }, [list])

  // 添加任务
  const addTodo = (name) => {
    setList([
      {
        id: Date.now(),
        name,
        done: false,
      },
      ...list,
    ])
  }

  // 删除任务
  const delTodo = (id) => {
    setList(list.filter((item) => item.id !== id))
  }

  // 修改任务状态
  const changeDone = (id) => {
    setList(list.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          done: !item.done,
        }
      } else {
        return item
      }
    }))
  }

  // 修改任务的名字
  const changeName = (id, name) => {
    setList(
      list.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            name,
          }
        } else {
          return item
        }
      })
    )
  }

  return {
    list,
    addTodo,
    delTodo,
    changeDone,
    changeName,
  }
}

const App = () => {
  // all active completed
  const [type, setType] = useState('all')
  const { list, addTodo, delTodo, changeDone, changeName } = useTodos()
  return (
    // 父组件 给 子组件 传递 对象属性
    <Provider value={{ delTodo, changeDone, changeName }}>
      <section className="todoapp">
        <TodoHeader addTodo={addTodo} />
        <TodoMain type={type} list={list} />
        <TodoFooter list={list} type={type} setType={setType} />
      </section>
    </Provider>
  )
}

export default App
