// 提供todos相关的action
import axios from 'axios';

// 同步获取
// export const getListTEST = (list) => {
//   return {
//     type: "GET_LIST",
//     list,
//   }
// }

// 获取任务列表 异步
export const getList = () => {
  return async (dispatch) => {
    const res = await axios.get('http://localhost:8888/todos')
    dispatch({
      type: 'GET_LIST',
      payload: res.data,
    })
    // 同步写法
    // dispatch(getListTEST(res.data))
  }
}

// 添加任务
export const addTodo = (name) => {

  return async (dispatch) => {
    const res = await axios.post('http://localhost:8888/todos', { name, done: false})
    // console.log(res) // {data: {…}, status: 201, statusText: 'Created', headers: {…}, config: {…}, …}
    // return 
    // dispatch(getList())
    dispatch({ type: 'ADD_TODO',payload: res.data })
  }
}

export const delTodo = (id) => {

  return async dispatch =>  {
    // 处理异步
    const res = await axios.delete(`http://localhost:8888/todos/${id}`);
    console.log('delTodo', res)
    dispatch(getList()) 
    dispatch({ type: "DEL_TODO", payload: id }) 
  }
}

export const changeDone = (id, done)  => {

  return async dispatch => {
    await axios({ url: "http://localhost:8888/todos/"+id, method: "patch", data: { done } })
    dispatch({ type: 'CHANGE_DONE',payload: { id,done } })
  }
}


export const changeName = (id, name)  => {

  return async dispatch => {
    await axios({ url: "http://localhost:8888/todos/"+id, method: "patch", data: { name } })
    dispatch({ type: 'CHANGE_NAME', payload: {id, name } })
  }
}