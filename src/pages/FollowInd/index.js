import './FollowInd.scss'
import { Layout, Card, List, Button, Space, Avatar} from "antd"
import { Footer, Content, Header } from "antd/lib/layout/layout";
import React, { useState, useEffect }  from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';



global.unfollowList = []


class FollowButton extends React.Component{    // individual follow tab

    state = {
        follow: 1
    }

    handleClick(id){
      this.setState({
        follow: (this.state.follow + 1)%2
        })
        //console.log(id)

        //  renew unfollow list
        if(global.unfollowList.includes(id)){
            global.unfollowList = global.unfollowList.filter((item) => item !== id)
            //console.log("add:", global.unfollowList)
        }
        else{
            global.unfollowList.push(id)
            //console.log("add:", global.unfollowList)
        }
    }

    render(){
        return <div>
            <Button onClick={() => {this.handleClick(this.props.id)}}> 
                {this.state.follow === 1 ? 'unfollow' : 'follow'}
            </Button>
        </div>
        
    }
}

function BackButton(){ 

    // for re-navigation
    const navigate = useNavigate()

    // get cookies
    function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        console.log(document.cookie)
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }
    
    // get current user's id using cookies
    const currUserId = getCookie('userid')

    const deleteIndFollowListURL = 'http://127.0.0.1:5000/follow/'+currUserId+'/indFollowList'
    const addIndFollowListURL = 'http://127.0.0.1:5000/follow/'+currUserId+'/indFollowList'     // For testing: Post new follow request 


    // click back handler
    const handleBackClick = () =>{ 
        
        const requestOptions = {                                                        //  send DELETE request
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "Individual": global.unfollowList
            })
        };

        fetch(deleteIndFollowListURL, requestOptions)
        .then(res =>  res.json())
        .then(data => {
            console.log(data)
        });

        //Jump back to myPage
        navigate('/MyPage', {replace: true})

        // const postOptions = {                                                       // For testing: send POST to add new follower 
        //     method: 'POST',
        //     headers: {'Content-Type': 'application/json'},
        //     body: JSON.stringify({
        //         "indID": 2
        //     })
        // };

        // fetch(addIndFollowListURL, postOptions)
        // .then(res =>  res.json())
        // .then(data => {
        //     console.log("add:",data)
        // });

    }
    return (
       <Button type="link" onClick={() => {handleBackClick()}}>Back</Button>
     )
}

const FollowInd = () => {

    // get cookies
    function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        console.log(document.cookie)
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }
  
    // get current user's id using cookies
    const currUserId = getCookie('userid')

    // get user's id for checking
    const [params] = useSearchParams()
    const checkUserId =  params.get('checkUserId')

    // apis
    const indFollowListURL = 'http://127.0.0.1:5000/follow/'+checkUserId+'/indFollowList'                 
   
    const [data, setData ] = useState(0);

    // GET to get following individual users list
    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        }

        const getData = async (indFollowListURL) => {
            fetch(indFollowListURL, requestOptions)
            .then(res =>  res.json())
            .then(json =>{
                setData(json)
            }) 
        }

        getData(indFollowListURL);


    },[])
    
    const indFollowList = data.ind_follow                                           
    //console.log(data)


    return(
        <Layout>
                <Header></Header>

                <Content style={{ 
                    padding: '0 50px',
                    textAlign: 'left',
                }}>
                <Card
                    title="Followed Individuals"
                    extra={<BackButton />}
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
                            pageSize: 10,
                          }}
                        dataSource={indFollowList}                                  
                        renderItem={(item) => (
                        <List.Item>
                            <List.Item.Meta
                            avatar={<Avatar size={50} icon={<Avatar src="https://joeschmoe.io/api/v1/random" />} />}
                                title={<a href="@">{item.IndividualName}</a>}
                                description={item.Email}
                            />
                            <Space
                                direction="horizontal"
                                size="middle"
                                style={{
                                display: 'flex',
                                }}
                            >
                                <div><Button href={item.ArticleLink}>Check</Button></div>
                                <FollowButton id={item.IndividualId}/>
                            </Space>
                        </List.Item>
                        
                        )}
                    />
                        
                    </Card>   

                </Content>

                <Footer style={{ textAlign: 'center' }}>COMP9323 ©2022 T2 Created by "Github Is Savior"</Footer>
            </Layout>
    )

};



export default FollowInd