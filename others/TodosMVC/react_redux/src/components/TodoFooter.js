import { useDispatch, useSelector } from "react-redux"
import { changeFilter } from "../store/actions/filter";


const TodoFooter = () => {
  const dispatch = useDispatch(); 
  const arr = ["all", "active", "completed"]

  const filter =  useSelector(state => {console.log(); return state.filter})

  
  const change = (item) => {
    // dispatch({ type: "CHANGE_FILTER", payload: item })
    dispatch(changeFilter(item)) 
  }

  return (
    <footer className="footer">
      <span className="todo-count">
        {/* <strong>0</strong> item left */}
      </span>
      <ul className="filters">
        {
          arr.map((item) => {
            // console.log(item)
            return (
              <li key={item}>
                <a className={filter === item ? 'selected' : '' } href="#/" onClick={() => change(item)}>
                  {item}
                </a>
              </li>
              )
          })
        }
      </ul>
      {/* <button className="clear-completed">Clear completed</button> */}
    </footer>
  )
}

export default TodoFooter