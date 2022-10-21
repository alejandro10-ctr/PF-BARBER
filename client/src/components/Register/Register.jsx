import React from 'react';
import axios from 'axios';
import { useFormik, yupToFormErrors } from 'formik';
import { useHistory } from 'react-router-dom';
import * as Yup from "yup";
import { Link } from 'react-router-dom';
import Select from 'react-select';
import styles from '../Register/Register.module.css';

export default function Register() {
    const history = useHistory();
    const phoneRegex = RegExp(
        /^((\+|)[0-9]{1,3}(-|\s)[0-9]{2,4}(-|\s)[0-9]{6,8})$/,
    );


    const formik = useFormik({
        initialValues: {
            name: "",
            lastname: "",
            email: "",
            password: "",
            phone: "",
            user: "",
            genre: "",

        },



        validationSchema: Yup.object({

            // nickname: Yup.string()
            // .max(15, "Must be 15 character or less")
            // .required('Required'),
            user: Yup.string()
                .max(15, "Must be 15 character or less")
                .required('Nickname required'),
            name: Yup.string()
                .max(15, "Must be 15 character or less")
                .required('Name required'),
            lastname: Yup.string()
                .max(20, "Must be 20 character or less")
                .required('Lastname required'),
            email: Yup.string()
                .email("Invalud email address")
                .required('Email required'),
            password: Yup.string()
                .required('No password provided')
                .min(8, 'At least 8 chars')
                .max(15, "Must be between 8 and 15 character"),

            phone: Yup.string().matches(phoneRegex, "Invalid phone").required("Phone is required"),

        }),


        onSubmit: async (values) => {

            console.log(values)
            console.log(await axios.post('http://localhost:3001/auth/register', values))
            history.push('/login')

        }

    })
    console.log(formik)

    const options = [
        { value: 'woman', label: 'Woman' },
        { value: 'man', label: 'Men' },
        { value: 'binarie', label: 'Non-Binarie' }
    ]

    return (
        <>
            <form onSubmit={formik.handleSubmit} className={styles.background}> <h1 className={styles.font}>Create Account</h1>
                <div class="container">
                    <div class="row">
                        <div class="col-sm"> <div className={styles.font}>
                            <input id="user" name="user" type="text" placeholder='Nickname'
                                class="form-control form-control-lg"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.user}
                            /> <span>{formik.touched.user && formik.errors.user ? <label>{formik.errors.user} </label> : null}<br /></span></div>


                            <div className={styles.font}>

                                <input id="name" name="name" type="text" placeholder='Name'
                                    class="form-control form-control-lg"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.name}
                                />  <span>{formik.touched.name && formik.errors.name ? <label>{formik.errors.name}</label> : null}<br /></span></div>


                            <div className={styles.font}>
                                <input id="lastname" name="lastname" type="text" placeholder='Lastname'
                                    class="form-control form-control-lg"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.lastname} />
                                <span> {formik.touched.lastname && formik.errors.lastname ? <label>{formik.errors.lastname}</label> : null}<br /> </span> </div>





                        </div>
                        <div class="col-sm">
                            <div className={styles.font}>
                                <input id="email" name="email" type="text" placeholder='sakura@gmail.com'
                                    class="form-control form-control-lg"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email} />
                                <span>{formik.touched.email && formik.errors.email ? <label>{formik.errors.email}</label> : null}<br /></span>    </div>


                            <div className={styles.font}>
                                <input id="password" name="password" type="text" placeholder='*******'
                                    class="form-control form-control-lg"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password} />
                                <span>{formik.touched.password && formik.errors.password ? <label>{formik.errors.password}</label> : null}<br /></span> </div>



                            <div className={styles.font}>
                                <input id="phone" name="phone" type="text" placeholder='54 341 3746374'
                                    class="form-control form-control-lg"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.phone} />

                                    <span>{formik.touched.phone && formik.errors.phone ? <label>{formik.errors.phone}</label> : null}<br /></span> </div>
                                
                           
                            <div>
                            </div>

                        </div>
                    </div><br />
                    {/* <select id="genre" name='genre' onChange={formik.handleChange}
                        onBlur={formik.handleBlur}  value={formik.values.genre}>
                        <option type="string" id="genre" name='genre'  value='man'>Men</option>
                        <option type="string" id="genre" name='genre'  value='woman'>Woman</option>
                        <option type="string" id="genre" name='genre'  value='binarie'>Non-binary</option>
                    </select> */}
                    <Select options={options} class="form-control form-control-lg" />
                     </div><br />
                
                <div className={styles.buttons}><button type='submit' onChange={formik.handleChange} onBlur={formik.handleBlur} class="btn btn-dark"> Submit</button>
                    <Link to='/'><button class="btn btn-dark">Home</button></Link></div>

            </form>


        </>


    )
}