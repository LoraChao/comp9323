import React from "react";
import { useNavigate } from 'react-router-dom';
import {Button} from "antd"
function SignUp(){ 
  // get target person's id
  
  const navigate = useNavigate()
  function IndMoreButton(id){
     navigate(`/signup`, {replace: true})
  }

  return (
      <Button className="ml-8 bg-gray-900 px-4 py-2 rounded text-blue-50 flex items-center" type="link" onClick={() => {IndMoreButton()}}>SignUp</Button>
  )
}
function Hero() {
  return (
    <div className="grid justify-items-center gap-8 pb-28 relative">
      <p className="text-4xl md:text-6xl font-black text-center leading-normal md:leading-normal">
        Wellbeing Online Services
      </p>
      <p className="text-xl text-gray-700 md:w-1/2 text-center">
        by github is savior
      </p>

      {/* <div className="relative grid justify-items-center">
        <video
          src={Video}
          controls
          className="w-[768px] h-[432px] object-cover object-top rounded"
        ></video>
        <div className="flex absolute rounded-full bg-white -bottom-7 px-5 py-4 drop-shadow-xl">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mr-3"
          >
            <circle cx="12" cy="12" r="11" stroke="#999999" stroke-width="2" />
            <path d="M10 17L16 12L10 7V17Z" fill="#999999" />
          </svg>
          Video introduction
        </div>
      </div> */}
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
  );
}
export default Hero;
