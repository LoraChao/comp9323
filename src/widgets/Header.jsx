import React from "react";
import { useNavigate } from 'react-router-dom';
import {Button} from "antd"

function LogoutButton(){

  function setcookie(name, value, days) {
      var expires = "";
      if (days) {
          var date = new Date();
          date.setTime(date.getTime() + (days*24*60*60*1000));
          expires = "; expires=" + date.toUTCString();
      }
      document.cookie = name + "=" + (value || "")  + expires + "; path=/";
    }

  // jump without params
  const navigate = useNavigate()
  function LogoutButton(){
      //document.cookie = "islogin=; userid = ; expires=Thu, 01 Jan 1970 00:00:00 GMT; path =/"; 

      setcookie('islogin', '', -1)
      setcookie("userid", '', -1)

      // var ca = document.cookie;
      console.log(document.cookie)
      navigate('/login', {replace: true})
  }

  return (
      <Button className="ml-8 bg-gray-900 px-4 py-2 rounded text-blue-50 flex items-center" danger onClick={() => {LogoutButton()}} >Logout</Button>
  )
}


function Header() {
  return (
    
    <header className="flex justify-between items-center h-20">
      <nav className="flex items-center">
        <LogoutButton/>
      </nav>
    </header>
  );
}

export default Header;
