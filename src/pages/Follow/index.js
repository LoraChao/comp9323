import { Layout, Card, List, Avatar, Button} from "antd"
import { Header, Footer, Content } from "antd/lib/layout/layout";
import React, { useState} from 'react';
import './index.scss'
import { UserOutlined} from '@ant-design/icons';
// import { useParams } from "react-router-dom";
// import { reaction } from "mobx";
// import { useStore } from "@/store"; 
// import { http } from "@/utils"
// import { reaction } from "mobx";

const id = 1;
const fakeDataUrl = 'http://127.0.0.1:5000/cont/'+id+'/followList'
// const fakeDataUrl1 = "http://127.0.0.1:5000/cont/test"

const tabList = [
    {
        key: 'Company',
        tab: 'Company'
    },
    {
        key: 'Individual',
        tab: 'Individual'
    }
];

// function GetLikeList(id){
//     const {user} = useStore();
//     return user.GetLikeList(id);
// }

global.unfollowList = ''

class Company extends React.Component{          // company follow tab 


    constructor(){
        super()
        
        this.state = {
            companyLikeList: [
                {
                    OrganizationId: "",
                    OrganizationName: "",
                    Description:"",
                    Icon:"",
                    follow: ""
                }
            ],
            unfollowList: [],
        }
    }

    componentDidMount(){
        fetch(fakeDataUrl, {
            method: 'GET',
            //params: id
        })
            .then(res => {return res.json()})
            .then(data => {
                this.setState({
                    companyLikeList: data.message
                    //companyLikeList: useStore().GetLikeList(1)
                })
            })
    }
   
    
    clickFollowHandler = (curItem) =>{  

        const {OrganizationId, follow} = curItem

        this.setState({
            companyLikeList: this.state.companyLikeList.map(item =>{ 
                if(item.OrganizationId === OrganizationId){
                    return{
                        ...item,
                        follow: 
                            follow === 'follow' ? 'unfollow' : 'follow'     // switch follow status
                    }
                }
                else{
                    return item
                }
            }),
        })

        // Renew the unfollow list
        this.state.companyLikeList.map((item) =>  {
            if(item.OrganizationId === OrganizationId && item.follow === 'follow'){
                this.setState({
                    unfollowList: [...this.state.unfollowList, OrganizationId]
                })
                global.unfollowList = [...global.unfollowList,  OrganizationId]
                // console.log(global.unfollowList)
            }
            if(item.OrganizationId === OrganizationId && item.follow === 'unfollow'){
                console.log("unfollow -> follow")
                this.setState({
                    unfollowList: this.state.unfollowList.filter((item) => item !== OrganizationId)
                })
                global.unfollowList = global.unfollowList.filter((item) => item !== OrganizationId)
                // console.log(global.unfollowList)
            }
        })
    }

    returnUnfollowList = () => {
        return this.unfollowList
    }

    render(){
        return <div>
            {/* <div className="backButton"><CompanyBack unfollowList = {this.state.unfollowList}/></div> */}
            <div>
                <List
                    itemLayout="horizontal"
                    //loadMore={this.loadMore}
                    dataSource={this.state.companyLikeList}
                    renderItem={(item) => (
                    <List.Item>
                        <List.Item.Meta
                        avatar={<Avatar size={45} icon={<UserOutlined />} />}
                        title={<a href="@">{item.OrganizationName}</a>}
                        description={item.Description}
                        />
                        <Button onClick={() => this.clickFollowHandler(item)}>{item.follow === 'follow' ? 'unfollow' : 'follow'} </Button>
                    </List.Item>
                    )}
                />
            </div>
        </div>
    }
}

class Individual extends React.Component{    // individual follow tab
    render(){
        return <div>
            Individual
        </div>
    }
}


const loadContents = (currTab) => {            // determine which tab to show
    if(currTab === 'Company'){
      return <div><Company/></div>
    }
    return <div><Individual/></div>
}

const clickBackHandler =  (currTab) => {
    if(currTab === 'Company'){
        //console.log(global.unfollowList)
        //console.log("sfds")
        // global.unfollowList.map((item) => {
        //     console.log(item)
        // })

        const requestOptions = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            //headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: JSON.stringify({
                company: global.unfollowList, 
                Individual: []
            })
            //body: {"title": 1}
        };

        fetch(fakeDataUrl, requestOptions)
        .then(res =>  res.json())
        .then(data => {
            console.log(data)
        });

      }
    else{
        console.log("individual")
    }
}

const Follow = () => {
    const [activeTabKey, setActiveTabKey] = useState('tab1');
  
    const onTab1Change = (key) => {
      setActiveTabKey(key);
    };
  
    return(
        <Layout>
            <Header></Header>

            <Content style={{ 
                padding: '0 50px',
                textAlign: 'left',
            }}>
                <Card
                    style={{
                    width: '100%',
                    }}
                    title="Follow"
                    tabList={tabList}
                    activeTabKey={activeTabKey}
                    extra={
                        // <Button  href="../MyPage" onClick={clickBackHandler()}>Back</Button>
                        <Button href="./MyPage" onClick = {() => clickBackHandler(activeTabKey)}>Back</Button>
                        //backButton(activeTabKey)
                    }
                    onTabChange={(key) => {
                        onTab1Change(key);  
                    }}
                >
                    {loadContents(activeTabKey)}
        </Card>

            </Content>

            <Footer style={{ textAlign: 'center' }}>COMP9323 ©2022 T2 Created by "Github Is Savior"</Footer>
        </Layout>
    )
    

}




export default Follow