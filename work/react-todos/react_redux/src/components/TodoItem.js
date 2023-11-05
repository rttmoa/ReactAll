import { useDispatch } from "react-redux"
import { changeDone, changeName, delTodo } from "../store/actions/todos"
import { useRef,useState } from "react"
import axios from 'axios';


export default function TodoItem({ item }) {    
  const dispatch = useDispatch()

  const [ current, setCurrent ] = useState('') 
  const inputRef = useRef(null)

  const del = (id) => {
    // console.log(id); return

    // dispatch(delTodo(id))

    dispatch(
      async dispatch =>  {
        await axios.delete(`http://localhost:8888/todos/${id}`);
        dispatch({ type: "DEL_TODO", payload: id }) 
      }
    )
  }
  const change = (id, done) => {
    // console.log(id, done); return 

    // dispatch(changeDone(id, done))

    dispatch(
      async dispatch => {
        await axios({ url: `http://localhost:8888/todos/${id}`, method: "patch", data: { done } })
        dispatch({ type: 'CHANGE_DONE', payload: { id, done } })
      }
    )
  }
  const showEdit = async (id) => {
    // console.log(id); return;

    await setCurrent(id)
    inputRef.current.focus();
  }
  // useEffect(() => {
  //   inputRef.current.focus()  
  // }, [current]);
  const onkeyup = (e, id) => {
    // console.log(e, id); return;

    if(e.keyCode === 27){setCurrent('')}

    if(e.keyCode === 13){
      dispatch(changeName(id, e.target.value))
      setCurrent('')
    }
  }


  // 可以测试一条数据
  // console.log(1, ['', ''].join(' ')) // ' '
  // console.log([item.done ? 'completed' : '', item.id === current ? 'editing' : '']) // ['', '']、 ['completed', '']
  // console.log([item.done ? 'completed' : '', item.id === current ? 'editing' : ''].join(' ')) // completed editing


  return (
      <li className={[item.done ? 'completed' : '', item.id === current ? 'editing' : ''].join(' ')}>
        <div className="view">
          <input className="toggle" type="checkbox" checked={item.done} onChange={(e)=> change(item.id, e.target.checked)} />
          <label onDoubleClick={() => showEdit(item.id)} >{item.name}</label>
          <button className="destroy" onClick={() => del(item.id)} />
        </div>
        <input className="edit" ref={inputRef} defaultValue={item.name} onBlur={() => setCurrent('')} onKeyUp={(e) => onkeyup(e, item.id)}
        />
      </li>
    )
}