import './OthersPage.scss'
import React, { useState, useEffect }  from 'react';
import { Layout, Avatar, Button, Card, Space, List, Rate, Tag} from "antd"
import { UserOutlined} from '@ant-design/icons';
import { FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';


const {  Header, Content, Footer} = Layout;

const customIcons = {
    1: <FrownOutlined />,
    2: <MehOutlined />,
    3: <SmileOutlined />,
};

    
function ArticleCheckButton(props){ 

    const articleId = props.articleId 
    const [params] = useSearchParams()
    const currUserId =  params.get('currUserId')
    
    const navigate = useNavigate()
    function handleCheckArtileClick(){
       navigate(`/ArticleDetails?currUserId=${currUserId}&articleId=${articleId}`, {replace: true})
    }

    return (
       <Button onClick={() => {handleCheckArtileClick()}}>Check</Button>
     )
}

function ArticleMoreButton(){ 
    const [params] = useSearchParams()
    const checkUserId =  params.get('checkUserId')

    const navigate = useNavigate()
    function ArtMoreButton(id){
       navigate(`/ArticleList?currUserId=${checkUserId}`, {replace: true})
    }

    return (
       <Button type="link" onClick={() => {ArtMoreButton()}}>More</Button>
    )
}

function IndCheckButton(props){ 
        const checkUserId = props.checkUserId 
        const [params] = useSearchParams()
        const currUserId =  params.get('currUserId')
        
        const navigate = useNavigate()
        function handleCheckIndClick(){
           navigate(`/OthersPage?currUserId=${currUserId}&articleId=${checkUserId}`, {replace: true})
        }
    
        return (
           <Button onClick={() => {handleCheckIndClick()}}>Check</Button>
         )
}

function IndividualMoreButton(){ 
    const [params] = useSearchParams()
    const checkUserId =  params.get('checkUserId')
    
    const navigate = useNavigate()
    function IndMoreButton(id){
       navigate(`/FollowInd?currUserId=${checkUserId}`, {replace: true})
    }

    return (
        <Button type="link" onClick={() => {IndMoreButton()}}>More</Button>
    )
}

function OrganizationMoreButton(){ 
    const [params] = useSearchParams()
    const checkUserId =  params.get('checkUserId')

    const navigate = useNavigate()
    function OrgMoreButton(id){
       navigate(`/FollowOrg?currUserId=${checkUserId}`, {replace: true})
    }

    return (
        <Button type="link" onClick={() => {OrgMoreButton()}}>More</Button>
    )
}


const OthersPage = () => {

    const [params] = useSearchParams()
    const currUserId =  params.get('currUserId')
    const checkUserId =  params.get('checkUserId')

    const followOrgURL = 'http://127.0.0.1:5000/cont/'+checkUserId+'/orgFollowList'
    const followIndURL = 'http://127.0.0.1:5000/cont/'+checkUserId+'/indFollowList'
    const preferJobURL = 'http://127.0.0.1:5000/offer/preferoffer/'+checkUserId+''
    const preferArticleURL = 'http://127.0.0.1:5000/cont/'+checkUserId+'/preferList'
    const postMoodStar = 'http://127.0.0.1:5000/mood/post'
    const getUserInfo = 'http://127.0.0.1:5000/auth/brief/individual/'+checkUserId+''
    const getFollowUrl = 'http://127.0.0.1:5000/cont/'+currUserId+'/prefer/'+checkUserId;         // 这个链接要换成follow的
    const postFollowUrl = 'http://127.0.0.1:5000/cont/'+currUserId+'/indFollowList'
    const deleteFollowUrl = 'http://127.0.0.1:5000/cont/'+currUserId+'/indFollowList';

    // state of page data
    const [followIndData, setIndData ] = useState(0);
    const [followOrgData, setOrgData ] = useState(0);
    const [preferJobData, setJobData ] = useState(0);
    const [preferArticleData, setArticleData ] = useState(0);
    const [userInfoData, setUserInfoData ] = useState(0);
    const [userMoodData, setUserMoodData] = useState(0);
    const [userMoodValue, setUserMoodValue] = useState(0);
    const [followThisPerson, setfollowThisPerson ] = useState(0);


    // generate date string for later get and post
    var currDate = new Date();
    var months = 
            [
            "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"
            ];
    var days = 
            [
            "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12",
            "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24",
            "25", "26", "27", "28", "29", "30", "31"
            ];
    var currTimeString = currDate.getFullYear()+'-'+months[currDate.getMonth()]+'-'+days[currDate.getDay()]
    //console.log()

    currTimeString = '2022-02-01'
    const getUserMood = 'http://127.0.0.1:5000/mood/search/'+currUserId+'&'+currTimeString

    // GET page data
    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        }

        const getUserInfoData = async (getUserInfo) => {
            fetch(getUserInfo, requestOptions)
            .then(res =>  res.json())
            .then(json =>{
                setUserInfoData(json)                             
            }) 
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

        const getUserMoodData = async (getUserMood) => {
            fetch(getUserMood, requestOptions)
            .then(res =>  res.json())
            .then(json =>{
                setUserMoodData(json) 
                if(userMoodData.Mood === "well"){
                    setUserMoodValue(3)
                    //console.log("well:",userMoodValue)
                }
                else if(userMoodData.Mood === "average"){
                    setUserMoodValue(2)
                    //console.log("average:",userMoodValue)
                }
                else{
                    setUserMoodValue(1)
                    //console.log("bad:",userMoodValue)
                }                         
            }) 
        }

        const getFollowData = async (getFollowUrl) => {
            fetch(getFollowUrl, requestOptions)
            .then(res =>  res.json())
            .then(json =>{
                setfollowThisPerson(json)                       
            }) 
        }


        getFollowOrgData(followOrgURL);
        getFollowIndData(followIndURL);
        getPreferJobData(preferJobURL);
        getPreferArticleData(preferArticleURL);
        getUserInfoData(getUserInfo);
        getUserMoodData(getUserMood);
        getFollowData(getFollowUrl)

    },[])


    const followIndList = followIndData.ind_follow   
    const followOrgList = followOrgData.org_follow 
    const preferJobList = preferJobData.output                                      
    const preferArticleList = preferArticleData.message    
    const userInfo = userInfoData 
    
    
    //console.log(userMood)

    function handleClick(currState){
        // console.log("currState",currState)
        if(currState.states === 0){

          //console.log("0 -> 1")
          setfollowThisPerson({states: 1})
          //console.log(likeData)

          const postOptions = {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                "indID": checkUserId
            })
          }

          const postLikeData = async (postFollowUrl) => {
              fetch(postFollowUrl, postOptions)
              .then(res =>  res.json())
              .then(json =>{
                console.log(json)                   
              }) 
          }
    
          postLikeData(postFollowUrl);
        }

        else if(currState.states === 1){
          //console.log("1 -> 0")
          setfollowThisPerson({states: 0})
          //console.log(likeData)

          const deleteOptions = {
              method: 'DELETE',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                "indID": checkUserId
            })
          }

        const deleteLikeData = async (deleteFollowUrl) => {
            fetch(deleteFollowUrl, deleteOptions)
            .then(res =>  res.json())
            .then(json =>{
              console.log(json)                   
            }) 
        }
  
        deleteLikeData(deleteFollowUrl);
        }

        else if(currState.states === 2){
          //console.log("keep 2")
          //console.log(likeData)
        }
    }

    const loadWord = (follow) => {
      if(follow === 0){
        return <div>Like</div>
      }
      else if(follow === 1){
        return <div>Unlike</div>
      }
      else if(follow === 2){
        return <div>You can't follow this user</div>
      }
    }
    
    return (
        <Layout>
            <Header className="myPage_header">
                <div className="user_icon">
                    <Avatar size={100} icon={<Avatar src="https://joeschmoe.io/api/v1/random" />} />
                </div>

                <div>
                    <span className="user_name">{userInfo.IndividualName}</span>
                    <span className="user_identity">{userInfo.Emails}</span>
                </div>

                <div className="moodselect">
                    <h2 style={{color:"white"}}>Mark today's mood!</h2>
                </div>
                
                <div className="rate">
                    <Rate disabled defaultValue={userMoodValue} count = "3" />

                </div>

                <div className="edit">
                    {/* <Button type="dashed"> follow</Button> */}
                    <Button key="1" onClick={() => {handleClick(followThisPerson)}}>{loadWord(followThisPerson.states)}  </Button>
                </div>

                <div className="logout">
                                <Button type="dashed"> logout</Button>
                </div> 

            </Header>

            <Content style={{ padding: '0 50px'}}>
                <Card
                    title="Followed Individuals"
                    extra={<IndividualMoreButton/>}
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
                            {/* <div><Button>check</Button></div> */}
                            <IndCheckButton checkUserId={item.IndividualId} />
                        </List.Item>
                        
                        )}
                    />
                    
                </Card>
                
                <Card
                    title="Followed Organisations"
                    extra = {<OrganizationMoreButton/>}
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
                    extra={<ArticleMoreButton/>}
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
                        <List.Item
                            key={item.ArticleID}
                            >
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
                                <ArticleCheckButton articleId={item.ArticleID} />
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

export default OthersPage