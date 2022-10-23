import React from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import * as Yup from "yup"
import  { Redirect } from 'react-router-dom'
import Cookies from 'universal-cookie';

import styles from '../LoginUser/LoginUser.module.css'

export default function LoginUser() {
    const history = useHistory();
    const cookies = new Cookies()

    const formik = useFormik({
        initialValues: {
            user: "",
            password: "",

        },

        validationSchema: Yup.object({

            user: Yup.string()
                .max(15, "Between 15 chars or less")
                .required('Required'),


            password: Yup.string()
                .required('No password provided')
                .min(8, 'At least 8 chars')
                .max(15, "Between 8 and 15 chars"),

        }),

        onSubmit: async (values) => {

            console.log(values)
            await axios.post('http://localhost:3001/auth/login', values).then(cred=> document.cookie = `token=${cred.data.data}; max-age=${500*500}; path=/; samesite=strict`
            )
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
                            <input id="user" name="user" type="text" placeholder='Nickname'
                                class="form-control form-control-lg"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.user}
                            />  <span>{formik.touched.user && formik.errors.user ? <label className={styles.errors}>{formik.errors.user}</label> : null}<br /></span> </div>
    
                        {/*  Password input  */}
                        <div class="form-outline mb-4">
                            <input id="password" name="password" type="text" placeholder='*******'
                                class="form-control form-control-lg"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password} />
                                <span>{formik.touched.password && formik.errors.password ? <label className={styles.errors}>{formik.errors.password}</label> : null}<br /></span>
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