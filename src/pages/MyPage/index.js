import './MyPage.scss'
import React, { useState, useEffect }  from 'react';
import { Layout, Avatar, Button, Card, Space, List, Rate, Tag} from "antd"
import { UserOutlined} from '@ant-design/icons';
import { FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';


const currUserId = '2'

const followOrgURL = 'http://127.0.0.1:5000/cont/'+currUserId+'/orgFollowList'
const followIndURL = 'http://127.0.0.1:5000/cont/'+currUserId+'/indFollowList'
const preferJobURL = 'http://127.0.0.1:5000/offer/preferoffer/'+currUserId+''
const preferArticleURL = 'http://127.0.0.1:5000/cont/'+currUserId+'/preferList'
const postMoodStar = 'http://127.0.0.1:5000/mood/post'
const getUserInfo = 'http://127.0.0.1:5000/auth/brief/individual/'+currUserId+''


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
    const articleId = props.articleId 
    
    const navigate = useNavigate()
    function handleCheckArtileClick(id){
       navigate(`/ArticleDetails?currUserId=${currUserId}&articleId=${articleId}`, {replace: true})
    }

    return (
       <Button onClick={() => {handleCheckArtileClick("unfollowList")}}>Check</Button>
     )
}

function JobCheckButton(props){ 
    const OfferId = props.OfferId 
    
    const navigate = useNavigate()
    function handleCheckJobClick(){
       navigate(`/check?currUserId=${currUserId}&offer_id=${OfferId}`, {replace: true})        
    }

    return (
       <Button onClick={() => {handleCheckJobClick()}}>Check</Button>
     )
}

function ArticleMoreButton(){ 
    
    const navigate = useNavigate()
    function ArtMoreButton(id){
       navigate(`/ArticleList?currUserId=${currUserId}`, {replace: true})
    }

    return (
       <Button type="link" onClick={() => {ArtMoreButton()}}>More</Button>
    )
}

function JobMoreButton(){ 
    
    const navigate = useNavigate()
    function OfferMoreButton(id){
       navigate(`/JobPreference?currUserId=${currUserId}`, {replace: true})
    }

    return (
       <Button type="link" onClick={() => {OfferMoreButton()}}>More</Button>
    )
}

function IndCheckButton(props){ 
        const checkUserId = props.checkUserId 
        
        const navigate = useNavigate()
        function handleCheckIndClick(){
           navigate(`/OthersPage?currUserId=${currUserId}&checkUserId=${checkUserId}`, {replace: true})
        }
    
        return (
           <Button onClick={() => {handleCheckIndClick()}}>Check</Button>
         )
}

function IndividualMoreButton(){ 
    
    const navigate = useNavigate()
    function IndMoreButton(id){
       navigate(`/FollowInd?currUserId=${currUserId}`, {replace: true})
    }

    return (
        <Button type="link" onClick={() => {IndMoreButton()}}>More</Button>
    )
}

function OrganizationMoreButton(){ 
    
    const navigate = useNavigate()
    function OrgMoreButton(id){
       navigate(`/FollowOrg?currUserId=${currUserId}`, {replace: true})
    }

    return (
        <Button type="link" onClick={() => {OrgMoreButton()}}>More</Button>
    )
}


// function RateStar(){
    
//     // get storage mood state
//     var initialMood;
//     if(userInfo.Mood === "well"){
//         initialMood = 3
//     }
//     else if(userInfo.Mood === "average"){
//         initialMood = 2
//     }
//     else{
//         initialMood = 1
//     }
//     const [value, setValue] = useState(initialMood);

//     // set new mood state
//     useEffect(() => {
//         var mood = ''
//         var date = new Date();
//         if (value === 1)
//             {
//                 mood = 'bad'
//             }
//             else if (value === 2)
//             {
//                 mood = 'average'
//             }
//             else
//             {
//                 mood = 'well'
//             }

//         const requestOptions = {
//                     method: 'POST',
//                     headers: {'Content-Type': 'application/json'},
//                     body: JSON.stringify({
//                             "IndividualId": currUserId,
//                             "RecordTime": date,
//                             "Mood": mood
//                     })
//                 };

//         const postMoodRate = async (postMoodStar) => {
//             fetch(postMoodStar, requestOptions)
//                     .then(res =>  res.json())
//                     .then(data => {
//                         console.log(data)
//                     });
//         }

//         postMoodRate(postMoodStar);
//     },[value])


//     return (
//        <Rate defaultValue={initialMood} count = "3" character={({ index }) => customIcons[index + 1]}  onChange={setValue} value={value}  />

//      );
// }
   

const MyPage = () => {

    // state of page data
    const [followIndData, setIndData ] = useState(0);
    const [followOrgData, setOrgData ] = useState(0);
    const [preferJobData, setJobData ] = useState(0);
    const [preferArticleData, setArticleData ] = useState(0);
    const [userInfoData, setUserInfoData ] = useState(0);
    const [userMoodData, setUserMoodData] = useState(0);
    const [userMoodValue, setUserMoodValue] = useState(0);


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


        getFollowOrgData(followOrgURL);
        getFollowIndData(followIndURL);
        getPreferJobData(preferJobURL);
        getPreferArticleData(preferArticleURL);
        getUserInfoData(getUserInfo);
        getUserMoodData(getUserMood);

    },[])

    // POST new mood state
    useEffect(() => {
        var moodString = ''
        if (userMoodValue === 1)
            {
                moodString = 'bad'
            }
            else if (userMoodValue === 2)
            {
                moodString = 'average'
            }
            else
            {
                moodString = 'well'
            }

        const requestOptions = {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                            "IndividualId": currUserId,
                            "RecordTime": currTimeString,
                            "Mood": moodString
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
    },[userMoodValue])

    const followIndList = followIndData.ind_follow   
    const followOrgList = followOrgData.org_follow 
    const preferJobList = preferJobData.output                                      
    const preferArticleList = preferArticleData.message    
    const userInfo = userInfoData 
    
    
    //console.log(userMood)

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
                    {/* <Rate onClick={() => {handleRateClick("1")}}/>  */}
                    {/* <RateStar/> */}
                    <Rate defaultValue={userMoodValue} count = "3" character={({ index }) => customIcons[index + 1]}  onChange={setUserMoodValue} value={userMoodValue}  />
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
                            {/* <div><Button>check</Button></div> */}
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