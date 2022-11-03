import React, {useContext} from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import * as Yup from "yup"
import  { Redirect } from 'react-router-dom'
import Cookies from 'universal-cookie';
import Swal from 'sweetalert2'
import { CartContext } from "../Shopping/ShoppingCart";


import styles from '../LoginUser/LoginUser.module.css'

export default function LoginUser() {
    
  const { logIn} = useContext(CartContext)
    const history = useHistory();
    const cookies = new Cookies()

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",

        },

        validationSchema: Yup.object({

            username: Yup.string()
                .max(15, "Between 15 chars or less")
                .required('Required'),


            password: Yup.string()
                .required('No password provided')
                .min(8, 'At least 8 chars')
                .max(15, "Between 8 and 15 chars"),

        }),

        onSubmit: async (values) => {

            console.log(values)
            await axios.post('https://barber-deploy.herokuapp.com/auth/login', values).then(cred=> document.cookie = `token=${cred.data.token}; max-age=${500*500}; path=/; samesite=strict`
            ).catch((error)=> {
                return (Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${error.response.data.message}`
                  }))
            })
            logIn()
            history.push('/')
        }
    })

    if(cookies.get('token')) {
        return <Redirect to='/'  />
    } else {
        return (
            <>
    <div className={styles.background}>
                <div className={styles.conteiner}>
                    <form onSubmit={formik.handleSubmit}>
    
                        {/* <!-- user input //nickname --> */}
                        <div>
                        <h1 className={styles.title}>Sign in!</h1>
                            <input id="username" name="username" type="text" placeholder='Nickname'
                                className="form-control form-control-lg"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.username}
                            />  <span>{formik.touched.username && formik.errors.username ? <label className={styles.errors}>{formik.errors.username}</label> : null}<br /></span> </div>
    
                        {/*  Password input  */}
                        <div className="form-outline mb-4">
                            <input id="password" name="password" type="password" placeholder='Password'
                                className="form-control form-control-lg"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password} />
                                <span>{formik.touched.password && formik.errors.password ? <label className={styles.errors}>{formik.errors.password}</label> : null}<br /></span>
                        </div>
<br />
                        <div>
            <a class="btn btn-primary btn-sm" href={`https://barber-deploy.herokuapp.com/auth/google/signup`}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-google" viewBox="0 0 16 16">
  <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"/>
</svg> Login with Google</a>
        </div>
    
                        {/*  submit - home  */}
                        <div>
                            <div><Link to='/'><button className={styles.buttonblue}>Home</button></Link>
                                <button className={styles.buttonred} type='submit' onChange={formik.handleChange} onBlur={formik.handleBlur}> Submit</button>
                                </div>
                        </div>
    
                    </form>
    
                </div>
                </div>
    
    
            </>
    
    
        )
    }
}