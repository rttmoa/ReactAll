import { AUTHENTICATE_USER, REMOVE_USER } from './types';



/**--- 用户登陆 ---**/
export const authenticateUser = () => async dispatch => {
  dispatch({
    type: AUTHENTICATE_USER,
    payload: {
      first_name: 'Herman',
      last_name: 'Luna',
      email: 'devhermluna@gmail.com' 
    }
  })
}

/**--- 移除用户权限 ---**/
export const removeAuthUser = (name) => dispatch => {
  dispatch({
    type: REMOVE_USER
  })
}