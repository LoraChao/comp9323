import './FollowOrg.scss'
import { Layout, Card, List, Button, Space, Tag} from "antd"
import { Footer, Content, Header } from "antd/lib/layout/layout";
import React, { useState, useEffect }  from 'react';
const articleListURL = 'http://127.0.0.1:5000/cont/1/indFollowList'                    // 链接要更新


const articleListData = [                                                               // 测试数据, 获取数据后删除
    {
      ArticleName: 'Article_1',
      ArticleIcon: "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png",
      tag: 'tag of this article',
      ArticleID: 1
    },
    {
      ArticleName: 'Article_2',
      ArticleIcon: "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png",
      tag: 'tag of this article', 
      ArticleID: 2
    },
    {
      ArticleName: 'Article_3',
      ArticleIcon: "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png",
      tag: 'tag of this article',
      ArticleID: 3
    },
];



const FollowOrg = () => {
    
    const [data, setData ] = useState(0);

    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        }

        const getData = async (articleListURL) => {
            fetch(articleListURL, requestOptions)
            .then(res =>  res.json())
            .then(json =>{
                setData(json)
            }) 
        }

        getData(articleListURL);
    },[])
    
    

    const articleList = data.ind_follow                                             // 接到数据后按格式调整data.ind_follow
    //const articleList = data 
    console.log(articleList)

    return(
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
                        //dataSource={articleListData}
                        dataSource={articleList}                                  // 接到数据后将dataSource替换成这行
                        renderItem={(item) => (
                        <List.Item>
                            <List.Item.Meta
                            avatar={
                                <img width={80} alt="logo" 
                                    src={item.ArticleIcon}/>}
                                title={<a href="@">{item.IndividualName}</a>}
                                //description={item.description}
                                description={<Tag>{item.tag}</Tag>}
                            />
                            <Space
                                direction="horizontal"
                                size="middle"
                                style={{
                                display: 'flex',
                                }}
                            >
                                <div><Button href={item.ArticleLink}>Check</Button></div>
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