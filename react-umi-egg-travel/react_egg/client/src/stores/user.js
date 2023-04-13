import { Http } from '@/utils';
import { Toast } from 'antd-mobile';
import { history } from 'umi';
import { cookie, urlGet } from 'project-libs';




export default {
  state: {
    id: undefined,
    username: undefined,
    avatar: undefined,
    phone: undefined,
    sign: undefined
  },
  reducers: {
    getUser(state, payload){
      // console.log("getUser payload", payload)
      return {
        ...state,
        ...payload
      }
    },
    editUser(state, payload){
      return {
        ...state,
        ...payload
      }
    }
  },
  effects: {
    async getUserAsync(dispatch, rootState, payload) {   // 获取用户信息
      // console.log(payload) // {id: 10}  /user 页面获取用户信息
      const user = await Http({
        url: '/user/detail',
        body: payload
      });
      if(user){
        dispatch({
          type: 'getUser',
          payload: user
        });
      }
    },
    async editUserAsync(dispatch, rootState, payload) {  // 修改用户信息
      // console.log("payload", payload) // {avatar: 'data:image/jpeg;base64,/9j/4AAAA', phone: '153......', sign: '吃饭了么1'}
      const result = await Http({
        url: '/user/edit',
        body: payload
      });
      // console.log(result)
      if (result) {
        Toast.success('编辑成功');
        dispatch({
          type: 'editUser',
          payload
        })
        history.push('/user');
      }
    },
    async loginAsync(dispatch, rootState, payload) {     // 登陆
      // console.log("登陆 payload", payload) // {username: 'admin', password: 'admin'}
      const result = await Http({
        url: '/user/login',
        body: payload
      });
      if(result) {
        // console.log(urlGet('from'))
        // cookie.set('user', result);
        localStorage.setItem('token', result.token);
        localStorage.setItem('username', result.username);
        urlGet('from') && history.push(urlGet('from'));
        Toast.success('登录成功')
      }
    },
    async registerAsync(dispatch, rootState, payload) {    // 注册
      const result = await Http({
        url: '/user/register',
        body: payload
      });
      if(result) {
        // cookie.set('user', result);
        localStorage.setItem('token', result.token);
        localStorage.setItem('username', result.username);
        Toast.success('注册成功');
      }
    },
    async logoutAsync(dispatch, rootState, payload) {    // 退出
      // console.log("退出 payload", payload) // undefined
      await Http({
        url: "/user/logout",
        body: payload
      })
      Toast.success('退出登录成功')
      localStorage.clear()
      // location.href = '/login?from=' + location.pathname;
      location.hash = '#/login?from=' + location.pathname;
    }
  }
};
