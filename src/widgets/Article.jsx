import React,{PureComponent} from 'react';
import SectionHeading from "./SectionHeading";
import {Button} from "antd";

function ArticleCheckButton(props){ 
  // get article's id
  const articleId = props.articleId 
  
  // jump with article's id
  // const navigate = useNavigate()
  function handleCheckArtileClick(){
      window.open(`/ArticleDetails?articleId=${articleId}`, {replace: true})
  }

  return (
     <Button onClick={() => {handleCheckArtileClick()}}>More</Button>
  )
}


class ImageCard extends PureComponent{
  getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
  }

  getOfferData(userid) {
  let url = "http://127.0.0.1:5000/cont/"+userid+"/recommandationList";
  //window.alert(url)
  fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json;charset=utf-8" },
  }).then(res => res.json()).then(
      data => {
          this.setState({company_data: data})
          this.setState({flag: false})
          // window.alert(data['output'][0]['CompanyName'])
          // return data
          var return_value = data
          //console.log(return_value)
          return return_value
      }
  )
}
constructor(props) {
  super(props)
  this.state = {
    flag: true,
    company_data:[ {"ArticleID": '',"ArticleTitle": '',"Author": '',"Article": '',"ArticleLikeNum": '',"ArticleTag": '',"Icon": '',"description": ''},
    {"ArticleID": '',"ArticleTitle": '',"Author": '',"Article": '',"ArticleLikeNum": '',"ArticleTag": '',"Icon": '',"description": ''},
    {"ArticleID": '',"ArticleTitle": '',"Author": '',"Article": '',"ArticleLikeNum": '',"ArticleTag": '',"Icon": '',"description": ''},
    {"ArticleID": '',"ArticleTitle": '',"Author": '',"Article": '',"ArticleLikeNum": '',"ArticleTag": '',"Icon": '',"description": ''},
    {"ArticleID": '',"ArticleTitle": '',"Author": '',"Article": '',"ArticleLikeNum": '',"ArticleTag": '',"Icon": '',"description": ''},
    {"ArticleID": '',"ArticleTitle": '',"Author": '',"Article": '',"ArticleLikeNum": '',"ArticleTag": '',"Icon": '',"description": ''},
    {"ArticleID": '',"ArticleTitle": '',"Author": '',"Article": '',"ArticleLikeNum": '',"ArticleTag": '',"Icon": '',"description": ''},
    {"ArticleID": '',"ArticleTitle": '',"Author": '',"Article": '',"ArticleLikeNum": '',"ArticleTag": '',"Icon": '',"description": ''},
    {"ArticleID": '',"ArticleTitle": '',"Author": '',"Article": '',"ArticleLikeNum": '',"ArticleTag": '',"Icon": '',"description": ''},
  ]}

}
render(){
  this.setState({
    UserId: this.getCookie('userid')})
  if(this.state.flag === true){
  this.getOfferData(UserId)
  }
  return (

    <div>
      <SectionHeading
        title="Maybe you are interested in these articles"
        subTitle=""
      />
      <div className="mt-14 grid grid-cols-2 md:grid-cols-3 gap-6">

        {[0,1, 2, 3, 4, 5, 6, 7, 8].map((v) => (
          <div key={v} class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
            <div class="md:flex">
              <div class="md:flex-shrink-0">
                <img class="h-48 w-full object-cover md:w-48" src='C:\Users\J33\Desktop\comp9323-main\comp9323-main\src\assets\pexels-photo-11123438.jpg' alt="np pic"></img>
              </div>
              <div class="p-8">

                <p class="block mt-1 text-lg leading-tight font-medium text-black">{this.state.company_data[v]["ArticleTitle"]}</p>
                <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{this.state.company_data[v]["Author"]}</div>
                <p class="mt-2 text-gray-500">{this.state.company_data[v]["description"]}</p>
                <ArticleCheckButton articleId={this.state.company_data[v]["ArticleID"]}/>
                <div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}}

export default ImageCard;