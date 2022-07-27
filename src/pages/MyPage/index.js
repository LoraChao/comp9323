import './MyPage.scss'
import React from 'react';
import { Layout, Avatar, Button, Card, Space, List, Rate} from "antd"
import { UserOutlined} from '@ant-design/icons';


const {  Header, Content, Footer} = Layout;
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

const articleData = [
    {
      title: 'Article_1',
      description: 'Description of this post, Description of this post' 
    },
    {
      title: 'Article_2',
      description: 'Description of this post, Description of this post' 
    },
    {
      title: 'Video_1',
      description: 'Description of this post, Description of this post' 
    },
];


const MyPage = () => {
    return (
        <Layout>
            <Header style={{ height:'150px'}}>
                <div className="header-content">
                    <table>
                        <td style={{width:'250px', height:'150px'}}>
                            <tr>
                                <div className="user-icon">
                                    <Avatar size={100} icon={<UserOutlined />} />
                                </div>
                            </tr>
                        </td>

                        <td style={{width:'250px', height:'150px'}}> 
                            <span className="user-name">Micky Mouse</span>
                            <br/>
                            <span className="user-identity">UNSW, Student, IT</span>
                        </td>

                        <td style={{width:'220px', height:'150px'}}>
                            <tr style={{height:"30px"}}></tr>
                            <tr>
                                <h2 style={{color:"white"}}>Mark today's mood!</h2>
                            </tr>
                        </td>
                        <td style={{width:'250px', height:'150px'}}>
                            <tr style={{height:"30px"}}></tr>
                            <tr > 
                                <div className='moodselect'>
                                    <Rate /> 
                                </div>
                            </tr>
                        </td>

                        <td> 
                            <div className="edit">
                                <Button type="dashed"> edit</Button>
                            </div>
                            <div className="logout">
                                <Button type="dashed"> logout</Button>
                            </div> 
                        </td>
                    </table>
                </div>
            </Header>
            
            <Content style={{ padding: '0 50px'}}>
                <Card
                    title="Follow"
                    extra={
                        <a href='./MyPage/Follow' >More</a>
                    }
                    style={{
                        width: '100%',
                        textAlign: 'left',
                    }}
                    type="inner"
                >
                    <p>Company Users</p>
                    <Space
                        direction="horizontal"
                        size="middle"
                        style={{
                        display: 'flex',
                        }}
                    >
                        <div className="text-under-avatar">
                            <Avatar size={60} icon={<UserOutlined />} />
                            <span style={{display:"block"}}>user</span>
                        </div>
                        <div className="text-under-avatar">
                            <Avatar size={60} icon={<UserOutlined />} />
                            <span style={{display:"block"}}>user</span>
                        </div>
                        <div className="text-under-avatar">
                            <Avatar size={60} icon={<UserOutlined />} />
                            <span style={{display:"block"}}>user</span>
                        </div>
                    </Space>



                    <p>Individual Users</p>
                    <Space
                        direction="horizontal"
                        size="middle"
                        style={{
                        display: 'flex',
                        }}
                    >
                        <div className="text-under-avatar">
                            <Avatar size={60} icon={<UserOutlined />} />
                            <span style={{display:"block"}}>user</span>
                        </div>
                        <div className="text-under-avatar">
                            <Avatar size={60} icon={<UserOutlined />} />
                            <span style={{display:"block"}}>user</span>
                        </div>
                        <div className="text-under-avatar">
                            <Avatar size={60} icon={<UserOutlined />} />
                            <span style={{display:"block"}}>user</span>
                        </div>
                        <div className="text-under-avatar">
                            <Avatar size={60} icon={<UserOutlined />} />
                            <span style={{display:"block"}}>user</span>
                        </div>
                    </Space>
                </Card>

                <Card
                    title="Job Preference"
                    extra={<a href="./MyPage/JobPreference">More</a>}
                    style={{
                        width: '100%',
                        textAlign: 'left',
                    }}
                    type="inner"
                >
                    <List
                        itemLayout="horizontal"
                        dataSource={companyData}
                        renderItem={(item) => (
                        <List.Item>
                            <List.Item.Meta
                            avatar={<Avatar size={50} icon={<UserOutlined />} />}
                            title={<a href="@">{item.title}</a>}
                            description={item.description}
                            />
                            <div><Button>check</Button></div>
                        </List.Item>
                        
                        )}
                    />
                    
                </Card>

                <Card
                    title="Liked"
                    extra={<a href="./MyPage/ArticleList">More</a>}
                    style={{
                        width: '100%',
                        textAlign: 'left',
                    }}
                    type="inner"
                >
                    <List
                        itemLayout="horizontal"
                        dataSource={articleData}
                        renderItem={(item) => (
                        <List.Item>
                            <List.Item.Meta
                            avatar={
                                <img width={80} alt="logo" 
                                    src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"/>}
                                title={<a href="@">{item.title}</a>}
                                description={item.description}
                            />
                            <Space
                                direction="horizontal"
                                size="middle"
                                style={{
                                display: 'flex',
                                }}
                            >
                                <div><Button href='./ArticleDetails'>Check</Button></div>
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