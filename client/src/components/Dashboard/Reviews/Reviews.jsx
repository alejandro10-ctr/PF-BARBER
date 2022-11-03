import { connect, useDispatch } from "react-redux";
import { bindActionCreators } from 'redux'

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
import img from "../Table/img/star.png";
import Swal from "sweetalert2";
import Sidebar from "../Sidebar/Sidebar";
import "./Reviews.scss"


const Reviews = ({ products, getProducts }) => {

  const dispatch = useDispatch() 
let id
  useEffect(() => {
    getProducts()
    getProducts()
  },[])

  let handleEdit = (e) =>{
    console.log(e.target.value)
  }
  

  return (
    <div>


    
    <Sidebar></Sidebar>
    <div className="hola">
    <TableContainer component={Paper} className='table'>
      <div className="datatableTitle">
        Reviews products
 
      </div>

      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
       
            <TableCell className='tableCell'>Traking ID</TableCell>
            <TableCell className='tableCell'>Product</TableCell>
            <TableCell className='tableCell'>Average</TableCell>

            <TableCell className='tableCell'>Reviews</TableCell>



          </TableRow>
        </TableHead>
        <TableBody>
          {products.sort((a, b) => {
            return a.id - b.id;
          }).map((row) => row.isReview ?(
      
    
              
              <TableRow key={row.id}>

              <TableCell >{row.id}</TableCell>
              <TableCell className='tableCell'>
                <div className='cellWrapper'>
                  <img src={row.image} alt="" className='image' />
                  {row.name}
                </div>
              </TableCell>

              <TableCell className='tableCell'>{row.promedio}</TableCell>
        

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
    </div>
    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Reviews);