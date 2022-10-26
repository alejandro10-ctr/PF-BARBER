import React from 'react'
import Sidebar from "../Sidebar/Sidebar.jsx"
import Navbar from "../Navbar/Navbar.jsx"
import "../List/List.scss"
import Table from "../Table/Table.jsx"

function Products() {
  return (
    <div className='list'>
    <Sidebar/>
    <div className="listContainer">
        <Navbar/>
        <Table/>
    </div>
</div>
  )
}

export default Products