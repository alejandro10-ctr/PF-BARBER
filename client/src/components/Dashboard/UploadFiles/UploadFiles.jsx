import axios from 'react';
import { useState, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addProd } from "../../../redux/actions";
import { uploadImg } from "../../../redux/actions.js";
import { useEffect } from "react";
import { FormControl } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import Box from '@mui/material/Box';
import NativeSelect from '@mui/material/NativeSelect';



import "./UploadFiles.scss";

const New = ({ inputs, title }) => {
  const dispatch = useDispatch()
  const fileInputRef = useRef(null)

  const [file, setFile] = useState("")
  const imageUrl = useSelector((state) => state.uploadImg)


  const [info, setInfo] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    score: 5,
    image: "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg",
    quality: ""
  })


  useEffect(() => {
      setInfo({ ...info, image: imageUrl })
  }, [imageUrl]) //1-corte

  function handleChange(e) {
e.preventDefault()
setInfo({...info, [e.target.name]: e.target.value})
console.log(info)
  }


  function handleChangeImg(event) {
    event.preventDefault()
    setFile(event.target.files['0'])
    const formData = new FormData();
    formData.append('file', event.target.files['0']);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    //  axios.post(url, formData).then((response) => {
    //     console.log(response.data);
    //   });
   dispatch(uploadImg(formData))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (info.name==="" || info.description === "" || info.price==="" || info.stock==="" || info.quality==="") {
alert('Complete all the fields')
//sweet alert
    }
    else {
      dispatch(addProd(info))
      setInfo({
        name: "",
        description: "",
        price: "",
        stock: "",
        score: 5,
        image: "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg",
        quality: ""
      })
      setFile("")
      //sweet alert
    }
    

    // const formData = new FormData();
    // formData.append('file', file);
    // const config = {
    //   headers: {
    //     'content-type': 'multipart/form-data',
    //   },
    // };
    // setInfo({image: imageUrl},dispatch(uploadImg(formData)) )
    // console.log(info.image)
  }


  return (
    <div className="new" >
      <Sidebar />
      <div className="newContainer">
        <Navbar />
<img
            src={
              file
                ? URL.createObjectURL(file)
                : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
            }
            alt=""
          />
        <div className="App">
          <button
          onClick={ () => fileInputRef.current?.click()}
          >Select a file</button>
          <br /><br />
          <input ref={fileInputRef} type="file" onChange={handleChangeImg} style={{display: 'none'}} />

          

        </div>

        <FormControl>
          <InputLabel htmlFor="my-input">Product Name</InputLabel>
          <Input id="my-input" aria-describedby="my-helper-text" value={info.name} name="name" onChange={(e)=>handleChange(e)}/>
          {/* <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText> */}

        </FormControl><br /><br />


        <FormControl>
          <InputLabel htmlFor="my-input">Price</InputLabel>
          <Input id="my-input" aria-describedby="my-helper-text" value={info.price}  name="price" onChange={(e)=>handleChange(e)} />
          {/* <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText> */}
        </FormControl><br /><br />

        <FormControl>
          <InputLabel htmlFor="my-input">Stock</InputLabel>
          <Input id="my-input" aria-describedby="my-helper-text" value={info.stock}  name="stock" onChange={(e)=>handleChange(e)} />
          {/* <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText> */}
        </FormControl><br /><br />

        <FormControl>
          <InputLabel htmlFor="my-input">Description</InputLabel>
          <Input id="my-input" aria-describedby="my-helper-text" value={info.description}  name="description" onChange={(e)=>handleChange(e)} />
          {/* <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText> */}
        </FormControl><br /><br />

        <Box >
          <FormControl>
          
            <NativeSelect
              defaultValue={30}
              inputProps={{
                name: 'quality',

              }}
              name="quality" onChange={(e)=>handleChange(e)}
              value={info.quality}
            >
              <option hidden value=''>Quality</option>
              <option value='basic'>Basic</option>
              <option value='premium'>Premium</option>

            </NativeSelect>
          </FormControl>
        </Box><br />


     
        <button type="submit" onClick={(e)=>handleSubmit(e)}>Upload</button>




      </div>
    </div>
  );
};

export default New;