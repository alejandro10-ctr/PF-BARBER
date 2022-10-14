import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'fornik';



export default function Form() {
    const [sendForm, setSendForm] = useState(false);
    return (
        <>

            <Formik
                initialValues={{
                    name: '',
                    lastname: '',
                    password: '', //ver 
                    email: '',
                    phone: '', // quizas un array??? ver
                }}

                validate={(valuesForm) => {
                    let errorsCheck = {}

                    //validate name:
                    if (!valuesForm.name) {
                        errorsCheck.name = 'Pls Write Your Name...'
                    } else if (/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valuesForm.name)) {
                        errorsCheck.name = 'We need your name without numbers... '
                    }
                    //validate lastname
                    if (!valuesForm.lastname) {
                        errorsCheck.lastname = 'Pls Write Your Lastname...'
                    } else if (/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valuesForm.lastname)) {
                        errorsCheck.lastname = 'Write your lastname without numbers... '
                    }

                    //validate email:
                    if (!valuesForm.email) {
                        errorsCheck.email = 'A email is required...'
                    } else if (/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(valuesForm.email)) {
                        errorsCheck.email = 'We need a email... '
                    }
                    //validate password
                    if (!valuesForm.password) {
                        errorsCheck.password = 'Your password is required...'
                    } else if (/^(?=.*\d)(?=.*[a-zA-Z]).{6,20}$/.test(valuesForm.password)) {
                        errorsCheck.password = 'Minimum six characters & maximum 16 characters. At least one special character, At least one number & Special characters are optional... '
                    }
                    //validate phone
                    if (!valuesForm.phone) {
                        errorsCheck.phone = 'Your phone number is required...'
                    } else if (/^((+|)[0-9]{1,3}(-|\s)[0-9]{2,4}(-|\s)[0-9]{6,8})$/.test(valuesForm.phone)) {
                        errorsCheck.phone = 'Type your phone with the code area...'
                    }
                    return errorsCheck
                }}
                //funcion que se ejecuta en el submit cuando enviamos el form
                onSubmit={(valuesForm, { resetForm }) => {
                    resetForm(); // limpio form
                    setSendForm(true);
                    setTimeout(() => setSendForm(false), 5000);
                    // alert('Formulario enviado');
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

                        {/*lastname*/}
                        <div>
                            <label htmlFor="lastname">Lastname</label>
                            <Field
                                type="text"
                                id='lastname'
                                name='lastname'
                                placeholder='Your Lastname is....'
                            />
                             <ErrorMessage name='lastname' component={() => (
                                <div>{errors.lastname}</div>
                            )} />
                        </div>

                        {/*mail*/}
                        <div>
                            <label htmlFor="email">Email</label>
                            <Field
                                type="text"
                                id='email'
                                name='email'
                                placeholder='email@gmail.com....'
                            // value={values.email}
                            // onChange={handleChange}
                            // onBlur={handleBlur}
                            />
                            <ErrorMessage name='email' component={() => (
                                <div>{errors.email}</div>
                            )} />
                            {/* {touched.email && errors.email && <div>{errors.email}</div>}  si clickea el campo y clickea afuera sin hacer cambios ->touched */}
                        </div>

                        {/*phone*/}
                        <div>
                            <label htmlFor="phone">Phone</label>
                            <Field
                                type="number"
                                id='phone'
                                name='phone'
                                placeholder='3413307791....'
                            // value={values.phone}
                            // onChange={handleChange}
                            // onBlur={handleBlur}
                            />
                            {/* {errors.phone && <div>{errors.phone}</div>} */}
                        </div>

                        {/*genre*/}
                        <div>
                            <label><Field type='radio' name='genre' value='man' />Men</label>
                            <label><Field type='radio' name='genre' value='woman' />Woman</label>
                            <label><Field type='radio' name='genre' value='binarie' />Non-binary</label>
                        </div>

                        {/*password*/}
                        <div>
                            <label htmlFor="password">Password</label>
                            <Field
                                type="number"
                                id='password'
                                name='password'
                                placeholder='3413307791....'
                            />
                            {/* {errors.phone && <div>{errors.phone}</div>} */}
                        </div>

                        <ErrorMessage name='password' component={() => (
                            <div>{errors.password}</div>
                        )} />

                        {/*register*/}
                        <div><button type='submit'>Register</button></div>
                        {sendForm && <p>Form Successfully Sent!</p>} {/*elemento de interfaz */}
                    </Form>
                )}

            </Formik>


        </>


    )
}