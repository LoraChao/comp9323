import './ArticleList.scss'
import { Layout, Card, List, Button, Space, Tag} from "antd"
import { Footer, Content, Header } from "antd/lib/layout/layout";
import React, { useState, useEffect }  from 'react';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const articlePic = "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
//const currUserId = '1'

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
    // get article's id
    const articleId = props.articleId 

    // jump with params: article's id
    const navigate = useNavigate()
    function handleCheckArtileClick(){
       navigate(`/ArticleDetails?articleId=${articleId}`, {replace: true})
    }

    return (
       <Button onClick={() => {handleCheckArtileClick()}}>Check</Button>
     )
}

const ArticleList = () => {

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


    // apis
    const articleListURL = 'http://127.0.0.1:5000/cont/'+currUserId+'/preferList'

    const [data, setData ] = useState(0);


    // GET liked article's list
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

};



export default ArticleList