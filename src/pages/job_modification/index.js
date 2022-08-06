import React, { PureComponent } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './index.scss'
import { Layout, Avatar, Card, Space, List} from "antd"
import { UserOutlined} from '@ant-design/icons';
import { useSearchParams } from 'react-router-dom';

const {  Header, Content, Footer} = Layout;
function Getoffer_id(){
  const [params] = useSearchParams()
  const offer_id =  params.get('offer_id')
  this.setState({ offer_id: offer_id })
  return offer_id
}
function Getorg_id(){
  const [params] = useSearchParams()   
  const organization_id = params.get('organization_id')
  this.setState({ organization_id: organization_id })
  return organization_id
}
class JobEdit extends PureComponent{
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
  getOfferData(organization_id, offer_id){
    let url = "http://127.0.0.1:5000/offer/search/detail/"+organization_id+"&"+offer_id;
  //    window.alert(url)
    fetch(url, {
          method: "GET",
          headers: {"Content-Type": "application/json;charset=utf-8"},
      }).then(res => res.json()).then(
        data => {
            this.setState({ company_name: data['output'][0]['CompanyName'] })
            this.setState({ position_name: data['output'][0]['Position'] })
            this.setState({ working_location_name: data['output'][0]['WorkingLocation'] })
            this.setState({ working_hour_name: data['output'][0]['Workinghours'] })
            this.setState({ salary_name: data['output'][0]['Salary'] })
            this.setState({ responsibility_name: data['output'][0]['Responsibility'] })
            this.setState({ requirement_name: data['output'][0]['Requirement'] })
            this.setState({ requirement_name: data['output'][0]['Contact'] })
//           window.alert(data['output'][0]['CompanyName'])
//            return data
            var return_value = data
//            window.alert(return_value)
//            return return_value
        }
      )
  }
  getCompanyinfo(company_username){
    let url = "http://127.0.0.1:5000/auth/brief/organization/"+company_username;
  //    window.alert(url)
    fetch(url, {
          method: "GET",
          headers: {"Content-Type": "application/json;charset=utf-8"},
      }).then(res => res.json()).then(
        data => {
            this.setState({ company_name: data['output'][0]['CompanyName'] })
            this.setState({ company_location: data['output'][0]['Location'] })
  }
      )}
  constructor(props) {
    super(props)
    this.state = {
      company_name: '', //string
      company_location: '', //string
      position_name: '', //string
      working_location_name: '', //string
      working_hour_name: '', //string
      salary_name: '', //string
      responsibility_name: '', //string
      requirement_name: '', //string
      contact_name: '', //string
      currUserId: '',
    }
  }
  render(){
    var read_organization_id = Getoffer_id();
    var read_offer_id = Getorg_id();
    this.setState({
      organization_id: read_organization_id,
      offer_id: read_offer_id,
      currUserId: this.getCookie('userid')
      })
    this.getCompanyinfo(this.state.currUserId)
    this.getOfferData(this.state.organization_id, this.state.offer_id)
  return (
    <Layout>
    <Header style={{ height:'150px'}}>
        <div className="header-content">
            <div className="user-icon">
                <Avatar size={100} icon={<UserOutlined />} />
            </div>
            <span className="username" >{this.company_name}</span>{/* 这里要读取用户数据 */}
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
          id="position_id"
          label="Position"
          name='position_name'
          placeholder="Front end developer/Assistant..."
          defaultValue={this.state.position_name}
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
          defaultValue={this.state.working_location_name}
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
        defaultValue={this.state.working_hour_name}
        multiline
        variant="outlined"
        minRows={1}
        style = {{top:20, width: 800}}
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
        defaultValue={this.state.salary_name}
        multiline
        variant="outlined"
        minRows={1}
        style = {{top:20, width: 800}}
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
        defaultValue={this.state.responsibility_name}
        placeholder=".."
        multiline
        variant="outlined"
        minRows={4}
        style = {{top:20, width: 800}}
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
        defaultValue={this.state.requirement_name}
        multiline
        variant="outlined"
        minRows={4}
        style = {{top:80, width: 800}}
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
        defaultValue={this.state.contact_name}
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
        onClick={() => {
          this.publish()
        }}
        >Release</Button>
      </div>
    </Box>
    </Layout>
  );
        }
        publish() {
          let text = {
                      OrganizationId: this.state.currUserId,
                      company_name: this.state.company_name, 
                      company_location: this.state.company_location,
                      position_name: this.state.position_name,
                      working_location_name: this.state.working_location_name,
                      working_hour_name: this.state.working_hour_name,
                      salary_name: this.state.salary_name,
                      responsibility_name: this.state.responsibility_name,
                      requirement_name: this.state.requirement_name,
                      contact_name: this.state.contact_name,
                      icon_name: ''
                    };//获取数据
          // console.log(text);
          let send = JSON.stringify(text);//将对象转成json字符串
          fetch("http://127.0.0.1:5000/offer/post/organization", {
              method: "POST",
              headers: {"Content-Type": "application/json;charset=utf-8"},
              body: send
          }).then(res => res.json()).then(
              data => {
                  if (data['message'] === 'Success Post'){
                      window.alert("Offer Released!")
                      let url =  "http://localhost:3000/home/org";
                      window.location.replace(url)
                  }else window.alert("Something went wrong")
              }
          )
        }
}

export default JobEdit