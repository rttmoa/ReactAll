import { useState } from 'react'
import { useDispatch } from 'react-redux'
// import { addTodo } from '../store/actions/todos'
import axios from 'axios';


const TodoAdd = () => {
  const [name, setName] = useState('')
  const dispatch = useDispatch()

  const onKeyUp = (e) => {
    if (e.keyCode !== 13)  return;
    if(name.trim().length === 0) return;
    
    dispatch(
      async (dispatch) => {
        const res = await axios.post('http://localhost:8888/todos', {name, done: false }) 
          dispatch({type:'ADD_TODO', payload: res.data})
      }
    )
    // dispatch(addTodo(name))

    setName('')
  }
  
  return (
    <header className="header">
      <h1>todos</h1>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyUp={onKeyUp}
      />
    </header>
  )
}

export default TodoAdd