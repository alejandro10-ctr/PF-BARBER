import React from "react";
import { Formik } from "formik";

import styles from '../Form/Form.module.css';
//el buenardo del form
const initialValues = {
  email: "",
  password: "",
  name: "",
  lastname: "",
  adress: "",
  phone: "",
};

const validate = (values) => {
  let errors = {};
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!regex.test(values.email)) {
    errors.email = "Invalid Email";
  }

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