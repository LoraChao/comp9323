import React, { PureComponent } from 'react';
import Image1 from "../assets/pexels-photo-10282820.jpg";
import { Button } from "antd";

function AddNew(props) {
  const usertype = props.usertype
  function handleCheckArtileClick() {
    window.open(`/release`, { replace: true })
  }
  if( usertype === 1){

  return (
    <Button className="ml-8 bg-gray-900 px-4 py-2 rounded text-blue-50 flex items-center" onClick={() => { handleCheckArtileClick() }}>Add New Offer</Button>
  )
}
return null}

function JobCheckButton(props) {
  const offerId = props.offerId
  const usertype = offerId[1]
  function handleCheckArtileClick() {
    window.open(`/editjob?offer_id=${offerId[0]}`, { replace: true })
  }
  if( usertype === 1){
    return (
      <Button  onClick={() => { handleCheckArtileClick() }}>Edit</Button>
    )}
  return null 

}

class ImageCard extends PureComponent {
  getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  getOfferData(company_username) {
    let url = "http://127.0.0.1:5000/offer/search/brief/" + company_username;
    
    this.setState({ organizationid: company_username })
    fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json;charset=utf-8" },
    }).then(res => res.json()).then(
      data => {
        var i = 0
        const array = []
        while (i < data['output'].length) {
          array.push(i);
          i++;
        }
        this.setState({ company_data: data['output'] })
        this.setState({ flag: false })
        this.setState({ len: data["output"].length})
        // window.alert(data['output'][0]['CompanyName'])
        // return data
        //window.alert(this.state.len)
        var return_value = data
        // return return_value
        return return_value
      }
    )

  }
  constructor(props) {
    super(props)
    this.state = {
      array:[""],
      len: "",
      flag: true,
      organizationid: "",
      company_data: [{ "offerId": "", "CompanyName": "", "Responsibility": "", "Requirement": "" },
      { "offerId": "", "CompanyName": "", "Responsibility": "", "Requirement": "" },
      { "offerId": "", "CompanyName": "", "Responsibility": "", "Requirement": "" },
      { "offerId": "", "CompanyName": "", "Responsibility": "", "Requirement": "" },
      { "offerId": "", "CompanyName": "", "Responsibility": "", "Requirement": "" },
      { "offerId": "", "CompanyName": "", "Responsibility": "", "Requirement": "" },
      { "offerId": "", "CompanyName": "", "Responsibility": "", "Requirement": "" },
      { "offerId": "", "CompanyName": "", "Responsibility": "", "Requirement": "" },
      { "offerId": "", "CompanyName": "", "Responsibility": "", "Requirement": "" },
      { "offerId": "", "CompanyName": "", "Responsibility": "", "Requirement": "" },
      { "offerId": "", "CompanyName": "", "Responsibility": "", "Requirement": "" },
      { "offerId": "", "CompanyName": "", "Responsibility": "", "Requirement": "" },
      ]
    }

  }
  render() {
    var organizationid = this.getCookie('userid')
    var usertype = this.getCookie("usertype")
    var usertype_num = 0
    var current_url = window.location.href;
    let index = current_url.indexOf('=');
    var read_company_id = current_url.substring(index + 1, current_url.length)
    var usertype = this.getCookie("usertype")
    if (organizationid === null) {
      var organizationid = 0
    }
    if (usertype === "organization") {
      var page_id = organizationid
    } else {
      var page_id = read_company_id
    }
  
    if ( organizationid === null ) {
      var organizationid = 1
   }
   if ( usertype === "organization" ) {
    var usertype_num = 1
 }
    if (this.state.flag === true) {
      this.getOfferData(page_id)
      // const list = this.state.array
    }
    const array = Array.from(Array(this.state.len).keys())

    return (

      <div>
        <div><AddNew usertype = {usertype_num}/></div>
        <div className="mt-14 grid grid-cols-2 md:grid-cols-3 gap-6">

          {array.map((v) => (
            <div key={v} class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
              <div class="md:flex">
                <div class="md:flex-shrink-0">
                  <img class="h-48 w-full object-cover md:w-48" src={Image1} alt="Man looking at item at a store"></img>
                </div>
                <div class="p-8">

                  <div class="block mt-1 text-lg leading-tight font-medium text-black hover:underline">{this.state.company_data[v]["CompanyName"]}</div>
                  <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{this.state.company_data[v]["Responsibility"]}</div>
                  <p class="mt-2 text-gray-500">{this.state.company_data[v]["Requirement"]}</p>
                  <div>
                    <JobCheckButton offerId={[this.state.company_data[v]["offerId"],usertype_num]} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default ImageCard;
