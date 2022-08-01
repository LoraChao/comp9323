import React, { PureComponent } from 'react'
import './Signup_individual.scss'

class Signup_individual extends PureComponent {
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
      }
    }
  
    render() {
      return (
        <div className="container">
          <div class="login-wrapper">
            <div class="header">Individual Signup</div>
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
                An organization user?
                <a href="./signup_organizational">Company Signup</a>
            </div>
            <div class="msg">
                Already have account?
                <a href="./login">Individual Login</a>
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
      fetch("http://127.0.0.1:5000/auth/signup/individual", {
          method: "POST",
          headers: {"Content-Type": "application/json;charset=utf-8"},
          body: send
      }).then(res => res.json()).then(
          data => {
              if (data.success){
                  let url =  "http://localhost:3000/profile";
                  this.setcookie('islogin', '1', 1)
                  this.setcookie("userid", data["userid"], 1)
                  window.location.replace(url)
              }else window.alert("Authorization failure, incorrect username or password")
          }
      )
    }
  }
  
  export default Signup_individual
  
