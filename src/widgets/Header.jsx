import React from "react";
import { useNavigate } from 'react-router-dom';
import {Button} from "antd"
function ReturnButton(props) {
  const usertype_num = props.usertype_num
  const navigate = useNavigate()
  function handleCheckArtileClick() {

    navigate('/Individual_Home', {replace: true})
  }
  if( usertype_num === 0){
  return (
    <Button className="ml-8 bg-gray-900 px-4 py-2 rounded text-blue-50 flex items-center" onClick={() => { handleCheckArtileClick() }}>Return</Button>
  )
}
return null}

function LogoutButton(props){
  const usertype_num = props.usertype_num
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
      setcookie("usertype", '', -1 )

      // var ca = document.cookie;
      // console.log(document.cookie)
      navigate('/login', {replace: true})
  }
  if (usertype_num===1){
  return (
      <Button className="ml-8 bg-gray-900 px-4 py-2 rounded text-blue-50 flex items-center" danger onClick={() => {LogoutButton()}} >Logout</Button>
  )}
  return null
}


function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}
var usertype = getCookie("usertype")
var usertype_num = 0
if ( usertype === "organization" ) {
  var usertype_num = 1
}

function Header() {
  return (
    
    <header className="flex justify-between items-center h-20">
      <nav className="flex items-center">
        <ReturnButton usertype_num={usertype_num}/>
        <LogoutButton usertype_num={usertype_num}/>
      </nav>
    </header>
  );
}

export default Header;
