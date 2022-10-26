import React from 'react'
import "../Home/Home.scss"
import NavbarDash from '../Navbar/Navbar'
import Sidebar from '../Sidebar/Sidebar'
import Widget from '../Widget/Widget'
import Featured from '../Featured/Featured'
import Chart from '../Chart/Chart'
import Table from '../Table/Table'


function HomeDash() {
  return (


    <div className='home'>
      <Sidebar />

      <div className="homeContainer">
        <NavbarDash />
        <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>

        <div className='charts'>
          <Featured />
          <Chart/>
        </div>

<<<<<<< HEAD
     
=======
       
    


>>>>>>> 0d0c47e (buenos cambios)
      </div>
    </div>
  )
}

export default HomeDash