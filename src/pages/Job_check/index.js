import React, { PureComponent } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
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
      position_name: 'AI Developer',
      working_location_name: 'Brisbane',
      working_hour_name: '40hrs/wk', //string
      salary_name: '$80000/yr', //string
      responsibility_name: "There were two things that were important to Tracey. The first was her dog. Anyone that had ever met Tracey knew how much she loved her dog. Most would say that she treated it as her child. The dog went everywhere with her and it had been her best friend for the past five years. The second thing that was important to Tracey, however, would be a lot more surprising to most people.", //string
      requirement_name: "Brock would have never dared to do it on his own he thought to himself. That is why Kenneth and he had become such good friends. Kenneth forced Brock out of his comfort zone and made him try new things he'd never imagine doing otherwise. Up to this point, this had been a good thing. It had expanded Brock's experiences and given him a new appreciation for life. Now that both of them were in the back of a police car, all Brock could think was that he would have never dared do it except for the influence of Kenneth.", //string
      contact_name: 'Mr Wang: 04xxxxxx/xxx@xxx.com', //string
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
    <content style={{ padding: '0px 50px 50px 50px', index: '1 1 1'}}>

    <div className='display-wrapper'>
    	<h1>Position</h1>
    	<div className='description'>
	    <p>{this.state.position_name}</p>
        </div>
        <h1>Working Location</h1>
        <div className='description'>
         
         <p>{this.state.working_location_name}</p>
        </div>
        <h1>Working Hour</h1>
        <div className='description'>
         
         <p>{this.state.working_hour_name}</p>
        </div>
        <h1>Salary</h1>
        <div className='description'>
         
         <p>{this.state.salary_name}</p>
        </div>
        <h1>Responsibility</h1>
        <div className='description'>
         
         <p>{this.state.responsibility_name}</p>
        </div>
        <h1>Requirement</h1>
        <div className='description'>
         
         <p>{this.state.requirement_name}</p>
        </div>
        <h1>Contact</h1>
        <div className='description'>
         
         <p>{this.state.contact_name}</p>
        </div>
    </div>
    </content>
    <Footer style={{ textAlign: 'center', index: '2 2 2' }}></Footer>
    <Footer style={{ textAlign: 'center', index: '2 2 2' }}>COMP9323 ©2022 T2 Created by "Github Is Savior"</Footer>
    </Layout>
  );
        }
}

export default JobRelease
