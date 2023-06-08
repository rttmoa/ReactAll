import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';

// import { UseRedux } from './common'
import UseInfiniteScroll from './hooks/react-hooks-infinite-scroll/App'; // 无限滚动Hooks



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode> 
    <BrowserRouter>
      123
      <UseInfiniteScroll /> 

    </BrowserRouter> 
  </React.StrictMode>
);