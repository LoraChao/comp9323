import React from "react";
import {Button} from "antd"


function MyPageButton(){ 
  // jump with params: 'job's id'
  function CheckCookie(){
    
      window.open(`/MyPage`, {replace: true})        
  }

  return (
     <Button className="ml-8 bg-gray-900 px-4 py-2 rounded text-blue-50 flex items-center" onClick={() => {CheckCookie()}}>MyPage</Button>
   )
}

function Header() {
  return (
    <header className="flex justify-between items-center h-20">
      <nav className="flex items-center">
        <p>Hello, User!</p>
        <MyPageButton/>
      </nav>
    </header>
  );
}

export default Header;
