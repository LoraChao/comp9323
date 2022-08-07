import React from "react";
import Video from "../assets/Pitch Video 9323 Github is Savior.mp4";

function Hero() {
  return (
    <div className="grid justify-items-center gap-8 pb-28 relative">
      <p className="text-4xl md:text-6xl font-black text-center leading-normal md:leading-normal">
        Wellbeing Online Services
      </p>
      <p className="text-xl text-gray-700 md:w-1/2 text-center">
        by github is savior
      </p>
      <div>
        <button className="rounded bg-blue-500 text-base text-white py-3 px-8 absolute bottom-0 right-0">
        Add New
        </button>
      </div>

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
