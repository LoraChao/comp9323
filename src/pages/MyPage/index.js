import './MyPage.scss'
import React, { useState, useEffect }  from 'react';
import { Layout, Avatar, Button, Card, Space, List, Rate, Tag} from "antd"
import { UserOutlined} from '@ant-design/icons';
import { FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';


const currUserId = '1'

const followOrgURL = 'http://127.0.0.1:5000/cont/'+currUserId+'/orgFollowList'
const followIndURL = 'http://127.0.0.1:5000/cont/'+currUserId+'/indFollowList'
const preferJobURL = 'http://127.0.0.1:5000/offer/preferoffer/'+currUserId+''
const preferArticleURL = 'http://127.0.0.1:5000/cont/'+currUserId+'/preferList'
const postMoodStar = 'http://127.0.0.1:5000/mood/post'




const {  Header, Content, Footer} = Layout;

const customIcons = {
    1: <FrownOutlined />,
    2: <MehOutlined />,
    3: <SmileOutlined />,
};

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

// const c = [
//       {
//         "ArticleID": 1,
//         "ArticleTitle": "t1",
//         "Author": "a",
//         "Article": "asd",
//         "ArticleLikeNum": 1,
//         "ArticleTag": "Mental",
//         "Icon": ""
//       },
//       {
//         "ArticleID": 2,
//         "ArticleTitle": "t2",
//         "Author": "b",
//         "Article": "fdgsdfgdf",
//         "ArticleLikeNum": 2,
//         "ArticleTag": "Medicle",
//         "Icon": ""
//       }
// ]


  

const userInfo = {
    name: "Micky Mouse",
    description: "unsw, it, student",
    icon: <UserOutlined />,
    mood: "average",
}
    

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

function RateStar(){
    
    // get storage mood state
    var initialMood;
    if(userInfo.mood === "well"){
        initialMood = 3
    }
    else if(userInfo.mood === "average"){
        initialMood = 2
    }
    else{
        initialMood = 1
    }
    const [value, setValue] = useState(initialMood);

    // set new mood state
    useEffect(() => {
        var mood = ''
        var date = new Date();
        if (value === 1)
            {
                mood = 'bad'
            }
            else if (value === 2)
            {
                mood = 'average'
            }
            else
            {
                mood = 'well'
            }

        const requestOptions = {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                            "IndividualId": currUserId,
                            "RecordTime": date,
                            "Mood": mood
                    })
                };

        const postMoodRate = async (postMoodStar) => {
            fetch(postMoodStar, requestOptions)
                    .then(res =>  res.json())
                    .then(data => {
                        console.log(data)
                    });
        }

        postMoodRate(postMoodStar);
    },[value])


    return (
       <Rate defaultValue={initialMood} count = "3" character={({ index }) => customIcons[index + 1]}  onChange={setValue} value={value}  />

     );
}
   

const MyPage = () => {

    // state of page data
    const [followIndData, setIndData ] = useState(0);
    const [followOrgData, setOrgData ] = useState(0);
    const [preferJobData, setJobData ] = useState(0);
    const [preferArticleData, setArticleData ] = useState(0);


    // GET page data
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

        const getPreferJobData = async (preferJobURL) => {
            fetch(preferJobURL, requestOptions)
            .then(res =>  res.json())
            .then(json =>{
                setJobData(json)                                     
            }) 
        }

        const getPreferArticleData = async (preferArticleURL) => {
            fetch(preferArticleURL, requestOptions)
            .then(res =>  res.json())
            .then(json =>{
                setArticleData(json)                            
            }) 
        }


        getFollowOrgData(followOrgURL);
        getFollowIndData(followIndURL);
        getPreferJobData(preferJobURL);
        getPreferArticleData(preferArticleURL);
    },[])

    

    const followIndList = followIndData.ind_follow   
    const followOrgList = followOrgData.org_follow 
    const preferJobList = preferJobData.output                                      
    const preferArticleList = preferArticleData.message          
    
    console.log(preferArticleList)
                                                        


    return (
        <Layout>
            <Header className="myPage_header">
                <div className="user_icon">
                    <Avatar size={100} icon={userInfo.icon} />
                </div>

                <div>
                    <span className="user_name">{userInfo.name}</span>
                    <span className="user_identity">{userInfo.description}</span>
                </div>

                <div className="moodselect">
                    <h2 style={{color:"white"}}>Mark today's mood!</h2>
                </div>
                
                <div className="rate">
                    {/* <Rate onClick={() => {handleRateClick("1")}}/>  */}
                    <RateStar/>
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
                        pagination={{
                            onChange: (page) => {
                              console.log(page);
                            },
                            pageSize: 3,
                          }}
                        //dataSource={companyData}
                        dataSource={followIndList}
                        
                        renderItem={(item) => (
                        <List.Item>
                            <List.Item.Meta
                            avatar={<Avatar size={50} icon={<Avatar src="https://joeschmoe.io/api/v1/random" />} />}
                            title={<a href="@">{item.IndividualName}</a>}             
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
                        pagination={{
                            onChange: (page) => {
                              console.log(page);
                            },
                            pageSize: 3,
                          }}
                        dataSource={followOrgList}
                        renderItem={(item) => (
                        <List.Item>
                            <List.Item.Meta
                            avatar={<Avatar size={50} icon={<UserOutlined />} />}
                            // title={<a href="@">{item.title}</a>}
                            title={<a href="@">{item.OrganizationName}</a>}             
                            description={item.Description}
                            />
                            <div><Button>check</Button></div>
                        </List.Item>
                        
                        )}
                    />
                    
                </Card>

                <Card
                    title="Preferred Jobs"
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
                        pagination={{
                            onChange: (page) => {
                              console.log(page);
                            },
                            pageSize: 3,
                          }}
                        dataSource={preferJobList}
                        
                        renderItem={(item) => (
                        <List.Item>
                            <List.Item.Meta
                            avatar={<Avatar size={50} icon={<UserOutlined />} />}
                            // title={<a href="@">{item.title}</a>}
                            title={<a href="@">{item.CompanyName}</a>}             
                            description={<Tag>{item.Requirement}</Tag>}
                            />
                            <div><Button>check</Button></div>
                        </List.Item>
                        
                        )}
                    />
                    
                </Card>

                <Card
                    title="Liked Articles"
                    extra={<a href="/ArticleList">More</a>}
                    style={{
                        width: '100%',
                        textAlign: 'left',
                    }}
                    type="inner"
                >
                    <List
                        itemLayout="horizontal"
                        //dataSource={preferArticleSlicedData}
                        pagination={{
                            onChange: (page) => {
                              console.log(page);
                            },
                            pageSize: 3,
                          }}
                        dataSource={preferArticleList}
                        renderItem={(item) => (
                        <List.Item>
                            <List.Item.Meta
                            avatar={
                                <img width={80} alt="logo" 
                                    src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"/>}
                                title={<a href="@">{item.ArticleTitle}</a>}
                                description={<Tag>{item.ArticleTag}</Tag>}
                            />
                            <Space
                                direction="horizontal"
                                size="middle"
                                style={{
                                display: 'flex',
                                }}
                            >
                                <ArticleMoreButton articleId={item.ArticleID} />
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