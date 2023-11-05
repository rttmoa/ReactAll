import TodoHeader from './components/TodoHeader'
import TodoMain from './components/TodoMain'
import TodoFooter from './components/TodoFooter'

import './styles/base.css'
import './styles/index.css'

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getList } from './store/actions/todos'





const App = () => {
  const dispatch = useDispatch()

  useEffect(() => { /* 发送请求属于副作用 */
    // console.log('App useEffect')
    dispatch(getList())
  }, [dispatch])

  return (
    <section className="todoapp">
      <TodoHeader />
      <TodoMain />
      <TodoFooter />
    </section>
  )
}

export default App