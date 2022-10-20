import React from 'react';
 import axios from 'axios';
 import { useFormik } from 'formik';
 import * as Yup from "yup"
 
 export default function Register() {
 
 
     const formik = useFormik({
         initialValues: {
             name: "",
             lastname: "",
             email: "",
             password: "",
             phone: "57-320-3301329",
             birthday: "2010-02-20",
             user: "yeiber",
             genre: "man"
         },
         validationSchema: Yup.object({
             name: Yup.string()
                 .max(15, "Must be 15 character or less")
                 .required('Required'),
             lastname: Yup.string()
                 .max(20, "Must be 20 character or less")
                 .required('Required'),
             email: Yup.string()
                 .email("Invalud email address")
                 .required('Required')
 
         }),
 
         
         onSubmit: async(values) => {
    
            console.log(values)
             console.log(await axios.post('http://localhost:3001/auth/register',  values))
 
         }
     })
 
     return (
         <>
             <h1>Create Account</h1>
             <form onSubmit={formik.handleSubmit}>
                 <div>
                     <input id="name" name="name" type="text" placeholder='Jean Pierre'
                         onChange={formik.handleChange}
                         onBlur={formik.handleBlur}
                         value={formik.values.name} 
                         />
 
                     {formik.touched.name && formik.errors.name ? <p>{formik.errors.name}</p> : null}
                 </div>
 
                 <div>
                     <input id="lastname" name="lastname" type="text" placeholder='Bourdieu'
                         onChange={formik.handleChange}
                         onBlur={formik.handleBlur}
                         value={formik.values.lastname} />
 
                     {formik.touched.lastname && formik.errors.lastname ? <p>{formik.errors.lastname}</p> : null}
                 </div>
 
                 <div>
                     <input id="email" name="email" type="text" placeholder='Jp@gmail.com'
                         onChange={formik.handleChange}
                         onBlur={formik.handleBlur}
                         value={formik.values.email} />
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