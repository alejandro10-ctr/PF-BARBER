import React from 'react'
import "../Home/Home.scss"
import Sidebar from '../Sidebar/Sidebar'
import Widget from '../Widget/Widget'
import Featured from '../Featured/Featured'
import Chart from '../Chart/Chart'
import Table from '../Table/Table'
import jwt_decode from "jwt-decode";
import Cookies from 'universal-cookie';
import  { Redirect } from 'react-router-dom'



function HomeDash() {

  const cookies = new Cookies()
  const token = cookies.get("token");
  let tokem = ''
   if(token) {
       tokem = jwt_decode(token);
  }



  if(tokem.isAdmin) {
    return (

    
      <div className='home'>
        <Sidebar />
  
        <div className="homeContainer">
        <div className="widgets">
          <Widget isUser="true" type="user" />
          <Widget  isProducts= "true" type="earning" />
          <Widget type="order" />
          <Widget type="balance" />
        </div>
  
          <div className='charts'>
            <Featured />
            <Chart/>
          </div>
  
  
          <div className="listConteiner">
            <div className="listTitle">Store</div>
                <Table/>
          </div>
  
      
  
  
  
        </div>
      </div>
    )

  } else {
    return <Redirect to='/'  />
  }


  
}

export default HomeDash