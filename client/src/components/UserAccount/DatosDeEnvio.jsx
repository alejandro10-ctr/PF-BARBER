import { useEffect, useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUsers, getDBUser } from '../../redux/actions'
import { CartContext } from "../Shopping/ShoppingCart";
import { Redirect } from 'react-router-dom'
// import bcrypt from "bcrypt";
import bcrypt from "bcryptjs-react";
import { validate } from "./validateUserEdit";
import Swal from "sweetalert2";

import './UserEdit.css'

export default function DatosDeEnvio() {
    const [input, setInput] = useState()
    const [errors, setErrors] = useState({})
    const { userId, } = useContext(CartContext)
    const dispatch = useDispatch()
    let user = useSelector(state => state.user)
    useEffect(() => {
        if (!Object.keys(user).length && userId) {
            dispatch(getDBUser(userId))
        }
        if (Object.keys(user).length && userId) {
            setInput({ ...user })
        }
    }, [user])

    const handleChangeTextBox = (e) => {
        setErrors(validate({ ...input, [e.target.name]: e.target.value }))
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    if (userId) {
        return (
            <form onSubmit={(e) => {
                e.preventDefault()
                if (!Object.keys(errors).length) {
                    Swal.fire({
                        title: 'Do you want to save the changes?',
                        showDenyButton: true,
                        confirmButtonText: 'Save',
                        denyButtonText: `Don't save`,
                        timer: 5000
                    }).then(async (result) => {
                        /* Read more about isConfirmed, isDenied below */
                        if (result.isConfirmed) {
                            const response = await dispatch(updateUsers({...input }))
                            const Toast = Swal.mixin({
                                toast: true,
                                position: 'bottom-end',
                                showConfirmButton: false,
                                timer: 4000,
                                timerProgressBar: true,
                                didOpen: (toast) => {
                                    toast.addEventListener('mouseenter', Swal.stopTimer)
                                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                                }
                            })
                            Toast.fire({
                                icon: 'success',
                                title: response
                            })


                        }
                    })
                } else {
                    Swal.fire({
                        icon: "warning",
                        title: "Oops...",
                        text: Object.values(errors).join(", "),
                    });
                }
            }}>
                <h1>Shipping Info</h1>
                <div className="field">
                    <label className="label">First Name *</label>
                    <div className="control">
                        <input
                            placeholder={!Object.keys(user).length ? 'loading...' : 'Name'}
                            name="name"
                            className="name"
                            type="text"
                            onChange={handleChangeTextBox}
                            value={input ? input.name : ''}
                        />
                    </div>
                    {errors.name &&
                        <p className="help-danger">{errors.name}</p>
                    }
                </div>
                <div className="field">
                    <label className="label">Last Name *</label>
                    <div className="control">
                        <input
                            placeholder={!Object.keys(user).length ? 'loading...' : 'Lastname'}
                            name="lastname"
                            className="lastname"
                            type="text"
                            onChange={handleChangeTextBox}
                            value={input ? input.lastname : ''}
                        />
                    </div>
                    {errors.lastname &&
                        <p className="help-danger">{errors.lastname}</p>
                    }
                </div>
                <div className="field">
                    <label className="label">Street Adress *</label>
                    <div className="control">
                        <input
                            placeholder={!Object.keys(user).length ? 'loading...' : '1234 Main St'}
                            name="address"
                            className="address"
                            type="text"
                            onChange={handleChangeTextBox}
                            value={input ? input.address : ''}
                        />
                    </div>
                    {errors.address &&
                        <p className="help-danger">{errors.address}</p>
                    }
                </div>
                <div className="field">
                    <label className="label">Any description</label>
                    <div className="control">
                        <input
                            placeholder={!Object.keys(user).length ? 'loading...' : 'Apartament or suite'}
                            name="addressDescription"
                            className="addressDescription"
                            type="text"
                            onChange={handleChangeTextBox}
                            value={input ? input.addressDescription : ''}
                        />
                    </div>
                    {errors.addressDescription &&
                        <p className="help-danger">{errors.addressDescription}</p>
                    }
                </div>
                <div className="field">
                    <label className="label">City</label>
                    <div className="control">
                        <input
                            placeholder={!Object.keys(user).length ? 'loading...' : 'New York'}
                            name="city"
                            className="city"
                            type="text"
                            onChange={handleChangeTextBox}
                            value={input ? input.city : ''}
                        />
                    </div>
                    {errors.city &&
                        <p className="help-danger">{errors.city}</p>
                    }
                </div>
                <div className="field">
                    <label className="label">Zip Code</label>
                    <div className="control">
                        <input
                            placeholder={!Object.keys(user).length ? 'loading...' : '1234'}
                            name="zipCode"
                            className="zipCode"
                            type="text"
                            onChange={handleChangeTextBox}
                            value={input ? input.zipCode : ''}
                        />
                    </div>
                    {errors.zipCode &&
                        <p className="help-danger">{errors.zipCode}</p>
                    }
                </div>
                <div className="field">
                    <label className="label">Phone Number</label>
                    <div className="control">
                        <input
                            placeholder={!Object.keys(user).length ? 'loading...' : '000-000-0000000'}
                            name="phone"
                            className="phone"
                            type="text"
                            onChange={handleChangeTextBox}
                            value={input ? input.phone : ''}
                        />
                    </div>
                    {errors.phone &&
                        <p className="help-danger">{errors.phone}</p>
                    }
                </div>
                

                {!Object.keys(user).length
                    ? <h4>Loading...</h4>
                    :
                    <button className='button' type="submit">Submit</button>
                }
            </form>
        )
    } else {
        return <Redirect to='/' />
    }
}