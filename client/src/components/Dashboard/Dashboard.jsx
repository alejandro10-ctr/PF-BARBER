import React from 'react'
import HomeDash from './Home/Home'
import "./Dashboard.scss"
import jwt_decode from "jwt-decode";
import Cookies from 'universal-cookie';
import  { Redirect } from 'react-router-dom'



function Dashboard() {

  const cookies = new Cookies()
  const token = cookies.get("token");
  let tokem = ''
   if(token) {
       tokem = jwt_decode(token);
  }

  if(tokem.isAdmin) {
    return (
      <div>
        
       <HomeDash/>
  
      </div>
    )
  } else {

    return <Redirect to='/'  />
  }
  
}

export default Dashboard