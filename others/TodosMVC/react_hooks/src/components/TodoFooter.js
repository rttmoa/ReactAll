const TodoFooter = ({ list, type, setType }) => {
  const leftCount = list.filter((item) => !item.done).length    /* 过滤集合中未完成的数量 */
  const types = ['all', 'active', 'completed']
  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{leftCount}</strong> item left
      </span>
      <ul className="filters">
        {types.map((item) => (
          <li key={item}>
            <a
              className={type === item ? 'selected' : ''}
              href="#/"
              onClick={() => setType(item)}
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
      <button className="clear-completed">Clear completed</button>
    </footer>
  )
}

export default TodoFooter
