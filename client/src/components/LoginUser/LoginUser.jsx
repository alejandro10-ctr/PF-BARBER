import React from 'react';
 import axios from 'axios';
 import { useFormik } from 'formik';
 import { useHistory } from 'react-router-dom';
 import * as Yup from "yup"
 
 export default function LoginUser() {
  const history = useHistory();
 
     const formik = useFormik({
         initialValues: {
             user: "",
             password: "",
            
         },
        
         validationSchema: Yup.object({

          user: Yup.string()
          .max(15, "Must be 15 character or less")
          .required('Required'),

    
          password: Yup.string()
              .required('No password provided.')
              .min(8, 'Password is too short - should be 8 chars minimum.')
              .max(15, "Must be between 8 and 15 character"),
         
         



      }),
         
         onSubmit: async(values) => {
    
            console.log(values)
            await axios.post('http://localhost:3001/auth/login',  values)
            
            history.push('/')
         }
     })
 
     return (
         <>
             <h1>Login</h1>
             <form onSubmit={formik.handleSubmit}>
                 <div>
                     <input id="user" name="user" type="text" placeholder='Nickname'
                         onChange={formik.handleChange}
                         onBlur={formik.handleBlur}
                         value={formik.values.user} 
                         />
 
                     {formik.touched.user && formik.errors.user ? <p>{formik.errors.user}</p> : null}
                 </div>
 
              
                
 
                 <div>
                     <input id="password" name="password" type="text" placeholder='*******'
                         onChange={formik.handleChange}
                         onBlur={formik.handleBlur}
                         value={formik.values.password} />
                 </div>
                 <button type='submit'  onChange={formik.handleChange} onBlur={formik.handleBlur}> Submit</button>
             </form>
 
 {/* elton  */}
         </>
 
 
     )
 }