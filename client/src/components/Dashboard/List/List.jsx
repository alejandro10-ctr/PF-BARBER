import React from 'react'
import Sidebar from "../Sidebar/Sidebar.jsx"

import "../List/List.scss"
import DataTable from '../Datatable/Datatable.jsx'

function List() {
  return (
    <div className='list'>
        <Sidebar/>
        <div className="listContainer">

            <DataTable/>
        </div>
    </div>
  )
}

export default List