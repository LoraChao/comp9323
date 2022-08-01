import './MyPage.scss'
import React, { useState, useEffect }  from 'react';
import { Layout, Avatar, Button, Card, Space, List, Rate} from "antd"
import { UserOutlined} from '@ant-design/icons';

import { Navigate, useNavigate } from 'react-router-dom';


const currUserId = '1'

const followOrgURL = 'http://127.0.0.1:5000/cont/'+currUserId+'/orgFollowList'
const followIndURL = 'http://127.0.0.1:5000/cont/'+currUserId+'/indFollowList'
const preferJobURL = 'http://127.0.0.1:5000/cont/'+currUserId+'/preferList'




const {  Header, Content, Footer} = Layout;
const companyData = [
    {
      title: 'Microsoft',
      description: 'AI Developer' 
    },
    {
      title: 'Amazon',
      description: 'UI Developer' 
    },
    {
      title: 'Google',
      description: 'DevOps' 
    },
];

const articleData = [
    {
      articleId: '1',
      title: 'Article_1',
      description: 'Description of this post, Description of this post' 
    },
    {
      articleId: '2',
      title: 'Article_2',
      description: 'Description of this post, Description of this post' 
    },
    {   
      articleId: '3',
      title: 'Video_1',
      description: 'Description of this post, Description of this post' 
    },
];



function ArticleMoreButton(props){ 
    const articleId = props.articleId 
    
    const navigate = useNavigate()
    function handleCheckArtileClick(id){
        navigate(`/ArticleDetails?currUserId=${currUserId}&articleId=${articleId}`, {replace: true})
    }

    return (
       <Button onClick={() => {handleCheckArtileClick("unfollowList")}}>Check</Button>
     )
   }
   

const MyPage = () => {

    const [followIndData, setIndData ] = useState(0);
    const [followOrgData, setOrgData ] = useState(0);
    //const [preferJobData, setJobData ] = useState(0);

    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        }

        const getFollowOrgData = async (followOrgURL) => {
            fetch(followOrgURL, requestOptions)
            .then(res =>  res.json())
            .then(json =>{
                setOrgData(json)                             
            }) 
        }

        const getFollowIndData = async (followIndURL) => {
            fetch(followIndURL, requestOptions)
            .then(res =>  res.json())
            .then(json =>{
                setIndData(json)                             
            }) 
        }

        // const getPreferJobData = async (preferJobURL) => {
        //     fetch(preferJobURL, requestOptions)
        //     .then(res =>  res.json())
        //     .then(json =>{
        //         setJobData(json)                             // 接到数据后按格式调整data.ind_follow
        //     }) 
        // }

        getFollowOrgData(followOrgURL);
        getFollowIndData(followIndURL);
        // getPreferJobData(preferJobURL);
    },[])
    
    
    const preferJobList = followOrgData.org_follow  
    const followOrgList = followOrgData.org_follow  
    const followIndList = followIndData.ind_follow    
    //const preferJobList = followIndData.ind_follow                                           
    //console.log(preferJobData)                                                                 



    return (
        <Layout>
            <Header className="myPage_header">
                <div className="user_icon">
                    <Avatar size={100} icon={<UserOutlined />} />
                </div>

                <div>
                    <span className="user_name">Micky Mouse</span>
                    <span className="user_identity">UNSW, Student, IT</span>
                </div>

                <div className="moodselect">
                    <h2 style={{color:"white"}}>Mark today's mood!</h2>
                </div>
                
                <div className="rate">
                    <Rate /> 
                </div>

                <div className="edit">
                    <Button type="dashed"> edit</Button>
                </div>

                <div className="logout">
                                <Button type="dashed"> logout</Button>
                </div> 

            </Header>

            <Content style={{ padding: '0 50px'}}>
                <Card
                    title="Followed Individuals"
                    extra={<a href='/FollowInd'>More</a>}
                    style={{
                        width: '100%',
                        textAlign: 'left',
                    }}
                    type="inner"
                >
                    <List
                        itemLayout="horizontal"
                        //dataSource={companyData}
                        dataSource={followIndList}
                        
                        renderItem={(item) => (
                        <List.Item>
                            <List.Item.Meta
                            avatar={<Avatar size={50} icon={<UserOutlined />} />}
                            title={<a href="@">{item.IndividualName}</a>}             // 把这个替换成对应的属性
                            description={item.Occupation}
                            />
                            <div><Button>check</Button></div>
                        </List.Item>
                        
                        )}
                    />
                    
                </Card>
                
                <Card
                    title="Followed Organisations"
                    extra={<a href='/FollowOrg'>More</a>}
                    style={{
                        width: '100%',
                        textAlign: 'left',
                    }}
                    type="inner"
                >
                    <List
                        itemLayout="horizontal"
                        dataSource={followOrgList}
                        
                        renderItem={(item) => (
                        <List.Item>
                            <List.Item.Meta
                            avatar={<Avatar size={50} icon={<UserOutlined />} />}
                            // title={<a href="@">{item.title}</a>}
                            title={<a href="@">{item.OrganizationName}</a>}             // 把这个替换成对应的属性
                            description={item.Description}
                            />
                            <div><Button>check</Button></div>
                        </List.Item>
                        
                        )}
                    />
                    
                </Card>

                <Card
                    title="Job Preference"
                    extra={<a href="./MyPage/JobPreference">More</a>}
                    style={{
                        width: '100%',
                        textAlign: 'left',
                    }}
                    type="inner"
                >
                    <List
                        itemLayout="horizontal"
                        //dataSource={companyData}
                        dataSource={preferJobList}
                        
                        renderItem={(item) => (
                        <List.Item>
                            <List.Item.Meta
                            avatar={<Avatar size={50} icon={<UserOutlined />} />}
                            // title={<a href="@">{item.title}</a>}
                            title={<a href="@">{item.OrganizationName}</a>}             // 把这个替换成对应的属性
                            description={item.Description}
                            />
                            <div><Button>check</Button></div>
                        </List.Item>
                        
                        )}
                    />
                    
                </Card>

                <Card
                    title="Liked"
                    extra={<a href="/ArticleList">More</a>}
                    style={{
                        width: '100%',
                        textAlign: 'left',
                    }}
                    type="inner"
                >
                    <List
                        itemLayout="horizontal"
                        dataSource={articleData}
                        renderItem={(item) => (
                        <List.Item>
                            <List.Item.Meta
                            avatar={
                                <img width={80} alt="logo" 
                                    src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"/>}
                                title={<a href="@">{item.title}</a>}
                                description={item.description}
                            />
                            <Space
                                direction="horizontal"
                                size="middle"
                                style={{
                                display: 'flex',
                                }}
                            >
                                {/* <div><Button href='/ArticleDetails' onClick={() => {handleCheckArtileClick("1")}}>Check</Button></div>
                                 */}
                                 {/* <div><Button onClick={() => {handleCheckArtileClick("1")}}>Check</Button></div> */}
                                <ArticleMoreButton articleId={item.articleId} />
                            </Space>
                        </List.Item>
                        
                        )}
                    />
                    
                </Card>                  

            </Content>

            <Footer style={{ textAlign: 'center' }}>COMP9323 ©2022 T2 Created by "Github Is Savior"</Footer>
            
        </Layout>
    )
}

export default MyPage