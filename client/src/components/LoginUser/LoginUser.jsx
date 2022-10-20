import axios from 'axios';
import React from "react";
import { Formik } from "formik";


//el buenardo del form
const initialValues = {
  email: "",
  password: "",
  
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

const submitForm = async (values) => {
//await axios.post('http://localhost:3001/auth/login ', values)
console.log(values);
  alert('User log')  
  
};


const FormLogin = () => {
  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
    //   onSubmit={submitForm}
   
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
          dirty,
          
        } = formik;
        return (
          <div class="container"> 
          <div class="row">
          <div class="col-md-6"> 
          <div class="card">

          
            <h1>Sing In</h1>
            <form onSubmit={submitForm} class="box">
              <div className="form-row">
  
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

export default FormLogin;