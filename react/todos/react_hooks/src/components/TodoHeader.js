import { useRef } from 'react'

const TodoHeader = ({ addTodo }) => {
  const inputRef = useRef(null)

  const onKeyUp = (e) => {
    if (e.keyCode === 13) {
      // 直接子传父
      addTodo(inputRef.current.value)
      inputRef.current.value = ''
    }
  }

  return (
    <header className="header">
      <h1>todos</h1>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        onKeyUp={onKeyUp}
        ref={inputRef}
      />
    </header>
  )
}

export default TodoHeader
