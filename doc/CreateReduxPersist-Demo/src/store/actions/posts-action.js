import { FETCH_POSTS, NEW_POSTS } from './types';
import API from '../../api'






/**--- 请求数据 ---**/
export const fetchPosts = () => dispatch => {
  API.get('/posts').then(response => {
      // console.log('post?', response.data)
      dispatch({
        type: FETCH_POSTS,
        payload: response.data
      })
    })
}

/**--- 新数据 ---**/
export const createPosts = (name) => dispatch => {
  dispatch({
    type: NEW_POSTS,
    payload: name
  })
}