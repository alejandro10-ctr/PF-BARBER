import React from 'react'
import Sidebar from "../Sidebar/Sidebar.jsx"
import Navbar from "../Navbar/Navbar.jsx"
import "../List/List.scss"
import DataTable from '../Datatable/Datatable.jsx'

function List() {
  return (
    <div className='list'>
        <Sidebar/>
        <div className="listContainer">
            <Navbar/>
            <DataTable/>
        </div>
    </div>
  )
}

export default List