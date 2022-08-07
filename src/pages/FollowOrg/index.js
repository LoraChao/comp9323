import './FollowOrg.scss'
import { Layout, Card, List, Button, Space, Avatar} from "antd"
import { Footer, Content, Header } from "antd/lib/layout/layout";
import React, { useState, useEffect }  from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { display } from '@mui/system';
import { DisabledByDefault } from '@mui/icons-material';
      

global.unfollowList = []

// org follow switch
class FollowButton extends React.Component{    

    state = {
        follow: 1
    }
    
    // click back handler
    handleClick = () =>{ 
        const currUserId = this.props.currUserId
        const checkUserId = this.props.checkUserId
        const targetUserId = this.props.targetUserId
        const deleteOrgFollowListURL = 'http://127.0.0.1:5000/follow/'+currUserId+'/orgFollowList'
        const addOrgFollowListURL = 'http://127.0.0.1:5000/follow/'+currUserId+'/orgFollowList'     // For testing: Post new follow request 


        this.setState({
            follow: (this.state.follow + 1)%2
        })

        if(this.state.follow === 1){
            const requestOptions = {                                                        //  send DELETE request
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    "Company": [targetUserId]
                })
            };
    
            fetch(deleteOrgFollowListURL, requestOptions)
            .then(res =>  res.json())
            .then(data => {
                console.log(data)
            });
            console.log("delete")
        }
        else if(this.state.follow === 0){
            const postOptions = {                                                       
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    "orgID": targetUserId
                })
            };

            fetch(addOrgFollowListURL, postOptions)
            .then(res =>  res.json())
            .then(data => {
                console.log("add:",data)
            });
            console.log("add")
        }
        else if(this.state.follow === 2){                 // for organization users ... not sure, just leave it in case..
            
        }

    }

    render(){
        return <div>
            <Button disabled={false||(this.props.currUserId != this.props.checkUserId)} onClick={() => {this.handleClick(this.props.id)}}> 
                {this.state.follow === 1 ? 'unfollow' : 'follow'}
            </Button>
        </div>
        
    }
}

function OrganizationCheckButton(props){                                            

    // get user's id want to check
    const checkUserId = props.checkUserId 
    
    // const navigate = useNavigate()
    function handleCheckIndClick(){
        window.open(`/Organization_Home?checkUserId=${checkUserId}`, {replace: true})                 
    }

    return (
        <Button onClick={() => {handleCheckIndClick()}}>Check</Button>
        )
}

function BackButton(){ 
        
    const navigate = useNavigate()

    const handleBackClick = () => {


        //Jump back to myPage
        navigate('/MyPage', {replace: true})
    }
    return (
       <Button type="link" onClick={() => {handleBackClick()}}>Back</Button>
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

    // get user's id for checking
    const [params] = useSearchParams()
    const checkUserId =  params.get('checkUserId')

    const orgFollowListURL = 'http://127.0.0.1:5000/follow/'+checkUserId+'/orgFollowList'              


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
                            avatar={<Avatar size={50} icon={<Avatar src="https://joeschmoe.io/api/v1/Org" />} />}
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
                                <OrganizationCheckButton checkUserId={item.OrganizationId}/>
                                <FollowButton targetUserId={item.OrganizationId} currUserId ={currUserId} checkUserId={checkUserId}/>
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