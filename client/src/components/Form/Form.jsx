import React, {useState} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'fornik';



export default function Form (){
const [sendForm, setSendForm] = useState(false);
return(
<>

<Formik
initialValues={{
    name: '',
    lastname: '',
    email: '',
    phone:'', // quizas un array??? ver
}}

validate={(valuesForm)=>{
     let errorsCheck = {} 

    //validate name:
    if(!valuesForm.name){
        errorsCheck.name = 'Pls write a name...'
    } else if(/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valuesForm.name)){
        errorsCheck.name = 'We need a name without numbers... '

    }
    //validate email:
    if(!valuesForm.email){
        errorsCheck.email = 'Pls write a email...'
    } else if(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(valuesForm.email)){
        errorsCheck.email = 'We need a email... '
    }
    return errorsCheck
}}
//funcion que se ejecuta en el submit cuando enviamos el form
onSubmit ={(valuesForm, {resetForm})=>{ 
    resetForm(); // limpio form
    setSendForm(true);
    setTimeout(()=> setSendForm(false), 5000);
    // alert('Formulario enviado');
    console.log(valuesForm);
}}
>
    
    {/* importaciones de formik */}
    {({errors})=> (  //renderer prop dentro de la funcion entonces le inyectamos valores de fornik -> handleSubmit
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
    <ErrorMessage name= 'name' component ={() => (
        <div>{errors.name}</div>
    )}/>
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
    // value={values.lastname}
    // onChange={handleChange}
    // onBlur={handleBlur}
    />
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
     <ErrorMessage name= 'email' component ={() => (
        <div>{errors.email}</div>
    )}/>
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
    {/*register*/}
    <div><button type='submit'>Register</button></div>
     { sendForm && <p>Form Successfully Sent!</p>} {/*elemento de interfaz */}
    </Form>
    )}

    <div>probando</div>

</Formik>


</>


)
}