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




function IndCheckButton(props){ 

    // get user's id want to check
    const checkUserId = props.checkUserId 
    
    // const navigate = useNavigate()
    function handleCheckIndClick(){
        window.open(`/OthersPage?checkUserId=${checkUserId}`)                 
    }

    return (
        <Button onClick={() => {handleCheckIndClick()}}>Check</Button>
        )
}

function IndividualMoreButton(){ 
    const [params] = useSearchParams()
    const checkUserId =  params.get('checkUserId')
    
    const navigate = useNavigate()
    function IndMoreButton(){
       navigate(`/FollowInd?checkUserId=${checkUserId}`, {replace: true})
    }

    return (
        <Button type="link" onClick={() => {IndMoreButton()}}>More</Button>
    )
}

function OrganizationCheckButton(props){                                            

    // get user's id want to check
    const checkUserId = props.checkUserId 
    
    // const navigate = useNavigate()
    function handleCheckIndClick(){
        window.open(`/Organization_Home?checkUserId=${checkUserId}`)                 
    }

    return (
        <Button onClick={() => {handleCheckIndClick()}}>Check</Button>
        )
}

function OrganizationMoreButton(){ 
    const [params] = useSearchParams()
    const checkUserId =  params.get('checkUserId')

    const navigate = useNavigate()
    function OrgMoreButton(){
       navigate(`/FollowOrg?checkUserId=${checkUserId}`, {replace: true})
    }

    return (
        <Button type="link" onClick={() => {OrgMoreButton()}}>More</Button>
    )
}

function JobCheckButton(props){ 
    // get job's id
    const OfferId = props.OfferId 
    
    // jump with params offer_id
    // const navigate = useNavigate()
    function handleCheckJobClick(){
        window.open(`/check?offer_id=${OfferId}`)        
    }

    return (
       <Button onClick={() => {handleCheckJobClick()}}>Check</Button>
     )
}

function JobMoreButton(){ 
    const [params] = useSearchParams()
    const checkUserId =  params.get('checkUserId')

    const navigate = useNavigate()
    function OfferMoreButton(){
       navigate(`/JobPreference?checkUserId=${checkUserId}`, {replace: true})
    }

    return (
       <Button type="link" onClick={() => {OfferMoreButton()}}>More</Button>
    )
}

function ArticleCheckButton(props){ 
    // get article's id
    const articleId = props.articleId 
    
    // jump with article's id
    // const navigate = useNavigate()
    function handleCheckArtileClick(){
        window.open(`/ArticleDetails?articleId=${articleId}`)
    }

    return (
       <Button onClick={() => {handleCheckArtileClick()}}>Check</Button>
    )
}

function ArticleMoreButton(props){ 
    // get current user's id
    const checkUserId = props.checkUserId 

    const navigate = useNavigate()
    function ArtMoreButton(id){
       navigate(`/ArticleList?checkUserId=${checkUserId}`, {replace: true})
    }

    return (
       <Button type="link" onClick={() => {ArtMoreButton()}}>More</Button>
    )
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

const OthersPage = () => {

    // get user's id of this checking one
    const [params] = useSearchParams()
    const checkUserId =  params.get('checkUserId')

    // get current user's id using cookies
    const currUserId = getCookie('userid')
    console.log("userid", checkUserId)

    const followOrgURL = 'http://127.0.0.1:5000/follow/'+checkUserId+'/orgFollowList'
    const followIndURL = 'http://127.0.0.1:5000/follow/'+checkUserId+'/indFollowList'
    const preferJobURL = 'http://127.0.0.1:5000/offer/get/preferoffer/'+checkUserId+''
    const preferArticleURL = 'http://127.0.0.1:5000/cont/'+checkUserId+'/preferList'
    const getUserInfo = 'http://127.0.0.1:5000/auth/brief/individual/'+checkUserId+''
    const getFollowUrl = 'http://127.0.0.1:5000/follow/'+currUserId+'/indfollowstate/'+checkUserId;        
    const postFollowUrl = 'http://127.0.0.1:5000/follow/'+currUserId+'/indFollowList'
    const deleteFollowUrl = 'http://127.0.0.1:5000/follow/'+currUserId+'/indFollowList';

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
                console.log(json)    
                setUserMoodValue(json.Mood)                   
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
    const preferArticleList = preferArticleData.art_like    
    const userInfo = userInfoData 
    
    
    console.log(userMoodValue)

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
                "Individual": [checkUserId]
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
                avatar={<Avatar size={80} icon={<Avatar src="https://joeschmoe.io/api/v1/Ind" />} />}
                </div>

                <div>
                    <span className="user_name">{userInfo.Name}</span>
                    <span className="user_identity">{userInfo.Emails}</span>
                </div>

                <div className="moodselect">
                    <h2 style={{color:"white"}}>Mark today's mood!</h2>
                </div>
                
                <div className="rate">
                    <Rate disabled value={userMoodValue} character={({ index }) => customIcons[index + 1]} count = "3" />

                </div>

                <div className="edit">
                    <Button key="1" type="primary" ghost onClick={() => {handleClick(followThisPerson)}}>{loadWord(followThisPerson.states)}  </Button>
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
                            avatar={<Avatar size={50} icon={<Avatar src="https://joeschmoe.io/api/v1/Ind" />} />}
                            title={<p>{item.IndividualName}</p>}             
                            description={item.Occupation}
                            />
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
                            avatar={<Avatar size={50} icon={<Avatar src="https://joeschmoe.io/api/v1/Org" />} />}
                            // title={<a href="@">{item.title}</a>}
                            title={<p> {item.OrganizationName}</p>}             
                            description={item.Description}
                            />
                            <OrganizationCheckButton checkUserId={item.OrganizationId}/>
                        </List.Item>
                        
                        )}
                    />
                    
                </Card>

                <Card
                    title="Preferred Jobs"
                    extra={<JobMoreButton/>}
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
                        dataSource={preferJobList}
                        
                        renderItem={(item) => (
                        <List.Item>
                            <List.Item.Meta
                            avatar={<Avatar size={50} icon={<Avatar src="https://joeschmoe.io/api/v1/Org" />} />}
                            // title={<a href="@">{item.title}</a>}
                            title={<p>{item.CompanyName}</p>}             
                            description={<Tag>{item.Requirement}</Tag>}
                            />
                            <JobCheckButton OfferId={item.OfferId} />
                        </List.Item>
                        
                        )}
                    />
                    
                </Card>

                <Card
                    title="Liked Articles"
                    extra={<ArticleMoreButton checkUserId={checkUserId}/>}
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
                                title={<p>{item.ArticleTitle}</p>}
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