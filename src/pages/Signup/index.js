import React, { PureComponent } from 'react'
import './Signup_individual.scss'
import Button from '@mui/material/Button';
class Signup_individual extends PureComponent {
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
    checklogin() {
      if (this.getCookie('islogin') === '1') {
        let url =  "http://localhost:3000/mypage";
        window.location.replace(url)
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
      this.checklogin()
      return (
        <div className="auth_container">
          <div className="login-wrapper">
            <div className="header">Individual Signup</div>
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
                    {/* <input className="btn" type="submit" value="Sign up"
                    onClick={() => {
                      this.getConnect()
                    }}></input>    */}
                    <Button variant="contained" 
                      type='submit'
                      // style = {{left:250, top:230, width:200}}
                      onClick={() => {
                        this.getConnect()
                      }}
                      >Sign up</Button>
            </div>
            <div className="msg">
                An organization user?
                <a href="./signup_organizational">Company Signup</a>
            </div>
            <div className="msg">
                Already have account?
                <a href="./login">Individual Login</a>
            </div>
            <div className="msg">
                Visit as tourist.
                <a href="./Individual_Home">Home</a> 
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
      fetch("http://127.0.0.1:5000/auth/signup/individual", {
          method: "POST",
          headers: {"Content-Type": "application/json;charset=utf-8"},
          body: send
      }).then(res => res.json()).then(
          data => {
              if (data['message'] === 'Success register'){
                  let url =  "http://localhost:3000/profile";
                  this.setcookie('islogin', '1', 1)
                  this.setcookie("userid", data["individualID"], 1)
                  this.setcookie("usertype", 'individual', 1)
                  window.location.replace(url)
              }else window.alert("Username exists or invalid register info")
          }
      )
    }
  }
  
  export default Signup_individual
  
