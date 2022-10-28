// import React from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import '../Table/Table.scss';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { getProducts } from '../../../redux/actions';
import img from "./img/star.png";

const List = ({ products, getProducts }) => {

  useEffect(() => {
    getProducts()
  },[])
  
  let handleEdit = (e) =>{
    console.log(e.target.value)
  }

  return (

    <TableContainer component={Paper} className='table'>
      <div className="datatableTitle">
        List products
        <Link to="/dash/products/add" className="link">
          Add New Product

        </Link>
      </div>

      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className='tableCell'>Traking ID</TableCell>
            <TableCell className='tableCell'>Product</TableCell>
            <TableCell className='tableCell'>Edit</TableCell>
            <TableCell className='tableCell'>Price</TableCell>
            <TableCell className='tableCell'>Quality</TableCell>
            <TableCell className='tableCell'>Stock</TableCell>
            <TableCell className='tableCell'>Stars</TableCell>



          </TableRow>
        </TableHead>
        <TableBody>
          {products.sort((a, b) => {
            return a.id - b.id;
          }).map((row) => (
            <TableRow key={row.id}>
              <TableCell >{row.id}</TableCell>
              <TableCell className='tableCell'>
                <div className='cellWrapper'>
                  <img src={row.image} alt="" className='image' />
                  {row.name}
                </div>
              </TableCell>

              <TableCell className='tableCell'><button value={row.id} onClick={(e)=> handleEdit(e)}>edit</button></TableCell>
              <TableCell className='tableCell'>{row.price}</TableCell>
              <TableCell className='tableCell'>{row.quality}</TableCell>
              <TableCell className='tableCell'>{row.stock}</TableCell>
              <TableCell className='tableCell'>{row.score === 1 ? <img src={img} alt="Img Not Found."></img>
                : row.score === 2 ? <div><img src={img} alt="Img Not Found."></img> <img src={img} alt="Img Not Found."></img></div>
                  : row.score === 3 ? <div><img src={img} alt="Img Not Found."></img> <img src={img} alt="Img Not Found."></img> <img src={img} alt="Img Not Found."></img> </div>
                    : row.score === 4 ? <div><img src={img} alt="Img Not Found."></img> <img src={img} alt="Img Not Found."></img> <img src={img} alt="Img Not Found."></img> <img src={img} alt="Img Not Found."></img></div>
                      : <div><img src={img} alt="Img Not Found."></img> <img src={img} alt="Img Not Found."></img> <img src={img} alt="Img Not Found."></img> <img src={img} alt="Img Not Found."></img> <img src={img} alt="Img Not Found."></img></div>}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}


export const mapStateToProps = ({ products, allProducts }) => {
  return {
    products,
    allProducts,
  }
}
export const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getProducts,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(List);