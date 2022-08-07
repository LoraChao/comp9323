import React, { PureComponent } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './index.scss'
import { Layout, Avatar, Card, Space, List} from "antd"
import { UserOutlined} from '@ant-design/icons';


const {  Header, Content, Footer} = Layout;
class Edit_details_personal extends PureComponent{
  setcookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
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
  getuserinfo(userid){
    let url = "http://127.0.0.1:5000/auth/brief/individual/"+userid;
    fetch(url, {
          method: "GET",
          headers: {"Content-Type": "application/json;charset=utf-8"},
      }).then(res => res.json()).then(
        data => {
            this.setState({ userid: userid })
            this.setState({ username: data['IndividualName'] })
            this.setState({ title_name: data['Title'] })
            this.setState({ name_name: data['Name'] })
            this.setState({ gender_name: data['Gender'] })
            this.setState({ age_name: data['Age'] })
            this.setState({ email_name: data['Email'] })
            this.setState({ skill_name: data['Skill'] })
            this.setState({ education_name: data['Education'] })
            this.setState({ experience_name: data['Experience'] })
            this.setState({ achievement_name: data['Achievement'] })
            this.setState({ professional_summary_name: data['Professional'] })
            this.setState({ cv_name: data['CV'] })
            this.setState({ flag: false })
  }
      )}
  constructor(props) {
    super(props)
    this.state = {
      userid:'',
      username: '',
      title_name: '', //string
      name_name: '', //string
      gender_name: '', //string
      age_name: '', //int
      email_name: '', //string
      skill_name: '', //string
      education_name: '', //string
      experience_name: '', //string
      achievement_name: '', //string
      professional_summary_name: '', //string
      cv_name: '', //string
      icon_name: '',
      usertype: 'individual', //string
      flag: true
    }
  }
  render(){
    var currUserId = this.getCookie('userid')
    if (this.state.flag === true){
//      window.alert(currUserId)
      this.getuserinfo(currUserId)
    }
    
  return (
    <Layout>
    <Header style={{ height:'150px'}}>
        <div className="header-content">
            <div className="user-icon">
                <Avatar size={100} icon={<UserOutlined />} />
            </div>
            <span className="username">{this.state.title_name} {this.state.name_name}</span>
            <br/>
           
        </div>
    </Header>
    <Box
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch', height: '10ch' },
      }}
      noValidate
      autoComplete="off"
      style = {{height: 1000}}
    >
      <div>
        <TextField
          id="title_id"
          label="Title"
          name='title_name'
          InputLabelProps={{ shrink: true }}
          multiline
          variant="outlined"
          style = {{top: 20, width: 400}}
          defaultValue={this.state.title_name}
          onChange={(e) => {
            this.setState({ title_name: e.target.value })
          }}
        />
        <TextField
          id="name_id"
          label="Name"
          name='name_name'
          InputLabelProps={{ shrink: true }}
          multiline
          variant="outlined"
          style = {{top: 20, width: 400}}
          defaultValue={this.state.name_name}
          onChange={(e) => {
            this.setState({ name_name: e.target.value })
          }}
        />
      </div>
      <div>
        <TextField
          id="gender_id"
          label="Gender"
          name='gender_name'
          InputLabelProps={{ shrink: true }}
          multiline
          variant="outlined"
          style = {{top: 20, width: 400}}
          defaultValue={this.state.gender_name}
          onChange={(e) => {
            this.setState({ gender_name: e.target.value })
          }}
        />
        <TextField
          id="age_id"
          label="Age"
          name='age_name'
          InputLabelProps={{ shrink: true }}
          multiline
          variant="outlined"
          style = {{top: 20, width: 400}}
          defaultValue={this.state.age_name}
          onChange={(e) => {
            this.setState({ age_name: e.target.value })
          }}
        />
      </div>
      <div>
        <TextField
            id="email_id"
            label="Email"
            name='email_name'
            InputLabelProps={{ shrink: true }}
            multiline
            variant="outlined"
            style = {{top: 20, width: 400}}
            defaultValue={this.state.email_name}
            onChange={(e) => {
              this.setState({ email_name: e.target.value })
            }}
          />
        <TextField
          id="skill_id"
          label="Skill"
          name='skill_name'
          InputLabelProps={{ shrink: true }}
          multiline
          variant="outlined"
          style = {{top: 20, width: 400}}
          defaultValue={this.state.skill_name}
          onChange={(e) => {
            this.setState({ skill_name: e.target.value })
          }}
        />
      </div>
      <div>
        <TextField
            id="education_id"
            label="Education"
            name='education_name'
            InputLabelProps={{ shrink: true }}
            multiline
            variant="outlined"
            style = {{top: 20, width: 400}}
            defaultValue={this.state.education_name}
            onChange={(e) => {
              this.setState({ education_name: e.target.value })
            }}
          />
        <TextField
          id="achievement_id"
          label="achievement(separate with '.')"
          name='achievement_name'
          InputLabelProps={{ shrink: true }}
          multiline
          variant="outlined"
          style = {{top: 20, width: 400}}
          defaultValue={this.state.achievement_name}
          onChange={(e) => {
            this.setState({ achievement_name: e.target.value })
          }}
        />
      </div>
      <div>
      <TextField
          id="experience_id"
          label="Experience"
          InputLabelProps={{ shrink: true }}
          name='experience_name'
          multiline
          variant="outlined"
          minRows={4}
          style = {{top:20, width: 800}}
          defaultValue={this.state.experience_name}
          onChange={(e) => {
            this.setState({ experience_name: e.target.value })
          }}
        />
      
      </div>
      <div>
      	<TextField
        id="professional_summary_id"
        label="Professional Summary"
        name='professional_summary_name'
        InputLabelProps={{ shrink: true }}
        multiline
        variant="outlined"
        minRows={4}
        style = {{top:80, width: 800}}
        defaultValue={this.state.professional_summary_name}
        onChange={(e) => {
          this.setState({ professional_summary_name: e.target.value })
        }}
      />
      </div>
      <div>
      	<TextField
        id="cv_id"
        label="Hobby"
        name='cv_name'
        InputLabelProps={{ shrink: true }}
        multiline
        variant="outlined"
        minRows={4}
        style = {{top:140, width: 800}}
        defaultValue={this.state.cv_name}
        onChange={(e) => {
          this.setState({ cv_name: e.target.value })
        }}
      />
      </div>
      <div>
        <Button variant="contained" 
        type='submit'
        style = {{left:250, top:230, width:200}}
        onClick={() => {
          this.getConnect()}}
        >Update</Button>
      </div>

    </Box>
    </Layout>
  );
        }
        getConnect() {
          let text = {username: this.state.userid,
                      title_name: this.state.title_name,
                      name_name: this.state.name_name, //string
                      gender_name: this.state.gender_name, //string
                      age_name: this.state.age_name, //int
                      email_name: this.state.email_name, //string
                      skill_name: this.state.skill_name, //string
                      education_name: this.state.education_name, //string
                      experience_name: this.state.experience_name, //string
                      achievement_name: this.state.achievement_name, //string
                      professional_name: this.state.professional_summary_name, //string
                      cv_name: this.state.cv_name, //string
                      icon_name: this.state.icon_name
                      };//获取数据
          // console.log(text);
          let send = JSON.stringify(text);//将对象转成json字符串
          fetch("http://127.0.0.1:5000/auth/details/individual", {
              method: "POST",
              headers: {"Content-Type": "application/json;charset=utf-8"},
              body: send
          }).then(res => res.json()).then(
              data => {
//                  window.alert(data['message'])
                  if (data['message'] === 'success'){
                      window.alert("Detail updated!")
                      let url =  "http://localhost:3000/mypage";
                      window.location.replace(url)
                  }else window.alert("Something went wrong")
              }
          )
        }
}

export default Edit_details_personal
