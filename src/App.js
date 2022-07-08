import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import MyPage from '@/pages/MyPage';
import Follow from '@/pages/Follow';

//import React from 'react';

//import { Button } from 'antd';

function App() {
  return (
    // router configuration
    <BrowserRouter>
      <div className="App">
        {/*<Button type="primary">Primary Button</Button>*/}
        <Routes>
          {/* create route path and relations */} 
          {/* <Route path='/' element={<FrontPage />}></Route> */} {/* this spare is for the main page */}
          <Route path='/MyPage' element={<MyPage />}></Route>
          <Route path='/MyPage/Follow' element={<Follow />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;
