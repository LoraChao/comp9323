import './ArticleDetails.scss'
import { Button, PageHeader, Tag } from 'antd';
import React, { useState, useEffect }  from 'react';
import { Footer, Content } from "antd/lib/layout/layout";
import { useSearchParams } from 'react-router-dom';

global.like = 10
// test data
// const articleData = [                
//     {
//       ArticleName: 'Article_1',
//       ArticleIcon: "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png",
//       tag: 'tag of this article',
//       ArticleID: 1,
//       AuthorIcon: "https://avatars1.githubusercontent.com/u/8186664?s=460&v=4"
//     },
// ];





// function handleClick(state){ 

//     // console.log(state)
//     if(state === 1){
//       global.like = 0
//     }
//     else if(state === 0){
//       global.like = 1
//     }
//     console.log(global.like)
    
// }

// function LikeButton(props){ 
//   var temp = 0;
//   console.log(props.like)
//   // if(props.like === 1){
//   //   console.log("this is 1")
//   //   global.temp = 1
//   // }
//   // else if(props.like === 0){
//   //   console.log("this is 0")
//   //   global.temp = 0
//   // }
//   // else if(props.like === 2){
//   //   console.log("this is 2")
//   //   global.temp = 2
//   // }
//   console.temp("temp", global.temp)
//   const[like, setLike] = useState(temp)
//   console.log("like",like)
//   const handleClick = () =>{ 
    
//     setLike((like+1)%2)
//     console.log(like)
    
//   }

//   const loadWord = (like) => {
//     if(like === 0){
//       return <div>Like</div>
//     }
//     else if(like === 1){
//       return <div>Unlike</div>
//     }
//     else if(like === 2){
//       return <div>You can't like this article</div>
//     }
    

//     //return isLoading && (<div>loading...</div>) 
//   }

//   return (
//     <Button key="1" onClick={() => {handleClick()}}>{like === 1 ? 'unlike' : 'like'}  </Button>
//     //<Button key="1" onClick={() => {handleClick()}}>{loadWord(like)}</Button>
//    )
// }


const ArticleDetails = () => {
    

    const [params] = useSearchParams()
    const currUserId =  params.get('currUserId')
    const articleId =  params.get('articleId')
    console.log("user id: ", currUserId, " article id: ", articleId)

  
    const articleUrl = 'http://127.0.0.1:5000/article/get/'+articleId;
    const getLikeUrl = 'http://127.0.0.1:5000/cont/'+currUserId+'/prefer/'+articleId;
    const postLikeUrl = 'http://127.0.0.1:5000/cont/'+currUserId+'/preferList';
    const deleteLikeUrl = 'http://127.0.0.1:5000/cont/'+currUserId+'/preferList';
  

    const [articleData, setArticleData ] = useState(0);
    const [likeData, setLikeData ] = useState(0);
    
    
    // GET page data
    useEffect(() => {

        // const articleUrl = 'http://127.0.0.1:5000/article/get/'+articleId;
        // const getLikeUrl = 'http://127.0.0.1:5000/cont/'+currUserId+'/prefer/'+articleId;

        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        }

        const getarticleData = async (articleUrl) => {
            fetch(articleUrl, requestOptions)
            .then(res =>  res.json())
            .then(json =>{
                setArticleData(json)                       
            }) 
        }

        const getlikeData = async (getLikeUrl) => {
          fetch(getLikeUrl, requestOptions)
          .then(res =>  res.json())
          .then(json =>{
            setLikeData(json)                       
          }) 
      }
  
        getarticleData(articleUrl);
        getlikeData(getLikeUrl);

      },[])


    function handleClick(currState){
        // console.log("currState",currState)
        if(currState.states === 0){

          //console.log("0 -> 1")
          setLikeData({states: 1})
          //console.log(likeData)

          const postOptions = {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                "articleID": articleId
            })
          }

          const postLikeData = async (postLikeUrl) => {
              fetch(postLikeUrl, postOptions)
              .then(res =>  res.json())
              .then(json =>{
                console.log(json)                   
              }) 
          }
    
          postLikeData(postLikeUrl);
        }

        else if(currState.states === 1){
          //console.log("1 -> 0")
          setLikeData({states: 0})
          //console.log(likeData)

          const deleteOptions = {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                "articleID": articleId
            })
          }

        const deleteLikeData = async (deleteLikeUrl) => {
            fetch(deleteLikeUrl, deleteOptions)
            .then(res =>  res.json())
            .then(json =>{
              console.log(json)                   
            }) 
        }
  
        deleteLikeData(deleteLikeUrl);
        }
        
        else if(currState.states === 2){
          //console.log("keep 2")
          //console.log(likeData)
        }
    }

    const loadWord = (like) => {
      if(like === 0){
        return <div>Like</div>
      }
      else if(like === 1){
        return <div>Unlike</div>
      }
      else if(like === 2){
        return <div>You can't like this article</div>
      }
    }

    return(
        <PageHeader
            title={articleData.title}
            className="site-page-header"
            subTitle=" "
            tags={<Tag color="blue">{articleData.label}</Tag>}
            extra={[
              //<LikeButton key="1" like={global.temp}/>,
              <Button key="1" onClick={() => {handleClick(likeData)}}>{loadWord(likeData.states)}  </Button>

            ]}
            avatar={{
            src: "https://avatars1.githubusercontent.com/u/8186664?s=460&v=4",
            }}
        >
        
        <Content>
            <div >
                <img style={{minHeight:"10px", width:"30%"}}
                    src="https://gw.alipayobjects.com/zos/antfincdn/K%24NnlsB%26hz/pageHeader.svg"
                    alt="content"
                    />
            </div>
            <div style={{ textAlign:'left', margin:"40px 100px 0 80px", fontSize:'17px'}}> {articleData.wordContent}</div>
            {/* {wordContent} */}
        
        </Content>
        <Footer style={{ textAlign: 'center' }}>COMP9323 ©2022 T2 Created by "Github Is Savior"</Footer>
        </PageHeader>
    )

};



export default ArticleDetails