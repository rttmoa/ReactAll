import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authenticateUser } from '../store/actions/auth-action';
import PropTypes from 'prop-types';



class Login extends Component {
  constructor (props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.sendForm = this.sendForm.bind(this);
  }

  handleChange (e) {
    this.setState({
      [e.target.name]: e.target.value, // 根据input的属性name  获取是账号还是密码
    })
  }

  sendForm (e) {
    e.preventDefault();
    if (this.state.username === 'admin' && this.state.password === 'admin') {
      this.props.authenticateUser()
    } else {
      alert('Wrong Credentials')
    }
  }

  render() {
    return (
      <div className="login-page" style={{display:'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div>
          <form onSubmit={this.sendForm}>
            <input type="text" name="username" onChange={this.handleChange} placeholder="username" value={this.state.username}/>
            <input type="password" name="password" onChange={this.handleChange} placeholder="password" value={this.state.password}/>
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  auth: PropTypes.object,
  authenticateUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { authenticateUser })(Login);
