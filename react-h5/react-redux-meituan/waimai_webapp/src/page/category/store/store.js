import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// eslint-disable-next-line no-unused-vars
import logger from 'redux-logger';
import mainReducer from './reducers/main.js';






// const store = createStore(mainReducer, applyMiddleware(logger , thunk));

const store = createStore(mainReducer,applyMiddleware(thunk))


export default store;