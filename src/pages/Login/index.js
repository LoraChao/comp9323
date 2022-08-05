import React, { PureComponent } from 'react'
import './Login_individual.scss'
import { withRouter } from "react-router-dom"

import {
  BrowserRouter as Router,
  Route
 } from 'react-router-dom'
import { message } from 'antd'

class Login_individual extends PureComponent {
    checklogin() {
      if (this.getCookie('islogin') === '1') {
        let url =  "http://localhost:3000/mypage";
        window.location.replace(url)
      }
    }
    getCookie(name) {
      var nameEQ = name + "=";
      var ca = document.cookie.split(';');
      for(var i=0;i < ca.length;i++) {
          var c = ca[i];
          while (c.charAt(0)==' ') c = c.substring(1,c.length);
          if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
      }
      return null;
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
      const { match, location, history } = this.props
      // this.checklogin()
      return (
        <div className="container">
          <div class="login-wrapper">
            <div class="header">Individual Login</div>
            <div class="form-wrapper">
                {/* <form action="http://127.0.0.1:5000/auth/login" method="post"> */}
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
                    <input class="btn" type="button" value="Log in"
                    onClick={() => {
                      this.getConnect()
                    }}></input>
                {/* </form>     */}
            </div>
            <div class="msg">
                An organization user?
                <a href="./login_organizational">organization Login</a>
            </div>
            <div class="msg">
                Don't have account?
                <a href="./signup">Sign up</a>
            </div>
            <div class="msg">
                Visit as tourist。
                <a href="./home">Home</a> 
                {/* 这里需要homepage的链接 */}
            </div>
          </div>
        </div>  
      )
    }
    setcookie(name, value, days) {
      var expires = "";
      if (days) {
          var date = new Date();
          date.setTime(date.getTime() + (days*24*60*60*1000));
          expires = "; expires=" + date.toUTCString();
      }
      document.cookie = name + "=" + (value || "")  + expires + "; path=/";
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
              if (data.success && data['usergroup'] === 'individual'){
                  let url =  "http://localhost:3000/mypage";
                  window.alert(data["userid"])
                  this.setcookie('islogin', '1', 1)
                  this.setcookie("userid", data["userid"], 1)
                  window.location.replace(url)
              }else window.alert("Authorization failure, incorrect username or password")
          }
      )
    }
  }
  
  export default Login_individual
  
