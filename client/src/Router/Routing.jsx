import React from 'react'
import {Route,Routes,BrowserRouter as Router}from 'react-router-dom'
import Signup from '../component/Signup'
import Signin from '../component/Signin'
import UserDashboard from '../component/Dashboard'
import Header from '../Layout/Header'
const Routing = () => {
  return (
   <Router>
    <Header/>
    <Routes>
        <Route path='' element={<Signup/>}/>
        <Route path='/login'element={<Signin/>}/>
        <Route path='/dashboard'element={<UserDashboard/>}/>
    </Routes>
   </Router>
  )
}

export default Routing