import React, { PureComponent } from 'react';
import Button from '@mui/material/Button';

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

class Board extends PureComponent {

  ToMyPage() {
    var loginstatus = getCookie('islogin');
    if (loginstatus === '1') {
      let url = "http://localhost:3000/mypage";
      window.location.replace(url)
    } else {
      let url = "http://localhost:3000/login";
      window.location.replace(url)
      //   return (
      //     <Button className="ml-8 bg-gray-900 px-4 py-2 rounded text-blue-50 flex items-center absolute bottom-0 right-0" onClick={() => {ToMyPage() }}>ToMyPage</Button>)
      // 
    }
  }

  render() {
    return (
      <header className="flex justify-between items-center h-20">
        <nav className="flex items-center">
          <p>Hello, User!</p>
          <button className="ml-8 bg-gray-900 px-4 py-2 rounded text-blue-50 flex items-center" variant="contained" onClick={this.ToMyPage}>MyPage</button>
        </nav>
      </header>
    );
  }
}

export default Board;
