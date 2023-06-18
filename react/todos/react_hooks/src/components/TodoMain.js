import TodoItem from './TodoItem'
const TodoList = ({ list, type }) => {
  let showList = []
  if (type === 'active') {
    showList = list.filter((item) => !item.done)  
  } else if (type === 'completed') {
    showList = list.filter((item) => item.done)
  } else {
    showList = list
  }
  return (
    <section className="main">
      <input id="toggle-all" className="toggle-all" type="checkbox" />
      <label htmlFor="toggle-all">Mark all as complete</label>
      <ul className="todo-list">
        {showList.map((item) => (
          <TodoItem key={item.id} item={item}></TodoItem>
        ))}
      </ul>
    </section>
  )
}

export default TodoList
