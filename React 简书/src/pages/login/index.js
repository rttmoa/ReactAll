import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { LoginWrapper, LoginBox, Input, Button } from './style';
import { actionCreators } from './store';


/**--- Login结束 ---**/
class Login extends PureComponent {
	render() {
		const { loginStatus } = this.props;
		// console.log("login/props", this.props) // {history, location, login(), loginStatus, match, staticContext}
		if (!loginStatus) {
			return (
				<LoginWrapper>
					<LoginBox>
						<Input placeholder='账号' innerRef={(input) => {this.account = input}}/>
						<Input placeholder='密码' type='password' innerRef={(input) => {this.password = input}}/>
						<Button onClick={() => this.props.login(this.account, this.password)}>登陆</Button>
					</LoginBox>
				</LoginWrapper>
			)
		}else {
			return <Redirect to='/'/>
		}
	}
}

const mapState = (state) => {
	// console.log(state) // Map 对象
	return {
		loginStatus: state.getIn(['login', 'login'])
	}
}

const mapDispatch = (dispatch) => {
	// console.log(dispatch)
	return {
		login(accountElem, passwordElem){
			dispatch(actionCreators.login(accountElem.value, passwordElem.value))
		}
	}
}

export default connect(mapState, mapDispatch)(Login);