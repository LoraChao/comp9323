import React, { PureComponent, useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import './index.scss'
import { Layout, Avatar, Card, Space, List} from "antd"
import { UserOutlined} from '@ant-design/icons';
import { useSearchParams } from 'react-router-dom';




class LikeButton extends PureComponent{    

  state = {
      like: 0,
      currUserId: 1,
      offer_id: 1
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
  getLikeData(currUserId, offer_id){
    this.setState({
      currUserId: currUserId,
      offer_id: offer_id
    })
    let url = "http://127.0.0.1:5000/offer/get/preferoffer/detail/"+currUserId+'&'+offer_id;
    fetch(url, {
      method: "GET",
      headers: {"Content-Type": "application/json;charset=utf-8"},
    }).then(res => res.json()).then(
      data => {
          if(data['message'] === 'success'){
            this.setState({ like: 1 })
          }else this.setState({ like: 0 })
      })
    }
  handleClick(){
    var loginstatus = this.getCookie('islogin')
    var usertype = this.getCookie('usertype')
    if ( loginstatus === '1' && usertype === 'individual'){
      let text = {
        userId: this.state.currUserId,
        OfferId: this.state.offer_id
      };
      let send = JSON.stringify(text);
      if(this.state.like === 0){
          fetch("http://127.0.0.1:5000/offer/post/preferoffer", { 
          method: "POST",
          headers: {"Content-Type": "application/json;charset=utf-8"},
          body: send
        }).then(res => res.json()).then(
          data => {
              if (data['message'] === 'success'){
                  window.alert("Offer liked!")
                  this.setState({
                    like: (this.state.like + 1)%2
                    })

              }else window.alert("Something went wrong")
          }
      )
      }
      else{
          fetch("http://127.0.0.1:5000/offer/delete/preferoffer", {
          method: "DELETE",
          headers: {"Content-Type": "application/json;charset=utf-8"},
          body: send
      }).then(res => res.json()).then(
        data => {
            if (data['message'] === 'success'){
                window.alert("Offer unliked!")
                this.setState({
                  like: (this.state.like + 1)%2
                  })
            }else window.alert("Something went wrong")
        }
      )
      }
    }else {
      window.alert('Hi, please log in to like this article')
      let url = "http://localhost:3000/login"
      window.location.replace(url)
    }
      
  }

  render(){
    var current_url = window.location.href;
    let index = current_url.indexOf('=');
    var read_offer_id = current_url.substring(index + 1, current_url.length)
    var currUserId = this.getCookie('userid');
    this.getLikeData(currUserId, read_offer_id);
      return <div>
          <Button variant="contained"  onClick={() => {this.handleClick()}}>
              {this.state.like === 0 ? 'like' : 'unlike'}
          </Button>
      </div>
  }
}

const {  Header, Content, Footer} = Layout;


class JobCheck extends PureComponent{
  
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
  getLikeData(currUserId, offer_id){
    this.setState({ currUserId: currUserId })
    let url = "http://127.0.0.1:5000/offer/get/preferoffer/detail/"+offer_id;
    fetch(url, {
      method: "GET",
      headers: {"Content-Type": "application/json;charset=utf-8"},
    }).then(res => res.json()).then(
      data => {
          if(data['message'] === 'success'){
            this.setState({ like: 1 })
          }else this.setState({ like: 0 })
      })
    }
  getOfferData(offer_id){
    let url = "http://127.0.0.1:5000/offer/search/detail/"+offer_id;
    fetch(url, {
          method: "GET",
          headers: {"Content-Type": "application/json;charset=utf-8"},
      }).then(res => res.json()).then(
        data => {
            this.setState({ offer_id: offer_id })
            this.setState({ company_name: data['output'][0]['CompanyName'] })
            this.setState({ position_name: data['output'][0]['Position'] })
            this.setState({ working_location_name: data['output'][0]['WorkingLocation'] })
            this.setState({ working_hour_name: data['output'][0]['Workinghours'] })
            this.setState({ salary_name: data['output'][0]['Salary'] })
            this.setState({ responsibility_name: data['output'][0]['Responsibility'] })
            this.setState({ requirement_name: data['output'][0]['Requirement'] })
            this.setState({ contact_name: data['output'][0]['Contact'] })
        }
      )
  }
  Tohomepage() {
    let url = 'http://localhost:3000/Individual_Home'
    window.location.replace(url)
  }
  Toprofilepage() {
    let url = 'http://localhost:3000/mypage'
    window.location.replace(url)
  }
  constructor(props) {
    super(props)
    this.state = {
      // like: 0,
      currUserId:1,
      offer_id:1,
      // organization_id:1,
      company_name: '',//data[0]['CompanyName'], //string
      company_location:'', //data[0]['CompanyName'], //string
      position_name:'', //data[0]['Position'],
      working_location_name: '',//data[0]['WorkingLocation'],company_name
      working_hour_name: '',//data[0]['Workinghours'], //string
      salary_name: '',//data[0]['Salary'], //string
      responsibility_name:'',//data[0]['Resposibility'], //string
      requirement_name: '',//data[0]['Requirement'], //string
      contact_name: ''//data[0]['Contact'], //string
    }
  }
  render(){
      var current_url = window.location.href;
      let index = current_url.indexOf('=');
      var read_offer_id = current_url.substring(index + 1, current_url.length)
      var currUserId = this.getCookie('userid');
      this.getOfferData(read_offer_id);
  return (
    <Layout>
    <Header style={{ height:'150px'}}>
        <div className="header-content">
            <div className="user-icon">
                <Avatar size={100} icon={<UserOutlined />} />
            </div>
            <span className="username">{this.state.company_name}</span>
            <br/>
            
        </div>
    </Header>
    <Content style={{ padding: '0px 50px 50px 50px', index: '1 1 1'}}>
    
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
        <LikeButton/>
        
      </div>
    </Content>
    <Footer style={{ textAlign: 'center', index: '2 2 2' }}>
    </Footer>
    <Footer style={{ textAlign: 'center', index: '2 2 2' }}>COMP9323 ©2022 T2 Created by "Github Is Savior"</Footer>
    </Layout>
  );
        }
}

export default JobCheck