import React from 'react';
import axios from 'axios';
import { useFormik, yupToFormErrors } from 'formik';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import * as Yup from "yup";
import { Link } from 'react-router-dom';
import Select from 'react-select';
// import PhoneInput from 'react-phone-number-input';
import MaskedInput from 'react-text-mask';
// import 'react-phone-number-input/style.css';
import styles from '../Register/Register.module.css';
import  { Redirect } from 'react-router-dom'
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
            await axios.post('http://localhost:3001/auth/register', values)
            history.push('/login')
        }

    })

    // const options = [
    //     { value: 'woman', label: 'Woman' },
    //     { value: 'man', label: 'Men' },
    //     { value: 'binarie', label: 'Non-Binarie' }
    // ]


    if(cookies.get('token')) {
        return <Redirect to='/'  />
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
                                        className="form-control form-control-lg"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.username}
                                    /> <span>{formik.touched.username && formik.errors.username ? <label className={styles.errors}>{formik.errors.username} </label> : null}<br /></span></div>
    
    
                                    {/* <div className={styles.font}>
    
                                        <input id="name" name="name" type="text" placeholder='Name'
                                            className="form-control form-control-lg"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.name}
                                        />  <span>{formik.touched.name && formik.errors.name ? <label className={styles.errors}>{formik.errors.name}</label> : null}<br /></span></div>
    
    
                                    <div className={styles.font}>
                                        <input id="lastname" name="lastname" type="text" placeholder='Lastname'
                                            className="form-control form-control-lg"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.lastname} />
                                        <span> {formik.touched.lastname && formik.errors.lastname ? <label className={styles.errors}>{formik.errors.lastname}</label> : null}<br /> </span> </div>
    
    
    
     */}
    
                                </div>
                                <div className="col-sm">
                                    <div className={styles.font}>
                                        <input id="email" name="email" type="text" placeholder='sakura@gmail.com'
                                            className="form-control form-control-lg"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.email} />
                                        <span>{formik.touched.email && formik.errors.email ? <label className={styles.errors}>{formik.errors.email}</label> : null}<br /></span>    </div>
    
    
                                    <div className={styles.font}>
                                        <input id="password" name="password" type="password" placeholder='Password'
                                            className="form-control form-control-lg"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.password} />
                                        <span>{formik.touched.password && formik.errors.password ? <label className={styles.errors}>{formik.errors.password}</label> : null}<br /></span> </div>
    
    
    
                                    <div className={styles.font}>
                                     
                            
                                            
    
    
    
    
                           
                                           
    
     {/* <MaskedInput   
      id="phone" name="phone" type="text" 
      placeholder='Phone Number'
      className="form-control form-control-lg"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.phone}
                            mask={[ /[1-9]/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
                          /> */}
         
         
    
                                        {/* <PhoneInput
                                            placeholder="Enter phone number"
                                            value={valuePhone}
                                            onChange={setPhone}
                                            id="phone"
                                            name='phone' */}
    
                                        {/* onChange={formik.handleChange('phone')}
                                             onBlur={formik.handleBlur('phone')}
                                        
    
                                        /> */}
    
    <div>
            <a className="enlace" href="http://localhost:3001/auth/google/callback">Registrase con Google</a>
        </div>
    
                                        {/* <span>{formik.touched.phone && formik.errors.phone ? <label className={styles.errors}>{formik.errors.phone}</label> : null}<br /></span> */}
    
                                    {/* </div> */}
                                    {/* <div> */}
                                    </div>
    
                                </div>
                            </div><br />
                            {/* <select id="genre" name='genre' onChange={formik.handleChange}
                            onBlur={formik.handleBlur}  value={formik.values.genre}>
                            <option type="string" id="genre" name='genre'  value='man'>Men</option>
                            <option type="string" id="genre" name='genre'  value='woman'>Woman</option>
                            <option type="string" id="genre" name='genre'  value='binarie'>Non-binary</option>
                        </select> */}
                            {/* <Select options={options} className="form-control form-control-lg" /> */}
                        </div><br />
                        <div>
                            <div><Link to='/'><button className={styles.buttonblue}>Home</button></Link>
                                <button className={styles.buttonred} type='submit' onChange={formik.handleChange} onBlur={formik.handleBlur}> Submit</button>
                            </div>
                        </div>
                    </form>
    
                </div>
            </>
    
    
        )

    }
}