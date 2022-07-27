import React, { PureComponent } from 'react'
import './Login_individual.scss'

class Login_individual extends PureComponent {
    componentDidMount() {
      let localStorage = window.localStorage
      if (localStorage.islogin === '1') {
        this.props.history.replace('/home')
      }
    }
  
    constructor(props) {
      super(props)
      this.state = {
        username: '', //string
        password: '', //string
        usertype: 'individual', //string
      }
    }
  
    render() {
      return (
        <div className="container">
          <div class="login-wrapper">
            <div class="header">Individual Login</div>
            <div class="form-wrapper">
                <form action="http://127.0.0.1:5000/auth/login" method="post">
                    <input type="text" name="username" placeholder="username" class="input-item" 
                    value={this.state.username}
                    onChange={(e) => {
                      this.setState({ username: e.target.value })
                    }}></input>
                    <input type="password" name="password" placeholder="password" class="input-item"
                    value={this.state.password}
                    onChange={(e) => {
                      this.setState({ password: e.target.value })
                    }}></input>
                    <input class="btn" type="submit" value="Log in"
                    onClick={() => {
                      this.handleLogin()
                    }}></input>
                </form>    
            </div>
            <div class="msg">
                An organization user?
                <a href="./login_organizational">organization Login</a>
            </div>
            <div class="msg">
                Don't have account?
                <a href="./signup">Sign up</a>
            </div>
          </div>
        </div>  
      )
    }
  
    handleLogin() {
      if (this.state.username && this.state.password) {
        this.props.history.replace('/Mypage')
        window.localStorage.islogin = '1'
        alert('Welcome')
      } else {
        alert('Please prompt username and password!')
      }
    }
  }
  
  export default Login_individual
  
