import './ArticleList.scss'
import { Layout, Card, List, Button, Space, Tag} from "antd"
import { Footer, Content, Header } from "antd/lib/layout/layout";
import React, { useState, useEffect }  from 'react';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const articlePic = "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
const currUserId = '1'

// const articleListData = [                                                               
//     {
//       ArticleName: 'Article_1',
//       ArticleIcon: "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png",
//       tag: 'tag of this article',
//       ArticleID: 1
//     },
//     {
//       ArticleName: 'Article_2',
//       ArticleIcon: "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png",
//       tag: 'tag of this article', 
//       ArticleID: 2
//     },
//     {
//       ArticleName: 'Article_3',
//       ArticleIcon: "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png",
//       tag: 'tag of this article',
//       ArticleID: 3
//     },
// ];

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

const ArticleList = () => {

    const [params] = useSearchParams()
    const currUserId =  params.get('currUserId')
    //console.log("user id: ", currUserId)

    const articleListURL = 'http://127.0.0.1:5000/cont/'+currUserId+'/preferList'

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
    
    

    const articleList = data.message                                             
    //console.log(articleList)

    return(
        <Layout>
                <Header></Header>

                <Content style={{ 
                    padding: '0 50px',
                    textAlign: 'left',
                }}>
                <Card
                    title="Liked Articles"
                    extra={<a href="./MyPage">Back</a>}
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
                        dataSource={articleList}                                  
                        renderItem={(item) => (
                        <List.Item
                            key={item.ArticleID}
                            >
                            <List.Item.Meta
                            avatar={
                                <img width={80} alt="logo" 
                                    src={articlePic}/>}
                                title={<a href="@">{item.ArticleTitle}</a>}
                                //description={item.description}
                                description={<Tag>{item.ArticleTag}</Tag>}
                            />
                            <Space
                                direction="horizontal"
                                size="middle"
                                style={{
                                display: 'flex',
                                }}
                            >
                                {/* <div><Button href={item.ArticleLink}>Check</Button></div> */}
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

};



export default ArticleList