import React, { useState, useReducer, useContext, createContext } from "react";


const ADD_COUNTER = "ADD_COUNTER";
const initReducer = {
  count: 0
};
//正常的reducer编写
function reducer(state, action) {
  // console.log("action", action)
  switch (action.type) {
    case ADD_COUNTER:
      return { ...state, count: action.count };
    default:
      return state;
  }
}

const CountContext = createContext();
// 上面这一段，初始化state和reducer创建context,可以单独写一个文件，这里为了方便理解，放一个文件里写了

// ? UseReducer, useContext, createContext
const UseReducer = () => {
  const [name, setname] = useState("baby张");
  //父组件里使用useReducer,第一个参数是reducer函数，第二个参数是state，返回的是state和dispash
  const [state, dispatch] = useReducer(reducer, initReducer);
  return (
    <div>
      <h2>UseReducer</h2>
      {/* 在这里通过context，讲reducer和state传递给子组件*/}
      <CountContext.Provider value={{ state, dispatch, name, setname }}>
        <Child />
      </CountContext.Provider>
    </div>
  );
};

const Child = () => {
  const { state, dispatch, name, setname } = useContext(CountContext);

  function handleclick(count) { 
    dispatch({ type: ADD_COUNTER, count: count + 1 });
    setname(count % 2 === 0 ? "babybrother" : "babyZhang");
  }
  return (
    <div style={{ padding: '20px 40px', fontWeight: 'bold'}}>
      <p>{name}</p>
      <p>今年 {state.count} 岁</p>
      <button onClick={() => handleclick(state.count)}>长大了</button>
    </div>
  );
};

export default UseReducer;
