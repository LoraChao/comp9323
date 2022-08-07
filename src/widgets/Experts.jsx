import SectionHeading from "./SectionHeading";
import React,{PureComponent} from 'react';
import pic from "../assets/feature.webp"

class Experts extends PureComponent{
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

    getExpertData(userid) {
      let url = "http://127.0.0.1:5000/homepage/expert/"+userid;
      this.setState({userid:userid})
      //window.alert(url)
      fetch(url, {
          method: "GET",
          headers: { "Content-Type": "application/json;charset=utf-8" },
      }).then(res => res.json()).then(
          data => {
              this.setState({expert_data: data["output"]})
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
        flag: true,
        userid:'',
        expert_data:[{ExpertsName:"",Tag: "",Introduce: "",Email: "",Icon: ""},
        {ExpertsName:"",Tag: "",Introduce: "",Email: "",Icon: ""},
        {ExpertsName:"",Tag: "",Introduce: "",Email: "",Icon: ""},
      ]}
    
    }
    render(){
      var UserId = this.getCookie('userid')
      if(this.state.flag === true){
      this.getExpertData(UserId)
      }
      return (
    <div>
      <SectionHeading
        title="These experts now provide advisory services"
        subTitle=""
      />
      {[0, 1, 2].map((v) => (
        <div key={v} className="grid justify-items-center border-2 rounded px-14 mt-28">
          <img src={pic}
            alt=""
            className="w-24 h-24 rounded-full bg-gray-400 -translate-y-1/2"
          />
          <p className="mt-5 mb-4 text-xl font-medium text-gray-800">
            {this.state.expert_data[v]['ExpertsName']}
          </p>
          <p className="text-lg font-bold text-gray-700">{this.state.expert_data[v]['Introduce']}</p>
          <p className="text-gray-500 mb-8">
            {" "}
            <p className="text-blue-500">

            Email:  {this.state.expert_data[v]['Email']}
            </p>
          </p>
        </div>
        ))}
     
      <svg
        width="98"
        height="256"
        viewBox="0 0 98 256"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute right-0 -z-10 -translate-y-3/4"
      >
        <circle cx="128" cy="128" r="128" fill="url(#paint0_linear_0_386)" />
        <defs>
          <linearGradient
            id="paint0_linear_0_386"
            x1="0"
            y1="0"
            x2="0"
            y2="256"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="white" />
            <stop offset="0.774017" stop-color="#EAEAEA" />
            <stop offset="1" stop-color="#DFDFDF" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
}
export default Experts;
