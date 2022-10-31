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
            await axios.post('http://localhost:3001/auth/login', values).then(cred=> document.cookie = `token=${cred.data.token}; max-age=${500*500}; path=/; samesite=strict`
            ).catch((error)=> {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${error.response.data.message}`
                  })
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

                        <div>
            <a className="enlace" href="http://localhost:3001/auth/google/signup">Iniciar con Google</a>
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