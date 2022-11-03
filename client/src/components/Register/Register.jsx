import React from 'react';
import axios from 'axios';
import { useFormik, yupToFormErrors } from 'formik';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import * as Yup from "yup";
import { Link } from 'react-router-dom';
import Select from 'react-select';
// import PhoneInput from 'react-phone-number-input';
import Swal from 'sweetalert2'

import MaskedInput from 'react-text-mask';
// import 'react-phone-number-input/style.css';
import styles from '../Register/Register.module.css';
import { Redirect } from 'react-router-dom'
import Cookies from 'universal-cookie';

export default function Register() {

    const cookies = new Cookies()
    const history = useHistory();
    const phoneRegex = RegExp(
        /^((\+|)[0-9]{1,3}(-|\s)[0-9]{2,4}(-|\s)[0-9]{6,8})$/,
    );

    const [valuePhone, setPhone] = useState()

    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
        },



        validationSchema: Yup.object({

            // nickname: Yup.string()
            // .max(15, "Must be 15 character or less")
            // .required('Required'),
            username: Yup.string()

                .min(6, "At Least 6 chars.")
                .max(15, "Must be 15 character or less")
                .required('Nickname required'),
            email: Yup.string()
                .email("Invalud email address")
                .required('Email required'),
            password: Yup.string()
                .required('No password provided')
                .min(8, 'At least 8 chars')
                .max(15, "Must be between 8 and 15 character")

        }),


        onSubmit: async (values) => {
            await axios.post('https://barber-deploy.herokuapp.com/auth/register', values).then(res=> (Swal.fire({
                icon: 'success',
                title: `${res.data.message}`,
                showConfirmButton: false,
                timer: 2000
              }))).catch(error=> (Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${error.response.data.error}`
              })) )
            history.push('/login')
        }

    })

    // const options = [
    //     { value: 'woman', label: 'Woman' },
    //     { value: 'man', label: 'Men' },
    //     { value: 'binarie', label: 'Non-Binarie' }
    // ]


    if (cookies.get('token')) {
        return <Redirect to='/' />
    } else {

        return (
            <>
                <div className={styles.background}>
                    <form onSubmit={formik.handleSubmit} className={styles.box}>
                        <h1 className={styles.title}>Create Account</h1>
                        <div className="container">
                            <div className="row">
                                <div className="col-sm"> <div className={styles.font}>
                                    <input id="username" name="username" type="text" placeholder='Nickname'
                                        className="form-control form-control-lg w-50 p-2 "
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.username}
                                    /> <span>{formik.touched.username && formik.errors.username ? <label className={styles.errorsName}>{formik.errors.username} </label> : null}<br /></span></div>



                                </div>
                                <div >
                                    <div className={styles.font}>
                                        <input id="email" name="email" type="text" placeholder='barbers@gmail.com'
                                            className="form-control form-control-lg w-50 p-2"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.email} />
                                        <span>{formik.touched.email && formik.errors.email ? <label className={styles.errorsMail}>{formik.errors.email}</label> : null}<br /></span>    </div>


                                    <div className={styles.font}>
                                        <input id="password" name="password" type="password" placeholder='Password'
                                            className="form-control form-control-lg w-50 p-2"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.password} />
                                        <span>{formik.touched.password && formik.errors.password ? <label className={styles.errorsPassword}>{formik.errors.password}</label> : null}<br /></span> </div>

                            
                                    <div className={styles.font}>
                                        <div>
                                            {/* <a className="enlace" href="http://localhost:3001/auth/google/callback">Registrase con Google</a> */}
                                        </div>
                                        <div className={styles.move}><br /><br />
                                            <a class="btn btn-primary btn-sm" href={`https://barber-deploy.herokuapp.com/auth/google/signup`}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-google" viewBox="0 0 16 16">
                                                <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                                            </svg>  Register with Google</a>   
                                            
                                            
                                            <div>
                            <div><Link to='/'><button className={styles.red}>Home</button></Link>
                                <button className={styles.blue}  type='submit' onChange={formik.handleChange} onBlur={formik.handleBlur}> Submit</button>
                            </div>
                        </div>
                                        </div>

                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                     
                    </form>

                </div>
            </>


        )

    }
}