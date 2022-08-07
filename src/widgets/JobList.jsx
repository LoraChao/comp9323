import React,{PureComponent} from 'react';
import Image1 from "../assets/pexels-photo-10282820.jpg";


class ImageCard extends PureComponent{

  getOfferData() {
  let url = "http://127.0.0.1:5000/offer/search/brief/1";
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
  if(this.state.flag === true){
  this.getOfferData()
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
                  <button className="rounded bg-black text-base text-white py-2 px-4">
                    Edit
                  </button>
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