<<<<<<< HEAD
import React from "react";
import { Formik } from "formik";
=======
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios'
>>>>>>> 30e58f27b34816d4748c053c6a376791d6bfef42

import styles from '../Form/Form.module.css';

const initialValues = {
  email: "",
  password: "",
  name: "",
  lastname: "",
  adress: "",
  phone: "",
};

<<<<<<< HEAD
const validate = (values) => {
  let errors = {};
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
=======
export default function Formu() {
    const [sendForm, setSendForm] = useState(false);
    return (
        <>
>>>>>>> 30e58f27b34816d4748c053c6a376791d6bfef42

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!regex.test(values.email)) {
    errors.email = "Invalid Email";
  }

<<<<<<< HEAD
  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 4) {
    errors.password = "Password too short";
  }

  return errors;
};

const submitForm = (values) => {
  console.log(values);
};
=======
                // validate={(valuesForm) => {
                //     let errorsCheck = {}

                //     //validate name:
                //     if (!valuesForm.name) {
                //         errorsCheck.name = 'Pls Write Your Name...'
                //     } else if (/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valuesForm.name)) {
                //         errorsCheck.name = 'We need your name without numbers... '
                //     }
                //     //validate lastname
                //     if (!valuesForm.lastname) {
                //         errorsCheck.lastname = 'Pls Write Your Lastname...'
                //     } else if (/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valuesForm.lastname)) {
                //         errorsCheck.lastname = 'Write your lastname without numbers... 
                //     }

                //     //validate email:
                //     if (!valuesForm.email) {
                //         errorsCheck.email = 'A email is required...'
                //     } else if (/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(valuesForm.email)) {
                //         errorsCheck.email = 'We need a email... '
                //     }
                //     //validate password
                //     if (!valuesForm.password) {
                //         errorsCheck.password = 'Your password is required...'
                //     } else if (/^(?=.*\d)(?=.*[a-zA-Z]).{6,20}$/.test(valuesForm.password)) {
                //         errorsCheck.password = 'Minimum six characters & maximum 16 characters. At least one special character, At least one number & Special characters are optional... '
                //     }
                //     //validate phone
                //     if (!valuesForm.phone) {
                //         errorsCheck.phone = 'Your phone number is required...'
                //     } else if (/^((+|)[0-9]{1,3}(-|\s)[0-9]{2,4}(-|\s)[0-9]{6,8})$/.test(valuesForm.phone)) {
                //         errorsCheck.phone = 'Type your phone with the code area...'
                //     }
                //     return errorsCheck
                // }}
                //funcion que se ejecuta en el submit cuando enviamos el form
                onSubmit={(valuesForm, { resetForm }) => {
                    resetForm(); // limpio form
                    setSendForm(true);
                    setTimeout(() => setSendForm(false), 5000);
                    // alert('Formulario enviado');
                    axios.post('http://localhost:3001/auth/register', valuesForm)
                    console.log(valuesForm);
                }}
            >
                {/* importaciones de formik */}
                {({ errors }) => (  //renderer prop dentro de la funcion entonces le inyectamos valores de fornik -> handleSubmit
                    <Form>
                        {/* name */}
                        <div>
                            <label htmlFor="name">Name</label>
                            <Field     // el componente field permite manejar sin necesidad de pasarle las funciones coomentadas ya que por defecto hace esa logica
                                type="text"
                                id='name'
                                name='name'
                                placeholder='Your Name is....'
                            // value={values.name}
                            // onChange={handleChange}
                            // onBlur={handleBlur} // cuando da click al form ejecuta funcion que valida el campo.
                            />
                            <ErrorMessage name='name' component={() => (
                                <div>{errors.name}</div>
                            )} />
                            {/* {touched.name && errors.name && <div>{errors.name}</div>} */}
                        </div>
>>>>>>> 30e58f27b34816d4748c053c6a376791d6bfef42

const Form = () => {
  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={submitForm}
    >
      {(formik) => {
        const {
          values,
          handleChange,
          handleSubmit,
          errors,
          touched,
          handleBlur,
          isValid,
          dirty
        } = formik;
        return (
          <div class="container" className={styles.background}> 
          <div class="row">
          <div class="col-md-6"> 
          <div class="card">

          
            <h1>Register</h1>
            <form onSubmit={handleSubmit} class="box">
              <div className="form-row">
             
                          
              <label htmlFor="email">Name</label>
                <input
                  type="name"
                  name="name"
                  id="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.name && touched.name ? "input-error" : null
                  }
                />      <br />     

<<<<<<< HEAD
                <label htmlFor="lastname">Lastname</label>
                <input
                  type="lastname"
                  name="lastname"
                  id="lastname"
                  value={values.lastname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.lastname && touched.lastname ? "input-error" : null
                  }
                />  <br />

                <label htmlFor="adress">Adress</label>
                <input
                  type="adress"
                  name="adress"
                  id="adress"
                  value={values.adress}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.adress && touched.adress ? "input-error" : null
                  }
                />  <br />
=======
                        {/*phone*/}
                        <div>
                            <label htmlFor="phone">Phone</label>
                            <Field
                                type="text"
                                id='phone'
                                name='phone'
                                placeholder='543413307791....'
                            // value={values.phone}
                            // onChange={handleChange}
                            // onBlur={handleBlur}
                            />
                            <ErrorMessage name='phone' component={() => (
                                <div>{errors.phone}</div>
                            )} />
                            {/* {errors.phone && <div>{errors.phone}</div>} */}
                        </div>

                        {/*genre*/}
                        {/* <div>
                            <label><Field type='radio' name='genre' value='man' />Men</label>
                            <label><Field type='radio' name='genre' value='woman' />Woman</label>
                            <label><Field type='radio' name='genre' value='binarie' />Non-binary</label>
                        </div> */}
>>>>>>> 30e58f27b34816d4748c053c6a376791d6bfef42

                <label htmlFor="phone">Phone</label>
                <input
                  type="phone"
                  name="phone"
                  id="phone"
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.phone && touched.phone ? "input-error" : null
                  }
                />  <br />

                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.email && touched.email ? "input-error" : null
                  }
                />
                {errors.email && touched.email && (
                  <span className="error">{errors.email}</span>
                )}
              </div>

              <div className="form-row">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.password && touched.password ? "input-error" : null
                  }
                />
                {errors.password && touched.password && (
                  <span className="error">{errors.password}</span>
                )}
              </div>

              <button
                type="submit"
                className={!(dirty && isValid) ? "disabled-btn" : ""}
                disabled={!(dirty && isValid)}
              >
                Sign In
              </button>
            </form>
            </div>
          </div>
          </div>
          </div>
        );
      }}
    </Formik>
  );
};

export default Form;