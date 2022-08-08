import React, { PureComponent } from "react";
import { Button } from "antd";
import Image1 from "../assets/pexels-photo-11373385.jpg"
import Image2 from "../assets/pexels-photo-10058967.webp"
import Image3 from "../assets/pexels-photo-11021595.jpg"


function Edit() {

  function handleCheckArtileClick() {
    window.open(`/editprofile_organizational`, { replace: true })
  }

  return (
    <Button className="ml-8 bg-gray-900 px-4 py-2 rounded text-blue-50 flex items-center" onClick={() => { handleCheckArtileClick() }}>Edit</Button>
  )
}


class Hero extends PureComponent {
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

  getOrgnizationData(company_username) {
    let url = "http://127.0.0.1:5000/auth/brief/organization/" + company_username
    this.setState({ organizationid: company_username })
    // window.alert(url)
    fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json;charset=utf-8" },
    }).then(res => res.json()).then(
      data => {
        this.setState({ company_data: data })
        this.setState({ company_name: data["Description"] })
        this.setState({ company_field: data["Field"] })
        this.setState({ flag: false })
        // window.alert(data['output'][0]['CompanyName'])
        // return data
        var return_value = data
        console.log(this.state.company_data)
        return return_value
      }
    )

  }
  constructor(props) {
    super(props)
    this.state = {
      company_data: {
        Companyname: "",
        Description: "",
        Field: "",
        Icon: "",
        Location: "",
        OrganizationName: "",
        Scale: "",
        message: ""
      },
      flag: true

    }

  }
  render() {
    var organizationid = this.getCookie('userid')
    if (this.state.flag === true) {
      this.getOrgnizationData(organizationid)
      // const list = this.state.array
    }


    return (
      <div>
        <div className="grid justify-items-center gap-8 pb-28 relative">

          <p className="text-4xl md:text-6xl font-black text-center leading-normal md:leading-normal">
            Wellbeing Online Services
          </p>
          <p className="text-xl text-gray-700 md:w-1/2 text-center">
            by github is savior
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 sm:px-8 sm:py-12 sm:gap-x-8 md:py-16">
          <div class="relative z-10 col-start-1 row-start-1 px-4 pt-40 pb-3 bg-gradient-to-t from-black sm:bg-none">
            <h2 className="text-xl font-semibold text-white sm:text-2xl sm:leading-7 sm:text-black md:text-3xl">{this.state.company_data["Companyname"]}</h2>
            <div><Edit/></div>

          </div>
          
          <div class="col-start-1 row-start-2 px-4 sm:pb-16">
            <div class="flex items-center text-sm font-medium my-5 sm:mt-2 sm:mb-4">
              <svg width="20" height="20" fill="currentColor" class="text-violet-600">
                <path d="M9.05 3.691c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.372 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118l-2.8-2.034c-.784-.57-.381-1.81.587-1.81H7.03a1 1 0 00.95-.69L9.05 3.69z" />
              </svg>
              <div>{this.state.company_data["Location"]}</div>
            </div>
            <hr class="w-16 border-gray-300 hidden sm:block"></hr>
          </div>
          <div class="col-start-1 row-start-3 space-y-3 px-4">
            <p class="flex items-center text-black text-sm font-medium">
              <img src="/kevin-francis.jpg" alt="" class="w-6 h-6 rounded-full mr-2 bg-gray-100"></img>
              Description: {this.state.company_data["Description"]}
            </p>
            <p class="flex items-center text-black text-sm font-medium">
              <img src="/kevin-francis.jpg" alt="" class="w-6 h-6 rounded-full mr-2 bg-gray-100"></img>
              Field: {this.state.company_data["Field"]}
            </p>
            <p class="flex items-center text-black text-sm font-medium">
              <img src="/kevin-francis.jpg" alt="" class="w-6 h-6 rounded-full mr-2 bg-gray-100"></img>
              Scale: {this.state.company_data["Scale"]}
            </p>
          </div>



          <div class="col-start-1 row-start-1 flex sm:col-start-2 sm:row-span-3">
            <div class="w-full grid grid-cols-3 grid-rows-2 gap-2">
              <div class="relative col-span-3 row-span-2 md:col-span-2">
                <img src={Image1} alt="" class="absolute inset-0 w-full h-full object-cover bg-gray-100 sm:rounded-lg" />
              </div>
              <div class="relative hidden md:block">
                <img src={Image2} alt="" class="absolute inset-0 w-full h-full object-cover rounded-lg bg-gray-100" />
              </div>
              <div class="relative hidden md:block">
                <img src={Image3} alt="" class="absolute inset-0 w-full h-full object-cover rounded-lg bg-gray-100" />
              </div>
            </div>
          </div>
        </div>


        <div>
          <svg
            width="128"
            height="128"
            viewBox="0 0 128 128"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute bottom-0 md:bottom-20 -left-10 -z-10"
          >
            <circle cx="64" cy="64" r="64" fill="url(#paint0_linear_0_23)" />
            <defs>
              <linearGradient
                id="paint0_linear_0_23"
                x1="0"
                y1="0"
                x2="0"
                y2="128"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="white" />
                <stop offset="0.774017" stop-color="#EAEAEA" />
                <stop offset="1" stop-color="#DFDFDF" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    );
  }
}
export default Hero;
