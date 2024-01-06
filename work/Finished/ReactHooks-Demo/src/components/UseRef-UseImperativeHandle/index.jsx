import React, {
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
  memo
} from "react";

// ? useRef
let numName = 1
const UseRef = () => {
  const [name, setname] = useState("baby张"); //这里useState绑定个input,关联一个状态name
  const refvalue = useRef(null); // 先创建一个空的useRef
  const testRef = useRef("test");

  function addRef() {
    console.log("----------------- 分割 --------------------");
    refvalue.current.value = `${name} ${numName++}`; // 点击按钮时候给这个ref赋值
    // refvalue.current = name  // ! 这样写时，即使ref没有绑定在dom上，值依然会存在创建的ref上，并且可以使用它
    console.log('refvalue:', refvalue.current.value);
    console.log("子组件input的value值：", testRef.current?.value);
    testRef.current.focus();
  }

  return (
    <div style={{padding: '20px 40px'}}>
      <h3>UseRef</h3>
      <input defaultValue={name} onChange={e => { setname(e.target.value); }}/>
      <button onClick={addRef}>给下面插入名字</button>
      <br /><br />
      <div>
        <p><b>给我个useRef名字：</b><input ref={refvalue} placeholder="refvalue"  /></p> 
      </div>
      <br />
      <div>
        <b>子组件的值：</b>
        <Child ref={testRef} />
      </div>
    </div>
  );
};
let childNum = 110
const TestChild = (props, ref) => {
  const childref = useRef();
  const [value, setValue] = useState(100);
  // console.log(value)
  // 第一个参数，要暴露给对应的父节点，第二个参数要暴露的东西
  useImperativeHandle(ref, () => ({
    value: `子组件${value}`,
    focus: () => childref.current.focus()
  }));
  console.log('v', childref.current)
  return <input type="text" placeholder="useImperativeHandle" ref={childref}  />;
};

const Child = memo(forwardRef(TestChild));

export default UseRef;
