import './FollowOrg.scss'
import { Layout, Card, List, Button, Space} from "antd"
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

    const deleteOrgFollowListURL = 'http://127.0.0.1:5000/follow/'+currUserId+'/orgFollowList'
    const addOrgFollowListURL = 'http://127.0.0.1:5000/follow/'+currUserId+'/orgFollowList'                 // For testing: Post new follow request 


    // click back handler
    const handleBackClick = (deleteList) =>{ 
        
        const requestOptions = {                                                        //  send DELETE request
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "Company": global.unfollowList
            })
        };

        fetch(deleteOrgFollowListURL, requestOptions)
        .then(res =>  res.json())
        .then(data => {
            console.log(data)
        });

        // Jump back to myPage
        navigate('/MyPage', {replace: true})

        // const postOptions = {                                          // For testing: send POST to add new follower 
        //     method: 'POST',
        //     headers: {'Content-Type': 'application/json'},
        //     body: JSON.stringify({
        //         "orgID": 1
        //     })
        // };

        // fetch(addOrgFollowListURL, postOptions)
        // .then(res =>  res.json())
        // .then(data => {
        //     console.log("add:",data)
        // });

        // console.log(deleteList)
    }
    return (
       <Button type="link" onClick={() => {handleBackClick("unfollowList")}}>Back</Button>
     )
}

const FollowOrg = () => {

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

    const orgFollowListURL = 'http://127.0.0.1:5000/follow/'+currUserId+'/orgFollowList'              


    // set state for storing org like list
    const [data, setData ] = useState(0);

    // for send GET request to get follow org list
    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        }

        const getData = async (orgFollowListURL) => {
            fetch(orgFollowListURL, requestOptions)
            .then(res =>  res.json())
            .then(json =>{
                setData(json)
            }) 
        }

        getData(orgFollowListURL);


    },[])
    
    const orgFollowList = data.org_follow                                           
    //console.log(data)


    return(
        <Layout>
                <Header></Header>

                <Content style={{ 
                    padding: '0 50px',
                    textAlign: 'left',
                }}>
                <Card
                    title="Followed Organizations"
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
                        dataSource={orgFollowList}                                  
                        renderItem={(item) => (
                        <List.Item>
                            <List.Item.Meta
                            avatar={
                                <img width={80} alt="logo" 
                                    src={item.ArticleIcon}/>}
                                title={<a href="@">{item.OrganizationName}</a>}
                                description={item.Description}
                            />
                            <Space
                                direction="horizontal"
                                size="middle"
                                style={{
                                display: 'flex',
                                }}
                            >
                                <div><Button href={item.ArticleLink}>Check</Button></div>
                                <FollowButton id={item.OrganizationId}/>
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



export default FollowOrg