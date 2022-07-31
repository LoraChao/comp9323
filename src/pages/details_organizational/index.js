import React, { PureComponent } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './index.scss'
import { Layout, Avatar, Card, Space, List} from "antd"
import { UserOutlined} from '@ant-design/icons';


const {  Header, Content, Footer} = Layout;
class Details_organizational extends PureComponent{
  constructor(props) {
    super(props)
    this.state = {
      companyname_name: '', //string
      location_name: '', //string
      field_name: '', //int
      scale_name: '', //string
      description_name: '', //string
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
            <span className="username">Company Name: {this.state.companyname_name}</span>
            <br/>
            <span className="user-identity">Location:(Kingsford/Sydney/NSW)</span>
           
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
          id="companyname_id"
          label="Company Name"
          name='companyname_name'
          placeholder=".."
          multiline
          variant="outlined"
          style = {{top: 20, width: 400}}
          value={this.state.companyname_name}
          onChange={(e) => {
            this.setState({ companyname_name: e.target.value })
          }}
        />
        <TextField
          id="location_id"
          label="Location"
          name='location_name'
          placeholder="Kingsford/Sydney/NSW"
          multiline
          variant="outlined"
          style = {{top: 20, width: 400}}
          value={this.state.location_name}
          onChange={(e) => {
            this.setState({ location_name: e.target.value })
          }}
        />
      </div>
      <div>
        <TextField
          id="filed_id"
          label="Field"
          name='field_name'
          placeholder="IT/Biomedical/Mechanical.."
          multiline
          variant="outlined"
          style = {{top: 20, width: 400}}
          value={this.state.field_name}
          onChange={(e) => {
            this.setState({ field_name: e.target.value })
          }}
        />
        <TextField
          id="scale_id"
          label="Scale"
          name='scale_name'
          placeholder="50+/200+/100+.."
          multiline
          variant="outlined"
          style = {{top: 20, width: 400}}
          value={this.state.scale_name}
          onChange={(e) => {
            this.setState({ scale_name: e.target.value })
          }}
        />
      </div>
      <div>
      <TextField
          id="description_id"
          label="Description of Company"
          name='description_name'
          placeholder="Start-End:Experience."
          multiline
          variant="outlined"
          minRows={4}
          style = {{top:20, width: 800}}
          value={this.state.description_name}
          onChange={(e) => {
            this.setState({ description_name: e.target.value })
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

export default Details_organizational
