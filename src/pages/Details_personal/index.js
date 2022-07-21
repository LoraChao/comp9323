import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './index.scss'
import { Layout, Avatar, Card, Space, List} from "antd"
import { UserOutlined} from '@ant-design/icons';


const {  Header, Content, Footer} = Layout;
const Details_personal = () => {
  
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
      component="form"
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
          placeholder="Mr/Mrs/Ms/Miss"
          multiline
          variant="outlined"
          style = {{top: 20, width: 400}}
        />
        <TextField
          id="name_id"
          label="Name"
          placeholder=".."
          multiline
          variant="outlined"
          style = {{top: 20, width: 400}}
        />
      </div>
      <div>
        <TextField
          id="gender_id"
          label="Gender"
          placeholder="Male/Female/Other genders.."
          multiline
          variant="outlined"
          style = {{top: 20, width: 400}}
        />
        <TextField
          id="age_id"
          label="Age"
          placeholder=".."
          multiline
          variant="outlined"
          style = {{top: 20, width: 400}}
        />
      </div>
      <div>
        <TextField
            id="email_id"
            label="Email"
            placeholder="xxx@xxx.com"
            multiline
            variant="outlined"
            style = {{top: 20, width: 400}}
          />
        <TextField
          id="skill_id"
          label="Skill(separate with ',')"
          placeholder="Python,C,Java"
          multiline
          variant="outlined"
          style = {{top: 20, width: 400}}
        />
      </div>
      <div>
        <TextField
            id="education_id"
            label="Education"
            placeholder="Bachelor/Master/PhD.."
            multiline
            variant="outlined"
            style = {{top: 20, width: 400}}
          />
        <TextField
          id="achievement_id"
          label="achievement(separate with '.')"
          placeholder="achievement1, achievement2, achievement3..."
          multiline
          variant="outlined"
          style = {{top: 20, width: 400}}
        />
      </div>
      <div>
      <TextField
          id="experience_id"
          label="Experience"
          placeholder="Start-End:Experience."
          multiline
          variant="outlined"
          minRows={4}
          style = {{top:20, width: 800}}
          
        />
      
      </div>
      <div>
      	<TextField
        id="professional_summary_id"
        label="Professional Summary"
        placeholder=".."
        multiline
        variant="outlined"
        minRows={4}
        style = {{top:80, width: 800}}
        
      />
      </div>
      <div>
      	<TextField
        id="cv_id"
        label="CV"
        placeholder=".."
        multiline
        variant="outlined"
        minRows={4}
        style = {{top:140, width: 800}}
        
      />
      </div>
      <div>
        <Button variant="contained" 
        style = {{left:250, top:230, width:200}}
        >Update</Button>
      </div>
    </Box>
    </Layout>
  );
}

export default Details_personal
