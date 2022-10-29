import "./UploadFiles.scss";

import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { addProd } from "../../../redux/actions";



const New = ({ inputs, title }) => {
  const [file, setFile] = useState("")


  const [info, setInfo] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    score: 5,
    image: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg",
    quality: ""
  })
  const dispatch = useDispatch()

  function handleSubmit(e) {
    e.preventDefault()
    dispatch(addProd(info))

  }

  //---manejo de cambios
  function handleChange(e) {


    setInfo({ //cambio de estados
      ...info,
      [e.target.name]: e.target.value


    })

  }

  return (
    <div className="new" >
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        
        <div className="bottom">
          
          <div className="right">
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="formInput">
               
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
                
                <div className="left"><label htmlFor="file" align='center'>   Image: <DriveFolderUploadOutlinedIcon className="icon" /></label>
               
                
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            /> 

          </div>
              </div>

<div class="container">
              <div className="formInput" >
             
               
                <input name="name" type="text" placeholder="Product Name" onChange={(e) => handleChange(e)} />
              </div>
              <div className="formInput" ><br />
          
                <input name="price" type="text" placeholder="Price" onChange={(e) => handleChange(e)} />
              </div><br />
              <div className="formInput">
                <label>Quality:</label><br />
                <input  for="name" name="quality" value="basic" id="1" type="radio"  onChange={(e) => handleChange(e)} /> Basic 
             <input  for="name" name="quality" value="premium" id="2" type="radio" onChange={(e) => handleChange(e)} /> Premium
              
              </div>
             
              <div className="formInput">
              
                <input name="stock" type="text" placeholder="Stock" onChange={(e) => handleChange(e)} />
              </div><br />

              <div className="formInput">
              
                <input name="stock" type="text" placeholder="Description" onChange={(e) => handleChange(e)} />  <br /><br />
              
                 <div><button type='submit' >Send</button></div>
              </div>

             
               </div>
            </form>
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;