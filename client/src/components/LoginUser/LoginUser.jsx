import React from 'react';
 import axios from 'axios';
 import { useFormik } from 'formik';
 import * as Yup from "yup"
 
 export default function LoginUser() {
 
 
     const formik = useFormik({
         initialValues: {
             email: "",
             password: "",
            
         },
        
         //validation yup
         
         onSubmit: async(values) => {
    
            console.log(values)
            await axios.post('http://localhost:3001/auth/login',  values)
 
         }
     })
 
     return (
         <>
             <h1>Login</h1>
             <form onSubmit={formik.handleSubmit}>
                 <div>
                     <input id="email" name="email" type="text" placeholder='email'
                         onChange={formik.handleChange}
                         onBlur={formik.handleBlur}
                         value={formik.values.email} 
                         />
 
                     {formik.touched.email && formik.errors.email ? <p>{formik.errors.email}</p> : null}
                 </div>
 
              
                
 
                 <div>
                     <input id="password" name="password" type="text" placeholder='*******'
                         onChange={formik.handleChange}
                         onBlur={formik.handleBlur}
                         value={formik.values.password} />
                 </div>
                 <button type='submit'  onChange={formik.handleChange} onBlur={formik.handleBlur}> Submit</button>
             </form>
 
 
         </>
 
 
     )
 }