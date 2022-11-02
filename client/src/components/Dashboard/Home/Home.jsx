import React from 'react'
import "../Home/Home.scss"
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

  }

export default HomeDash