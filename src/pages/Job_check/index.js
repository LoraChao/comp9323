import React, { PureComponent, useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import './index.scss'
import { Layout, Avatar, Card, Space, List} from "antd"
import { UserOutlined} from '@ant-design/icons';
import { useSearchParams } from 'react-router-dom';

class LikeButton extends React.Component{    // individual follow tab

  state = {
      like: 1
  }

  handleClick(){
      let text = {
        userId: this.state.currUserId,
        offerId: this.state.offer_id
      };
      let send = JSON.stringify(text);
      if(this.state.like === 0){
          fetch("http://127.0.0.1:5000/offer/post/preferoffer", { //这里需要like offer的链接**********
          method: "POST",
          headers: {"Content-Type": "application/json;charset=utf-8"},
          body: send
        }).then(res => res.json()).then(
          data => {
              if (data['message'] === 'Success'){
                  window.alert("Offer liked!")
                  this.setState({
                    like: (this.state.like + 1)%2
                    })
              }else window.alert("Something went wrong")
          }
      )
      }
      else{
          fetch("http://127.0.0.1:5000/offer/delete/preferoffer", { //这里需要like offer的链接**********
          method: "DELETE",
          headers: {"Content-Type": "application/json;charset=utf-8"},
          body: send
      }).then(res => res.json()).then(
        data => {
            if (data['message'] === 'Success'){
                window.alert("Offer unliked!")
                this.setState({
                  like: (this.state.like + 1)%2
                  })
            }else window.alert("Something went wrong")
        }
      )
      }
  }

  render(){
      return <div>
          <Button onClick={() => {this.handleClick()}}> 
              {this.state.like === 1 ? 'unlike' : 'like'}
          </Button>
      </div>
      
  }
}

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

var organization_id = Getoffer_id();
var offer_id = Getoffer_id();


class JobCheck extends PureComponent{
  
  myFunction(x) {
    x.classList.toggle("fa-thumbs-down");
  }

  // LikeOffer(x) {
  //   let text = {userid: this.currUserId, offerid: this.offer_id};//获取数据
  //   // console.log(text);
  //   let send = JSON.stringify(text);//将对象转成json字符串
  //   if(x.class === "fa-thumbs-up"){
  //     fetch("http://127.0.0.1:5000/auth/login", { //这里需要like offer的链接**********
  //       method: "POST",
  //       headers: {"Content-Type": "application/json;charset=utf-8"},
  //       body: send
  //     })
  //     x.classList.toggle("fa-thumbs-down");
  //   }
  //   else if(x.class === "fa-thumbs-down"){
  //     fetch("http://127.0.0.1:5000/auth/login", { //这里需要like offer的链接**********
  //       method: "DELETE",
  //       headers: {"Content-Type": "application/json;charset=utf-8"},
  //       body: send
  //     })
  //     x.classList.toggle("fa-thumbs-up");
  // }
  // }  
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
  Tohomepage() {
    let url = 'http://localhost:3000/home'
    window.location.replace(url)
  }
  Toprofilepage() {
    let url = 'http://localhost:3000/mypage'
    window.location.replace(url)
  }
  constructor(props) {
    super(props)
    this.state = {
      currUserId:'',
      offer_id:'',
      organization_id:'',
      company_name: '',//data[0]['CompanyName'], //string
      company_location:'', //data[0]['CompanyName'], //string
      position_name:'', //data[0]['Position'],
      working_location_name: '',//data[0]['WorkingLocation'],
      working_hour_name: '',//data[0]['Workinghours'], //string
      salary_name: '',//data[0]['Salary'], //string
      responsibility_name:'',//data[0]['Resposibility'], //string
      requirement_name: '',//data[0]['Requirement'], //string
      contact_name: ''//data[0]['Contact'], //string
    }
  }
  render(){
      this.getOfferData(organization_id, offer_id)
  return (
    <Layout>
    <Header style={{ height:'150px'}}>
        <div className="header-content">
            <div className="user-icon">
                <Avatar size={100} icon={<UserOutlined />} />
            </div>
            <span className="username">{this.state.company_name}</span>{/* 这里要读取用户数据 */}
            <br/>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            <FollowButton/>
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
    <div>
        <Button variant="contained" 
        type='submit'
        style = {{left:250, top:230, width:200}}
        onClick={() => {
          this.Tohomepage()
        }}
        >Back to Home</Button>
        <Button variant="contained" 
        type='submit'
        style = {{left:100, top:230, width:200}}
        onClick={() => {
          this.Toprofilepage()
        }}
        >Back to Profile</Button>
      </div>
    </content>
    <Footer style={{ textAlign: 'center', index: '2 2 2' }}></Footer>
    <Footer style={{ textAlign: 'center', index: '2 2 2' }}>COMP9323 ©2022 T2 Created by "Github Is Savior"</Footer>
    </Layout>
  );
        }
}

export default JobCheck
