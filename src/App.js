import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import MyPage from '@/pages/MyPage';
import OthersPage from '@/pages/OthersPage';
import FollowInd from '@/pages/FollowInd';
import FollowOrg from '@/pages/FollowOrg';
import JobPreference from '@/pages/JobPreference';
import Login_individual from '@/pages/Login';
import Login_organizational from '@/pages/Login_organizational';
import Signup_individual from '@/pages/Signup';
import Signup_organizational from '@/pages/Signup_organizational';
import Details_personal from '@/pages/Details_personal';	
import JobRelease from '@/pages/Job_Release';	
import JobCheck from '@/pages/Job_check';	
import Details_organizational from '@/pages/details_organizational';
import ArticleDetails from '@/pages/ArticleDetails';
import ArticleList from '@/pages/ArticleList';

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
          <Route path='/OthersPage' element={<OthersPage />}></Route>
          <Route path='/FollowInd' element={<FollowInd />}></Route>
          <Route path='/FollowOrg' element={<FollowOrg />}></Route>
          <Route path='/JobPreference' element={<JobPreference />}></Route>
          {/* <Route path='/ArticleDetails' element={<ArticleDetails />}></Route> */}
          <Route path='/ArticleDetails' element={<ArticleDetails />}></Route>
          <Route path='/login' element={<Login_individual />}></Route>
          <Route path='/login_organizational' element={<Login_organizational />}></Route>
          <Route path='/signup' element={<Signup_individual />}></Route>
          <Route path='/signup_organizational' element={<Signup_organizational />}></Route>
          <Route path='/ArticleList' element={<ArticleList />}></Route>
          <Route path='/profile' element={<Details_personal />}></Route>
          <Route path='/release' element={<JobRelease />}></Route>
          <Route path='/check' element={<JobCheck />}></Route>
          <Route path='/profile_organizational' element={<Details_organizational />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;
