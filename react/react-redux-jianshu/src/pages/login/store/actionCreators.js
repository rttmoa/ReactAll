import axios from 'axios';
import * as constants from './constants';



const changeLogin = () => ({
	type: constants.CHANGE_LOGIN,
	value: true
})
/**--- 退出 ---**/
export const logout = () => ({
	type: constants.LOGOUT,
	value: false
})

export const login = (accout, password) => {
	return (dispatch) => {
		axios.get('/api/login.json?account=' + accout + '&password=' + password).then((res) => {
			const result = res.data.data;
			if (result) {
				dispatch(changeLogin()) // 接口返回的值 存储到redux中
			}else {
				alert('登陆失败')
			}
		})
	}
}