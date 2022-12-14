import { useEffect, useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUsers, getDBUser } from '../../redux/actions'
import { CartContext } from "../Shopping/ShoppingCart";
import { Redirect } from 'react-router-dom'
// import bcrypt from "bcrypt";
import bcrypt from "bcryptjs-react";
// import { validate } from "./validateUserEdit";
import Swal from "sweetalert2";

import './UserEdit.css'

export default function UserEdit() {
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
        // setErrors(validate({ ...input, [e.target.name]: e.target.value }))
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
                            const response = await dispatch(updateUsers({...input, password: bcrypt.hashSync(input.password, 10) }))
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
                <h1>Change Password</h1>
                <hr />

                <div className="field">
                    <label className="label">Current Password</label>
                    <div className="control">
                        <input
                            placeholder={!Object.keys(user).length ? 'loading...' : '*********'}
                            name="password"
                            className="password"
                            type="text"
                            onChange={handleChangeTextBox}
                            value={input ? input.password : ''}
                        />
                    </div>
                    {errors.password &&
                        <p className="help-danger">{errors.password}</p>
                    }
                </div>

                <div className="field">
                    <label className="label">New Password</label>
                    <div className="control">
                        <input
                            placeholder={!Object.keys(user).length ? 'loading...' : '*********'}
                            name="password"
                            className="password"
                            type="text"
                            onChange={handleChangeTextBox}
                            value={input ? input.password : ''}
                        />
                    </div>
                    {errors.password &&
                        <p className="help-danger">{errors.password}</p>
                    }
                </div>

                <div className="field">
                    <label className="label">Repeat your Password</label>
                    <div className="control">
                        <input
                            placeholder={!Object.keys(user).length ? 'loading...' : '*********'}
                            name="password"
                            className="password"
                            type="text"
                            onChange={handleChangeTextBox}
                            value={input ? input.password : ''}
                        />
                    </div>
                    {errors.password &&
                        <p className="help-danger">{errors.password}</p>
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