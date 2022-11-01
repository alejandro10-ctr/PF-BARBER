// import React from 'react'
import { connect, useDispatch } from "react-redux";
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
import { updateProducts, getProducts } from '../../../redux/actions';
import img from "./img/star.png";
import Swal from "sweetalert2";

const List = ({ products, getProducts }) => {

  const dispatch = useDispatch() 
let id
  useEffect(() => {
    getProducts()
  },[])
  
  let handleEdit = (e) =>{
    console.log(e.target.value)
  }
  let handleDelete = (id, product) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        product.isActive = false
        dispatch(updateProducts(id, product))
        getProducts()
      }
      getProducts()
      getProducts()
    }
    )
    getProducts()


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
            <TableCell className='tableCell'> </TableCell>
            <TableCell className='tableCell'> </TableCell>
            <TableCell className='tableCell'>Price</TableCell>
            <TableCell className='tableCell'>Quality</TableCell>
            <TableCell className='tableCell'>Stock</TableCell>
            <TableCell className='tableCell'>Stars</TableCell>



          </TableRow>
        </TableHead>
        <TableBody>
          {products.sort((a, b) => {
            return a.id - b.id;
          }).map((row) => row.isActive ?(
      
    
              
              <TableRow key={row.id}>

              <TableCell >{row.id}</TableCell>
              <TableCell className='tableCell'>
                <div className='cellWrapper'>
                  <img src={row.image} alt="" className='image' />
                  {row.name}
                </div>
              </TableCell>

              <TableCell className='tableCell'>
              <Link to={`/dash/product/${row.id}`}>
                <button class='viewButton'>Edit</button>
              </Link>
              
                </TableCell>
                <TableCell className='tableCell'>
              
                <button onClick= {({id = row.id}) => handleDelete(id, row)} class='viewButton'>Delete</button>
             
              
                </TableCell>
              <TableCell className='tableCell'>{row.price}</TableCell>
              <TableCell className='tableCell'>{row.quality}</TableCell>
              <TableCell className='tableCell'>{row.stock}</TableCell>
              <TableCell className='tableCell'>{row.score === 1 ? <img src={img} alt="Img Not Found."></img>
                : row.score === 2 ? <div><img src={img} alt="Img Not Found."></img> <img src={img} alt="Img Not Found."></img></div>
                  : row.score === 3 ? <div><img src={img} alt="Img Not Found."></img> <img src={img} alt="Img Not Found."></img> <img src={img} alt="Img Not Found."></img> </div>
                    : row.score === 4 ? <div><img src={img} alt="Img Not Found."></img> <img src={img} alt="Img Not Found."></img> <img src={img} alt="Img Not Found."></img> <img src={img} alt="Img Not Found."></img></div>
                      : <div><img src={img} alt="Img Not Found."></img> <img src={img} alt="Img Not Found."></img> <img src={img} alt="Img Not Found."></img> <img src={img} alt="Img Not Found."></img> <img src={img} alt="Img Not Found."></img></div>}</TableCell>
                    
            </TableRow> 


           ): "")}
           
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