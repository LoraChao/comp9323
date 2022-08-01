import React, { PureComponent } from 'react'
import './Login_organizational.scss'

class Login_organizational extends PureComponent {
    componentDidMount() {
      let localStorage = window.localStorage
      if (localStorage.islogin === '1') {
        this.props.history.replace('/home')
      }
    }
  
    constructor(props) {
      super(props)
      this.state = {
        username: '',
        password: '',
        usertype: 'organizational',
      }
    }
  
    render() {
      return (
        <div className="container">
          <div class="login-wrapper">
            <div class="header">Company Login</div>
            <div class="form-wrapper">
                <form action="http://127.0.0.1:5000/auth/login" method="post">
                    <input type="text" name="username" placeholder="username" class="input-item" 
                    value={this.state.username}
                    onChange={(e) => {
                      this.setState({ password: e.target.value })
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
                An individual user?
                <a href="./login">individual Login</a>
            </div>
            <div class="msg">
                Don't have account?
                <a href="./signup_organizational">Sign up</a>
            </div>
          </div>
        </div>  
      )
    }
  
    getConnect() {
      let text = {username: this.state.username, password: this.state.password};//获取数据
      // console.log(text);
      let send = JSON.stringify(text);//将对象转成json字符串
      fetch("http://127.0.0.1:5000/auth/login", {
          method: "POST",
          headers: {"Content-Type": "application/json;charset=utf-8"},
          body: send
      }).then(res => res.json()).then(
          data => {
              if (data.success){
                  let url =  "http://localhost:3000/mypage";
                  window.location.replace(url)
                  localStorage.setItem('islogin', "1")
              }else window.alert("Authorization failure, incorrect username or password")
          }
      )
    }
  }
  
  export default Login_organizational
  
