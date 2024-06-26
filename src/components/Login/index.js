import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookie from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', typePassword: 'password', errorMsg: ''}

  renderLogin = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const userDetails = {
      username,
      password,
    }
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(response)
    if (response.ok) {
      this.loginSuccess(data.jwt_token)
    } else {
      this.loginFailed(data.error_msg)
    }
  }

  loginSuccess = jwtToken => {
    const {history} = this.props
    Cookie.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  loginFailed = error => {
    this.setState({errorMsg: error})
  }

  getUserInput = e => {
    const {username} = this.state
    this.setState({username: e.target.value})
    console.log(username)
  }

  getPassword = e => {
    const {password} = this.state
    this.setState({password: e.target.value})
    console.log(password)
  }

  changePasswordText = e => {
    const {typePassword} = this.state
    if (e.target.checked) {
      this.setState({typePassword: 'text'})
    } else {
      this.setState({typePassword: 'password'})
    }
  }

  renderUserInput = () => {
    const {username} = this.state
    return (
      <div className="form-con">
        <label htmlFor="user">USERNAME</label>
        <input
          type="text"
          value={username}
          placeholder="rahul"
          className="form-user-input"
          onChange={this.getUserInput}
          id="user"
        />
      </div>
    )
  }

  renderPasswordInput = () => {
    const {password, typePassword} = this.state

    return (
      <div>
        <div className="form-con">
          <label htmlFor="password">PASSWORD</label>
          <input
            type={typePassword}
            placeholder="password"
            className="form-password"
            value={password}
            id="password"
            onChange={this.getPassword}
          />
        </div>
        <div className="checkbox-con">
          <input
            type="checkbox"
            className="login-checkbox"
            id="checkbox"
            onChange={this.changePasswordText}
          />
          <label htmlFor="checkbox">show password</label>
        </div>
      </div>
    )
  }

  render() {
    const {errorMsg} = this.state
    const errorText = errorMsg === '' ? '' : errorMsg
    const jwtToken = Cookie.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-bg">
        <div className="login-card">
          <h1 className="login-Heading">Daily Mood Tracker</h1>
          <form className="login-info" onSubmit={this.renderLogin}>
            {this.renderUserInput()}
            {this.renderPasswordInput()}
            <button type="submit" className="login-btn">
              Login
            </button>
            <p className="error-msg">{errorText}</p>
          </form>
        </div>
      </div>
    )
  }
}
export default Login
