import React from 'react';
import { createSelector } from 'reselect';
import * as actions from '../actions/actions';
import { useSelector, useDispatch } from 'react-redux';



// TODO: 我们也可以使用useDispatch和useSelector来实现类似的需求
const App = () => {
  const dispatch = useDispatch();
  const count = useSelector(createSelector(store => store.count, state => state));

  return (
    <div>
      <h1>The count is {count}</h1>
      <button onClick={() => dispatch(actions.increment(count))}>+</button>
      <button onClick={() => dispatch(actions.decrement(count))}>-</button>
    </div>
  );
}

export default App;
