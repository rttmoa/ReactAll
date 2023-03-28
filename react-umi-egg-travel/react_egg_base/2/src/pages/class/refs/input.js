import React from 'react';

const Input = React.forwardRef((props, ref)=>{
  return (
    <>
    forwardRef: <input ref={ref}/>
    </>
  )
});

export default Input;