import './FollowOrg.scss'
import { Layout, Card, List, Button, Space, Tag} from "antd"
import { Footer, Content, Header } from "antd/lib/layout/layout";
import React, { useState, useEffect }  from 'react';
const orgFollowListURL = 'http://127.0.0.1:5000/cont/1/orgFollowList'                    // 链接这个id怎么处理？
const deleteOrgFollowListURL = 'http://127.0.0.1:5000/cont/1/orgFollowList'



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
    //console.log(orgFollowList)
    //console.log(data)

    const handleBackClick = (deleteList) =>{ 
        
        // send delete request
        const requestOptions = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            //headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: JSON.stringify({
                "Company": [
                    0
                  ],
            })
            //body: {"title": 1}
        };

        fetch(deleteOrgFollowListURL, requestOptions)
        .then(res =>  res.json())
        .then(data => {
            console.log(data)
        });
    }

    return(
        <Layout>
                <Header></Header>

                <Content style={{ 
                    padding: '0 50px',
                    textAlign: 'left',
                }}>
                <Card
                    title="Follow Organizations"
                    extra={<a onClick={() => {handleBackClick("unfollowList")}}>Back</a>}
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
                                {/* {FollowButton(item.OrganizationId)} */}
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