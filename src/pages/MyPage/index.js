import './MyPage.scss'
import React, { useState, useEffect }  from 'react';
import { Layout, Avatar, Button, Card, Space, List, Rate, Tag} from "antd"
import { UserOutlined} from '@ant-design/icons';
import { FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';



const {  Header, Content, Footer} = Layout;

const customIcons = {
    1: <FrownOutlined />,
    2: <MehOutlined />,
    3: <SmileOutlined />,
};

//  test data
// const companyData = [
//     {
//       title: 'Microsoft',
//       description: 'AI Developer' 
//     },
//     {
//       title: 'Amazon',
//       description: 'UI Developer' 
//     },
//     {
//       title: 'Google',
//       description: 'DevOps' 
//     },
// ];

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

// const userInfo = {
//     name: "Micky Mouse",
//     description: "unsw, it, student",
//     icon: <UserOutlined />,
//     mood: "average",
// }
    

function ArticleCheckButton(props){ 
    // get article's id
    const articleId = props.articleId 
    
    // jump with article's id
    const navigate = useNavigate()
    function handleCheckArtileClick(){
        navigate(`/ArticleDetails?articleId=${articleId}`, {replace: true})
    }

    return (
       <Button onClick={() => {handleCheckArtileClick()}}>Check</Button>
    )
}

function JobCheckButton(props){ 
    // get job's id
    const OfferId = props.OfferId 
    
    // jump with params: 'job's id'
    const navigate = useNavigate()
    function handleCheckJobClick(){
        navigate(`/check?offer_id=${OfferId}`, {replace: true})        
    }

    return (
       <Button onClick={() => {handleCheckJobClick()}}>Check</Button>
     )
}

function ArticleMoreButton(){ 
    
    // jump without params
    const navigate = useNavigate()
    function ArtMoreButton(){
       navigate('/ArticleList', {replace: true})
    }

    return (
       <Button type="link" onClick={() => {ArtMoreButton()}}>More</Button>
    )
}

function JobMoreButton(){ 

    // jump without params
    const navigate = useNavigate()
    function OfferMoreButton(){
       navigate('/JobPreference', {replace: true})
    }

    return (
       <Button type="link" onClick={() => {OfferMoreButton()}}>More</Button>
    )
}

function IndCheckButton(props){ 
    // get target person's id
    const checkUserId = props.checkUserId 

    // jump with params: target user's id
    const navigate = useNavigate()
    function handleCheckIndClick(){
        navigate(`/OthersPage?checkUserId=${checkUserId}`, {replace: true})
    }

    return (
        <Button onClick={() => {handleCheckIndClick()}}>Check</Button>
        )
}

function IndividualMoreButton(){ 

    // jump without params
    const navigate = useNavigate()
    function IndMoreButton(){
       navigate('/FollowInd', {replace: true})
    }

    return (
        <Button type="link" onClick={() => {IndMoreButton()}}>More</Button>
    )
}

function OrganizationMoreButton(){ 

    // jump without params
    const navigate = useNavigate()
    function OrgMoreButton(id){
       navigate('/FollowOrg', {replace: true})
    }

    return (
        <Button type="link" onClick={() => {OrgMoreButton()}}>More</Button>
    )
}

function LogoutButton(){
    // jump without params
    const navigate = useNavigate()
    function LogoutButton(id){
        document.cookie = "islogin=; userid = ; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        navigate('/login', {replace: true})
    }

    return (
        <Button onClick={() => {LogoutButton()}}>Logout</Button>
    )
}

function ConfirmChangeMood(props){
    const moodValue = props.mood
    const currTimeString = props.currTimeString
    const currUserId = props.currUserId
    const postMoodStar = 'http://127.0.0.1:5000/mood/post'

    // when click confirm mood change
    function handleMoodChangeClick(){
        console.log("mood",moodValue,"time",currTimeString, "id",currUserId)

        // post mood change
        const requestOptions = {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                            "IndividualId": currUserId,
                            "RecordTime": currTimeString,
                            "Mood": moodValue
                    })
                };

        const postMoodRate = async (postMoodStar) => {
            fetch(postMoodStar, requestOptions)
                    .then(res =>  res.json())
                    .then(data => {
                        console.log(data)
                    });
        }

        postMoodRate(postMoodStar)
        //console.log("post")
        
    }
    return(
        <Button type="primary" onClick={handleMoodChangeClick}>confirm</Button>
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


   

const MyPage = () => {

    // state of page data
    const [followIndData, setIndData ] = useState(0);
    const [followOrgData, setOrgData ] = useState(0);
    const [preferJobData, setJobData ] = useState(0);
    const [preferArticleData, setArticleData ] = useState(0);
    const [userInfoData, setUserInfoData ] = useState(0);
    const [userMoodData, setUserMoodData] = useState(0);
    const [userMoodValue, setUserMoodValue] = useState(0);

    // get current user's id using cookies
    const currUserId = getCookie('userid')
    console.log("userid", currUserId)

    // apis, thanks for your effort, backend guys, if you could see me here lol ;-)
    const followOrgURL = 'http://127.0.0.1:5000/follow/'+currUserId+'/orgFollowList'
    const followIndURL = 'http://127.0.0.1:5000/follow/'+currUserId+'/indFollowList'
    const preferJobURL = 'http://127.0.0.1:5000/offer/get/preferoffer/'+currUserId+''
    const preferArticleURL = 'http://127.0.0.1:5000/cont/'+currUserId+'/preferList'
    const getUserInfo = 'http://127.0.0.1:5000/auth/brief/individual/'+currUserId+''

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


        getFollowOrgData(followOrgURL);
        getFollowIndData(followIndURL);
        getPreferJobData(preferJobURL);
        getPreferArticleData(preferArticleURL);
        getUserInfoData(getUserInfo);
        getUserMoodData(getUserMood);

    },[])


    const followIndList = followIndData.ind_follow   
    const followOrgList = followOrgData.org_follow 
    const preferJobList = preferJobData.output                                      
    const preferArticleList = preferArticleData.message    
    const userInfo = userInfoData 
    
    
    console.log("get mood",userMoodValue)

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
                    <Rate value={userMoodValue} character={({ index }) => customIcons[index + 1]} onChange={setUserMoodValue} count = "3" />; 
                </div>

                <div className="saveMood">
                    <ConfirmChangeMood mood={userMoodValue} currTimeString = {currTimeString} currUserId = {currUserId}/>
                </div>

                <div className="edit">
                    <Button type="dashed"> edit</Button>
                </div>

                <div className="logout">
                    <LogoutButton/>

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
                    // extra={<a href="./MyPage/JobPreference">More</a>}
                    extra={<JobMoreButton/>}
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
                            <JobCheckButton OfferId={item.OfferId} />
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

export default MyPage