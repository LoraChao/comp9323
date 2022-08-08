import React, { PureComponent } from 'react'
import './Login_organizational.scss'
import Button from '@mui/material/Button';
class Login_organizational extends PureComponent {
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
        username: '',
        password: '',
        usertype: 'organizational',
      }
    }
  
    render() {
      this.checklogin()
      return (
        <div className="auth_container">
          <div className="login-wrapper">
            <div className="header">Company Login</div>
            <div className="form-wrapper">
                    <input type="text" name="username" placeholder="username" className="input-item" 
                    value={this.state.username}
                    onChange={(e) => {
                      this.setState({ username: e.target.value })
                    }}></input>
                    <input type="password" name="password" placeholder="password" className="input-item"
                    value={this.state.password}
                    onChange={(e) => {
                      this.setState({ password: e.target.value })
                    }}></input>
                    <Button variant="contained" 
                    type='submit'
                    onClick={() => {
                      this.getConnect()
                    }}
                    >Log in</Button>
            </div>
            <div className="msg">
                An individual user?
                <a href="./login">individual Login</a>
            </div>
            <div className="msg">
                Don't have account?
                <a href="./signup_organizational">Sign up</a>
            </div>
            <div className="msg">
                Visit as tourist.
                <a href="./Individual_Home">Home</a> 
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
      let text = {username: this.state.username, password: this.state.password};
      let send = JSON.stringify(text);
      fetch("http://127.0.0.1:5000/auth/login", {
          method: "POST",
          headers: {"Content-Type": "application/json;charset=utf-8"},
          body: send
      }).then(res => res.json()).then(
          data => {
              if (data.success && data['usergroup'] === 'organization'){
                  let url =  "http://localhost:3000/Organization_Home";
                  this.setcookie('islogin', '1', 1)
                  this.setcookie("userid", data["id"], 1)
                  this.setcookie("usertype", 'organization', 1)
                  window.location.replace(url)
              }else window.alert("Authorization failure, incorrect username or password")
          }
      )
    }
  }
  
  export default Login_organizational
  
