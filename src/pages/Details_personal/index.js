import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './index.scss'
import { Layout, Avatar, Card, Space, List} from "antd"
import { UserOutlined} from '@ant-design/icons';


const {  Header, Content, Footer} = Layout;
class Details_personal extends PureComponent{
  constructor(props) {
    super(props)
    this.state = {
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
      usertype: 'individual', //string
    }
  }
  render(){
  return (
    <Layout>
    <Header style={{ height:'150px'}}>
        <div className="header-content">
            <div className="user-icon">
                <Avatar size={100} icon={<UserOutlined />} />
            </div>
            <span className="username">Username</span>
            <br/>
            <span className="user-identity">User Identity(University/Company, Position, Program)</span>
           
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
      <form method="post" action="http://127.0.0.1:5000/auth/login">
      <div>
        <TextField
          id="title_id"
          label="Title"
          name='title_name'
          placeholder="Mr/Mrs/Ms/Miss"
          multiline
          variant="outlined"
          style = {{top: 20, width: 400}}
          value={this.state.title_name}
          onChange={(e) => {
            this.setState({ title_name: e.target.value })
          }}
        />
        <TextField
          id="name_id"
          label="Name"
          name='name_name'
          placeholder=".."
          multiline
          variant="outlined"
          style = {{top: 20, width: 400}}
          value={this.state.name_name}
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
          placeholder="Male/Female/Other genders.."
          multiline
          variant="outlined"
          style = {{top: 20, width: 400}}
          value={this.state.gender_name}
          onChange={(e) => {
            this.setState({ gender_name: e.target.value })
          }}
        />
        <TextField
          id="age_id"
          label="Age"
          name='age_name'
          placeholder=".."
          multiline
          variant="outlined"
          style = {{top: 20, width: 400}}
          value={this.state.age_name}
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
            placeholder="xxx@xxx.com"
            multiline
            variant="outlined"
            style = {{top: 20, width: 400}}
            value={this.state.email_name}
            onChange={(e) => {
              this.setState({ email_name: e.target.value })
            }}
          />
        <TextField
          id="skill_id"
          label="Skill(separate with ',')"
          name='skill_name'
          placeholder="Python,C,Java"
          multiline
          variant="outlined"
          style = {{top: 20, width: 400}}
          value={this.state.skill_name}
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
            placeholder="Bachelor/Master/PhD.."
            multiline
            variant="outlined"
            style = {{top: 20, width: 400}}
            value={this.state.education_name}
            onChange={(e) => {
              this.setState({ education_name: e.target.value })
            }}
          />
        <TextField
          id="achievement_id"
          label="achievement(separate with '.')"
          name='achievement_name'
          placeholder="achievement1, achievement2, achievement3..."
          multiline
          variant="outlined"
          style = {{top: 20, width: 400}}
          value={this.state.achievement_name}
          onChange={(e) => {
            this.setState({ achievement_name: e.target.value })
          }}
        />
      </div>
      <div>
      <TextField
          id="experience_id"
          label="Experience"
          name='experience_name'
          placeholder="Start-End:Experience."
          multiline
          variant="outlined"
          minRows={4}
          style = {{top:20, width: 800}}
          value={this.state.experience_name}
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
        placeholder=".."
        multiline
        variant="outlined"
        minRows={4}
        style = {{top:80, width: 800}}
        value={this.state.professional_summary_name}
        onChange={(e) => {
          this.setState({ professional_summary_name: e.target.value })
        }}
      />
      </div>
      <div>
      	<TextField
        id="cv_id"
        label="CV"
        name='cv_name'
        placeholder=".."
        multiline
        variant="outlined"
        minRows={4}
        style = {{top:140, width: 800}}
        value={this.state.cv_name}
        onChange={(e) => {
          this.setState({ cv_name: e.target.value })
        }}
      />
      </div>
      <div>
        <Button variant="contained" 
        type='submit'
        style = {{left:250, top:230, width:200}}
        >Update</Button>
      </div>
      </form>
    </Box>
    </Layout>
  );
        }
}

export default Details_personal
