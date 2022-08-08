import React, { PureComponent } from 'react';
import SectionHeading from "./SectionHeading";
import pic from "../assets/pexels-photo-10282820.jpg";
import { Button } from "antd";
function OrgButton(props) {

  const organizationid = props.organizationid
  // jump with params: 'job's id'
  function handleCheckJobClick() {
    window.open(`/Organization_Home?checkUserId=${organizationid}`, { replace: true })
  }

  return (
    <Button onClick={() => { handleCheckJobClick() }}>More</Button>
  )
}



class Organization extends PureComponent {
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
  getOrganizationData(userid) {
    let url = "http://127.0.0.1:5000/homepage/prefer_org/" + userid;
    this.setState({ userid: userid })
    //window.alert(url)
    fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json;charset=utf-8" },
    }).then(res => res.json()).then(
      data => {
        this.setState({ organization_data: data["output"] })
        this.setState({ flag: false })
        // window.alert(data['output'][0]['CompanyName'])
        // return data
        var return_value = data
        console.log(return_value)
        return return_value
      }
    )
  }
  constructor(props) {
    super(props)
    this.state = {
      flag: true,
      userid: '',
      organization_data: [{ OrganizationId: "", OrganizationName: "", Location: "", Field: "", Icon: "" },
      { OrganizationId: "", OrganizationName: "", Location: "", Field: "", Icon: "" },
      { OrganizationId: "", OrganizationName: "", Location: "", Field: "", Icon: "" },
      ]
    }

  }
  render() {
    var UserId = this.getCookie('userid')
    if (UserId === null) {
      var UserId = 0
    }
    if (this.state.flag === true) {
      this.getOrganizationData(UserId)

    }
    return (
      <div>
        <SectionHeading
          title="Maybe you are interested in these organizations"
          subTitle=""
        />
        <div className="mt-14 grid grid-cols-2 md:grid-cols-3 gap-6">
          {[0, 1, 2].map((v) => (
            <div key={v} class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
              <div class="flex-shrink-0">
                <img class="h-12 w-12" src={pic} alt="ChitChat Logo"></img>
              </div>
              <div>
                <p class="text-xl font-medium text-black">{this.state.organization_data[v]['OrganizationName']}</p>
                <p class="text-gray-500">{this.state.organization_data[v]['Location']}</p>
                <OrgButton organizationid={this.state.organization_data[v]['OrganizationId']} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Organization;
