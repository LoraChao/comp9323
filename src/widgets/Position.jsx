
import SectionHeading from "./SectionHeading";
import Image1 from "../assets/pexels-photo-8348457.jpg";
import React,{PureComponent} from 'react';
import {Button} from "antd";

function JobCheckButton(props){ 
  // get job's id
  const offerid = props.offerid 
  
  // jump with params: 'job's id'
  function handleCheckJobClick(){
      window.open(`/check?offer_id=${offerid}`, {replace: true})        
  }

  return (
     <Button onClick={() => {handleCheckJobClick()}}>Check</Button>
   )
}


class Position extends PureComponent{
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
  getPositionData(userid) {
  let url = "http://127.0.0.1:5000/homepage/preferJob_ind/"+ userid;
  this.setState({userid:userid})
  //window.alert(url)
  fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json;charset=utf-8" },
  }).then(res => res.json()).then(
      data => {
          this.setState({position_data: data["output"]})
          this.setState({flag: false})
          // window.alert(data['output'][0]['CompanyName'])
          // return data
          const return_value = data
          //console.log(return_value)
          return return_value
      }
  )
}
constructor(props) {
  super(props)
  this.state = {
    userid: "",
    flag: true,
    position_data:[{OfferId:'',CompanyName: '', Position: '', Contact: ''},
    {OfferId:'',CompanyName: '', Position: '', Contact: ''},
    {OfferId:'',CompanyName: '', Position: '', Contact: ''},
    {OfferId:'',CompanyName: '', Position: '', Contact: ''},
    {OfferId:'',CompanyName: '', Position: '', Contact: ''},
  ]}

}
render(){
  var UserId = this.getCookie('userid')
  if ( UserId === null ) {
    var UserId = 0
 }
  if(this.state.flag === true){
  this.getPositionData(UserId)
  }
  return (
    <div>
      <SectionHeading
        title="You Might be Interested in"
        subTitle=""
      />
      <div className="grid lg:grid-cols-2 mt-20 gap-20">
        <div>
          <h3 className="mt-7 text-[32px] font-fold">Job opportunities recommended to you </h3>
          <ul className="grid gap-3">
            {[0, 1, 2, 3, 4].map((v) => (
              <li key={v}
                className={`p-5 justify-between rounded border border-zinc-100`}
              >
                <p className="text-lg font-bold text-purple-600">{this.state.position_data[v]["Position"]}</p>
   
                  <p className="text-lg leading-7 mt-1 text-gray-800">
                   {this.state.position_data[v]["CompanyName"]}
                  </p>
                  <p className="mt-2 text-gray-500">{this.state.position_data[v]["Contact"]}</p>
                  <JobCheckButton offerid={this.state.position_data[v]["OfferId"]} />

       
              </li>
            ))}
          </ul>
        </div>
        <img src={Image1} alt="" />
      </div>
    </div>
  )
}}

export default Position;