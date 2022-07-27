import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import MyPage from '@/pages/MyPage';
import Follow from '@/pages/Follow';
import JobPreference from '@/pages/JobPreference';
import Test from '@/pages/Test';
import ArticleDetails from '@/pages/ArticleDetails';
import ArticleList from '@/pages/ArticleList';
import Login_individual from '@/pages/Login';
import Login_organizational from '@/pages/Login_organizational';
import Signup_individual from '@/pages/Signup';
import Signup_organizational from '@/pages/Signup_organizational';
import Details_personal from '@/pages/Details_personal';	
import JobRelease from '@/pages/Job_Release';	
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
          <Route path='MyPage/Follow' element={<Follow />}></Route>
          <Route path='MyPage/JobPreference' element={<JobPreference />}></Route>
          <Route path='/ArticleDetails' element={<ArticleDetails />}></Route>
          <Route path='/Test' element={<Test />}></Route>
          <Route path='/login' element={<Login_individual />}></Route>
          <Route path='/login_organizational' element={<Login_organizational />}></Route>
          <Route path='/signup' element={<Signup_individual />}></Route>
          <Route path='/signup_organizational' element={<Signup_organizational />}></Route>
          <Route path='MyPage/ArticleList' element={<ArticleList />}></Route>
          <Route path='/profile' element={<Details_personal />}></Route>
          <Route path='/release' element={<JobRelease />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;
