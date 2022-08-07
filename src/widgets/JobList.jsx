import React,{PureComponent} from 'react';
import Image1 from "../assets/pexels-photo-10282820.jpg";
import {Button} from "antd";
function JobCheckButton(props){ 
  // get article's id
  const articleId = props.articleId 
  
  // jump with article's id
  // const navigate = useNavigate()
  function handleCheckArtileClick(){
      window.open(`/ArticleDetails?offer_id=${articleId}`, {replace: true})
  }

  return (
     <Button className="ml-8 bg-gray-900 px-4 py-2 rounded text-blue-50 flex items-center" onClick={() => {handleCheckArtileClick()}}>Edit</Button>
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

  getOfferData(company_username) {
    let url = "http://127.0.0.1:5000/auth/brief/organization/"+company_username;
    this.setState({organizationid:company_username})
  //window.alert(url)
  fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json;charset=utf-8" },
  }).then(res => res.json()).then(
      data => {
          this.setState({company_data: data['output']})
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
    organizationid: "",
    company_data:[{"offerId": "","CompanyName": "","Responsibility": "","Requirement": ""},
    {"offerId": "","CompanyName": "","Responsibility": "","Requirement": ""},
    {"offerId": "","CompanyName": "","Responsibility": "","Requirement": ""},
    {"offerId": "","CompanyName": "","Responsibility": "","Requirement": ""},
    {"offerId": "","CompanyName": "","Responsibility": "","Requirement": ""},
    {"offerId": "","CompanyName": "","Responsibility": "","Requirement": ""},
    {"offerId": "","CompanyName": "","Responsibility": "","Requirement": ""},
    {"offerId": "","CompanyName": "","Responsibility": "","Requirement": ""},
    {"offerId": "","CompanyName": "","Responsibility": "","Requirement": ""},
    {"offerId": "","CompanyName": "","Responsibility": "","Requirement": ""},
    {"offerId": "","CompanyName": "","Responsibility": "","Requirement": ""},
    {"offerId": "","CompanyName": "","Responsibility": "","Requirement": ""},
  ]}

}
render(){
    var organizationid = this.getCookie('userid')
  if(this.state.flag === true){
  this.getOfferData(organizationid)
  }
  return (

    <div>

      <div className="mt-14 grid grid-cols-2 md:grid-cols-3 gap-6">

        {[0,1, 2, 3, 4, 5, 6, 7, 8,9,10,11].map((v) => (
          <div key={v} class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
            <div class="md:flex">
              <div class="md:flex-shrink-0">
                <img class="h-48 w-full object-cover md:w-48" src={Image1} alt="Man looking at item at a store"></img>
              </div>
              <div class="p-8">

                <a href="#" class="block mt-1 text-lg leading-tight font-medium text-black hover:underline">{this.state.company_data[v]["CompanyName"]}</a>
                <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{this.state.company_data[v]["Responsibility"]}</div>
                <p class="mt-2 text-gray-500">{this.state.company_data[v]["Requirement"]}</p>
                <div>
                <JobCheckButton articleId={this.state.company_data[v]["offerId"]}/>
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
