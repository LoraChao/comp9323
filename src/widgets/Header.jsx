import React from "react";
import { useNavigate } from 'react-router-dom';
import {Button} from "antd"
function Login(){ 
  // get target person's id
  
  const navigate = useNavigate()
  function IndMoreButton(id){
     navigate(`/login`, {replace: true})
  }

  return (
      <Button className="ml-8 bg-gray-900 px-4 py-2 rounded text-blue-50 flex items-center" type="link" onClick={() => {IndMoreButton()}}>Login</Button>
  )
}
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

function Header() {
  return (
    
    <header className="flex justify-between items-center h-20">
      <nav className="flex items-center">
        <Login/>
        <SignUp/>
      </nav>
    </header>
  );
}

export default Header;
