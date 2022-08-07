import SectionHeading from "./SectionHeading";
import React,{PureComponent} from 'react';
class Experts extends PureComponent{
    getExpertData() {
      let url = "http://127.0.0.1:5000/homepage/expert/1";
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
        expert_data:[{ExpertsName:"",Tag: "",Introduce: "",Email: "",Icon: ""},
        {ExpertsName:"",Tag: "",Introduce: "",Email: "",Icon: ""},
        {ExpertsName:"",Tag: "",Introduce: "",Email: "",Icon: ""},
      ]}
    
    }
    render(){
      if(this.state.flag === true){
      this.getExpertData()
      }
      return (
    <div>
      <SectionHeading
        title="These experts now provide advisory services"
        subTitle=""
      />
      {[0, 1, 2].map((v) => (
        <div key={v} className="grid justify-items-center border-2 rounded px-14 mt-28">
          <img
            alt=""
            className="w-24 h-24 rounded-full bg-gray-400 -translate-y-1/2"
          />
          <p className="mt-5 mb-4 text-xl font-medium">
            {this.state.expert_data[v]['ExpertsName']}
          </p>
          <p className="text-lg font-bold">{this.state.expert_data[v]['Introduce']}</p>
          <p className="text-gray-500 mb-8">
            {" "}
            <a href="#" className="text-blue-500">
            {this.state.expert_data[v]['Email']}
            </a>
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
