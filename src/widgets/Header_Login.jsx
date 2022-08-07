import React from "react";
import Logo from "../logo.svg";

function Header() {
  return (
    <header className="flex justify-between items-center h-20">
      <img src={Logo} alt="" className="w-8 h-8" />
      <nav className="flex items-center">
        <a href="#">My Profile</a>
      </nav>
    </header>
  );
}

export default Header;
