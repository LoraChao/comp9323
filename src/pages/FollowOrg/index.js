import './FollowOrg.scss'
import { Layout, Card, List, Button, Space} from "antd"
import { Footer, Content, Header } from "antd/lib/layout/layout";
import React, { useState, useEffect }  from 'react';

const currUserId = '1'

const orgFollowListURL = 'http://127.0.0.1:5000/cont/'+currUserId+'/orgFollowList'                    
const deleteOrgFollowListURL = 'http://127.0.0.1:5000/cont/'+currUserId+'/orgFollowList'
const  addOrgFollowListURL = "http://127.0.0.1:5000/cont/1/orgFollowList"



class FollowButton extends React.Component{    // individual follow tab

    state = {
        follow: 1
    }

    handleClick(id){
      this.setState({
        follow: (this.state.follow + 1)%2
        })
        console.log(id)

        //  TODO:  更新delete列表

    }

    render(){
        return <div>
            <Button onClick={() => {this.handleClick(this.props.id)}}> 
                {this.state.follow === 1 ? 'unfollow' : 'follow'}
            </Button>
        </div>
        
    }
}


const FollowOrg = () => {
    
    const [data, setData ] = useState(0);
    var deleteList = ''

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

    const handleBackClick = (deleteList) =>{ 
        
        // const requestOptions = {                                                         //  send delete request
        //     method: 'DELETE',
        //     headers: {'Content-Type': 'application/json'},
        //     body: JSON.stringify({
        //         "Company": [
        //             1
        //           ],
        //     })
        // };

        // fetch(deleteOrgFollowListURL, requestOptions)
        // .then(res =>  res.json())
        // .then(data => {
        //     console.log(data)
        // });

        const postOptions = {                                                               // post新follow
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "orgID": 1
            })
        };

        fetch(addOrgFollowListURL, postOptions)
        .then(res =>  res.json())
        .then(data => {
            console.log("add:",data)
        });

        //console.log(deleteList)
    }

    return(
        <Layout>
                <Header></Header>

                <Content style={{ 
                    padding: '0 50px',
                    textAlign: 'left',
                }}>
                <Card
                    title="Followed Organizations"
                    extra={<a onClick={() => {handleBackClick(deleteList)}}>Back</a>}
                    //href="./MyPage" 
                    style={{
                        width: '100%',
                        textAlign: 'left',
                    }}
                    type="inner"
                >
                    <List
                        itemLayout="horizontal"
                        dataSource={orgFollowList}                                  
                        renderItem={(item) => (
                        <List.Item>
                            <List.Item.Meta
                            avatar={
                                <img width={80} alt="logo" 
                                    src={item.ArticleIcon}/>}
                                title={<a href="@">{item.OrganizationName}</a>}
                                description={item.Description}
                                //description={<Tag>{item.tag}</Tag>}
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