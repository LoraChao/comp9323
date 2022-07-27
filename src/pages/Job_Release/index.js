import React, { PureComponent } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './index.scss'
import { Layout, Avatar, Card, Space, List} from "antd"
import { UserOutlined} from '@ant-design/icons';


const {  Header, Content, Footer} = Layout;
class JobRelease extends PureComponent{
  constructor(props) {
    super(props)
    this.state = {
      company_name: 'UNSW', //string
      company_location: 'Kingsford Sydney NSW', //string
      position_name: '', //string
      working_location_name: '', //string
      working_hour_name: '', //string
      salary_name: '', //string
      responsibility_name: '', //string
      requirement_name: '', //string
      contact_name: '', //string
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
            <span className="username">Company Name</span>{/* 这里要读取用户数据 */}
            <br/>
            <span className="user-identity">Company location</span>{/* 这里要读取用户数据 */}
           
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
          id="position_id"
          label="Position"
          name='position_name'
          placeholder="Front end developer/Assistant..."
          multiline
          variant="outlined"
          minRows={1}
          style = {{top:20, width: 800}}
          value={this.state.position_name}
          onChange={(e) => {
            this.setState({ position_name: e.target.value })
          }}
        />
      
      </div>
      <div>
      <TextField
          id="working_location_id"
          label="Location"
          name='working_location_name'
          placeholder="Randwick/Sydney/NSW"
          multiline
          variant="outlined"
          minRows={1}
          style = {{top:20, width: 800}}
          value={this.state.working_location_name}
          onChange={(e) => {
            this.setState({ working_location_name: e.target.value })
          }}
        />
      
      </div>
      <div>
      	<TextField
        id="working_hour_id"
        label="Working Hour"
        name='working_hour_name'
        placeholder="40 hrs/wk.."
        multiline
        variant="outlined"
        minRows={1}
        style = {{top:80, width: 800}}
        value={this.state.working_hour_name}
        onChange={(e) => {
          this.setState({ working_hour_name: e.target.value })
        }}
      />
      </div>
      <div>
      	<TextField
        id="salary_id"
        label="Salary per Year"
        name='salary_name'
        placeholder="$70000/yr.."
        multiline
        variant="outlined"
        minRows={1}
        style = {{top:80, width: 800}}
        value={this.state.salary_name}
        onChange={(e) => {
          this.setState({ salary_name: e.target.value })
        }}
      />
      </div>
      <div>
      	<TextField
        id="responsibility_id"
        label="Responsibility"
        name='responsibility_name'
        placeholder=".."
        multiline
        variant="outlined"
        minRows={4}
        style = {{top:140, width: 800}}
        value={this.state.responsibility_name}
        onChange={(e) => {
          this.setState({ responsibility_name: e.target.value })
        }}
      />
      </div>
      <div>
      	<TextField
        id="requirement_id"
        label="Requirement"
        name='requirement_name'
        placeholder=".."
        multiline
        variant="outlined"
        minRows={4}
        style = {{top:140, width: 800}}
        value={this.state.requirement_name}
        onChange={(e) => {
          this.setState({ requirement_name: e.target.value })
        }}
      />
      </div>
      <div>
      	<TextField
        id="contact_id"
        label="Contact"
        name='contact_name'
        placeholder="Mr Wang: 04xxxxxxx/xxx@xxx.com"
        multiline
        variant="outlined"
        minRows={1}
        style = {{top:140, width: 800}}
        value={this.state.contact_name}
        onChange={(e) => {
          this.setState({ contact_name: e.target.value })
        }}
      />
      </div>
      <div>
        <Button variant="contained" 
        type='submit'
        style = {{left:250, top:230, width:200}}
        >Release</Button>
      </div>
      </form>
    </Box>
    </Layout>
  );
        }
}

export default JobRelease
