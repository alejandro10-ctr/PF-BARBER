import React from 'react'
import Sidebar from "../Sidebar/Sidebar.jsx"
import Navbar from "../Navbar/Navbar.jsx"
import "../Products/Products.scss"
import Table from "../Table/Table.jsx"

function Products() {
  return (
    <div className='products'>
    <Sidebar/>
    <div className="listProducts">
        <Navbar/>
        <Table/>
    </div>
</div>
  )
}

export default Products