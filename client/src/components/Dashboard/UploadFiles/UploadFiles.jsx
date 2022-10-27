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

function handleSubmit(e){
  e.preventDefault()
  dispatch(addProd(info)) 

}

 //---manejo de cambios
 function handleChange(e){ 

 
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
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
            
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
           
          </div>
          <div className="right">
            <form onSubmit={(e)=>handleSubmit(e)}>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input name={input.name} type={input.type} placeholder={input.placeholder} onChange={(e)=>handleChange(e)}/>
                </div>
              ))}
              <button type='submit'>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;