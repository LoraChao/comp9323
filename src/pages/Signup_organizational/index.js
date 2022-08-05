import React, { PureComponent } from 'react'
import './Signup_organizational.scss'

class Signup_organizational extends PureComponent {
  
    constructor(props) {
      super(props)
      this.state = {
        username: '',
        password: '',
      }
    }
  
    render() {
      return (
        <div className="container">
          <div class="login-wrapper">
            <div class="header">Company Signup</div>
            <div class="form-wrapper">
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
                    <input class="btn" type="submit" value="Sign up"
                    onClick={() => {
                      this.getConnect()
                    }}></input> 
            </div>
            <div class="msg">
                An individual user?
                <a href="./signup">Individual Signup</a>
            </div>
            <div class="msg">
                Already have account?
                <a href="./login_organizational">Company Login</a>
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
      fetch("http://127.0.0.1:5000/auth/signup/organization", {
          method: "POST",
          headers: {"Content-Type": "application/json;charset=utf-8"},
          body: send
      }).then(res => res.json()).then(
          data => {
              if (data['message'] === 'Success register'){
                  let url =  "http://localhost:3000/profile_organizational";
                  this.setcookie('islogin', '1', 1)
                  this.setcookie("userid", data["userid"], 1)
                  window.location.replace(url)
              }else window.alert("Username exists or invalid register info")
          }
      )
    }
  }
  
  export default Signup_organizational
  
