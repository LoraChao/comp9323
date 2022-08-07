import React,{PureComponent} from 'react';
import SectionHeading from "./SectionHeading";

class Organization extends PureComponent{

  getOrganizationData() {
  let url = "http://127.0.0.1:5000/homepage/prefer_org/1";
  //window.alert(url)
  fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json;charset=utf-8" },
  }).then(res => res.json()).then(
      data => {
          this.setState({organization_data: data["output"]})
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
    organization_data:[{OrganizationName: "",Location: "",Field: "",Icon: ""},
    {OrganizationName: "",Location: "",Field: "",Icon: ""},
    {OrganizationName: "",Location: "",Field: "",Icon: ""},
  ]}

}
render(){
  if(this.state.flag === true){
  this.getOrganizationData()
  }
  return (
    <div>
      <SectionHeading
        title="Maybe you are interested in these organizations"
        subTitle=""
      />
      <div className="mt-14 grid grid-cols-2 md:grid-cols-3 gap-6">
        {[0,1,2].map((v) => (
          <div key={v} class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
            <div class="flex-shrink-0">
              <img class="h-12 w-12" src="" alt="ChitChat Logo"></img>
            </div>
            <div>
              <a herf='#' class="text-xl font-medium text-black">{this.state.organization_data[v]['OrganizationName']}</a>
              <p class="text-gray-500">{this.state.organization_data[v]['Location']}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}}

export default Organization;
