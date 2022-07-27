import './ArticleList.scss'
import { Layout, Card, List, Button, Space } from "antd"
import { Footer, Content, Header } from "antd/lib/layout/layout";
import React from 'react';

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

const ArticleList = () => (
    <Layout>
            <Header></Header>

            <Content style={{ 
                padding: '0 50px',
                textAlign: 'left',
            }}>
            <Card
                title="Liked"
                extra={<a href="./MyPage">Back</a>}
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

);



export default ArticleList