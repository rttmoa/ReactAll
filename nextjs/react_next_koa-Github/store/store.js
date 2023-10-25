import { createStore, combineReducers, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import axios from 'axios'


const userInitialState = {}
const LOGOUT = 'LOGOUT'
const ADD = "ADD"
function userReducer(state = userInitialState, action) {
  switch (action.type) {
    case ADD: {
      return { count : state.count + (action.num || 1) }
    }
    case LOGOUT: {
      // return { ...state, user: {} }
      return {}
    }
    default:
      return state
  }
}
const UODATE_USERNAME = "UODATE_USERNAME"
function newUserReducer(state = userInitialState, action) {
  switch (action.type) {
    case UODATE_USERNAME: {
      return { 
        ...state,
        username: action.name
      }
    } 
    default:
      return state
  }
}


/**
 * {user: {}, count: {}} 
 */
const allReducers = combineReducers({
  user: userReducer,
})

// action creators
export function logout() {
  return dispatch => {
    axios.post('/logout').then(resp => {
        if (resp.status === 200) {
          dispatch({
            type: LOGOUT,
          })
        } else {
          console.log('logout failed', resp)
        }
      })
      .catch(err => {
        console.log('logout failed', err)
      })
  }
}



export default function initializeStore(state) {
  const store = createStore(
    allReducers,
    // redux和nextjs集成，with-redux函数中集成方式，合并对象
    Object.assign({}, {user: userInitialState}, state),
    composeWithDevTools(applyMiddleware(ReduxThunk)),
  )
  return store
}
