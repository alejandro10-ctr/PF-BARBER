import React from 'react';
 import axios from 'axios';
 import { useFormik, yupToFormErrors } from 'formik';
 import * as Yup from "yup"
 
 export default function Register() {

  //const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
 
     const formik = useFormik({
         initialValues: {
             name: "",
             lastname: "",
             email: "",
             password: "",
             phone: "",
             birthday: "",
             user: "",
             genre: "",
             nickname: ""
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
                 .required('Required'),

            //  password: Yup.string().min(5).matches(passwordRules, {message: 'Please create a stronger password'})
            //  .require('Required'),
          
            
 
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
                     <input id="nickname" name="nickname" type="text" placeholder='nickname'
                         onChange={formik.handleChange}
                         onBlur={formik.handleBlur}
                         value={formik.values.nickname} 
                         />
 
                     {formik.touched.nickname && formik.errors.nickname ? <p>{formik.errors.nickname}</p> : null}
                 </div>

                 <div>
                     <input id="name" name="name" type="text" placeholder='Name....'
                         onChange={formik.handleChange}
                         onBlur={formik.handleBlur}
                         value={formik.values.name} 
                         />
 
                     {formik.touched.name && formik.errors.name ? <p>{formik.errors.name}</p> : null}
                 </div>
 
                 <div>
                     <input id="lastname" name="lastname" type="text" placeholder='Lastname..'
                         onChange={formik.handleChange}
                         onBlur={formik.handleBlur}
                         value={formik.values.lastname} />
 
                     {formik.touched.lastname && formik.errors.lastname ? <p>{formik.errors.lastname}</p> : null}
                 </div>
 
                 <div>
                     <input id="email" name="email" type="text" placeholder='brb@gmail.com'
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

                 <div>
                     <input id="phone" name="phone" type="number" placeholder='+54341324..'
                         onChange={formik.handleChange}
                         onBlur={formik.handleBlur}
                         value={formik.values.phone} />
                      {formik.touched.phone && formik.errors.phone ? <p>{formik.errors.phone}</p> : null}
                 </div>


                 <div>
                     <input id="birthday" name="birthday" type="birthday" placeholder='1994-02-10..'
                         onChange={formik.handleChange}
                         onBlur={formik.handleBlur}
                         value={formik.values.birthday} />
                      {formik.touched.birthday && formik.errors.birthday ? <p>{formik.errors.birthday}</p> : null}
                 </div>


                 <div>
                            <label><input type='radio' name='genre' value='man' />Men</label>
                            <label><input type='radio' name='genre' value='woman' />Woman</label>
                            <label><input type='radio' name='genre' value='binarie' />Non-binary</label>
                        </div>

                 <button type='submit'  onChange={formik.handleChange} onBlur={formik.handleBlur}> Submit</button>
             </form>
 
 
         </>
 
 
     )
 }