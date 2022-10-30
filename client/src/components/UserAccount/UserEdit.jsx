import { useEffect, useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from 'react-router-dom'
import { updateUsers, getDBUser } from '../../redux/actions'
import { CartContext } from "../Shopping/ShoppingCart";
import { BsPersonSquare } from "react-icons/bs";
// import bcrypt from "bcrypt";
import bcrypt from "bcryptjs-react";
import { validateUser } from "./validate";
import Swal from "sweetalert2";
import ShowAddresses from "./Addresses";

import './UserEdit.css'

export default function UserEdit() {
    const [input, setInput] = useState()
    const [errors, setErrors] = useState({})
    const [ini, setIni] = useState(false);
    const { userId, } = useContext(CartContext)
    const dispatch = useDispatch()
    let user = useSelector(state => state.user)
    useEffect(() => {
        if (!Object.keys(user).length && userId) {
            dispatch(getDBUser(userId))
        }
        if (Object.keys(user).length && userId) {

            setErrors(validateUser({ ...user }))
            setIni(true)
            setInput({ ...user })
        }
    }, [user])

    const handleChangeTextBox = (e) => {
        setIni(true)
        setErrors(validateUser({ ...input, [e.target.name]: e.target.value }))
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    if (userId) {
        return (<>

            <h1>Edit user</h1>
            <hr />
            <div>
                <Link className='button' to='/useredit/shippinginfo/0' >Create address</Link>
                <a href="">Change Password</a>
            </div>
            <form onSubmit={(e) => {
                e.preventDefault()
                if (ini) {
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
                                console.log(input)
                                delete input.password
                                if (!input.avatar) {
                                    delete input.avatar
                                }
                                const response = await dispatch(updateUsers({ ...input }))
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
                } else {
                    setErrors(validateUser({ ...input }))
                    setIni(true)
                }
            }}>
                {
                    input &&
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <div className="cardProfile">
                            <div className='barra'>
                                <div className='imgDivBarra'>
                                    <img className="imgProfile" src={input?.avatar ? input.avatar.toString() : 'https://cdn.icon-icons.com/icons2/1146/PNG/512/1486485581-account-audience-person-customer-profile-user_81164.png'} alt="" />
                                </div>
                                <div className='nameBarra'>
                                    <h2>{input?.name ? input.name : ''}</h2>
                                    <h4>@{input?.user}</h4>
                                </div>
                            </div>
                            <div className='imgDiv'>
                                <img className="imgProfile" src={input?.avatar ? input.avatar.toString() : 'https://cdn.icon-icons.com/icons2/1146/PNG/512/1486485581-account-audience-person-customer-profile-user_81164.png'} alt="" />
                            </div>
                            <div className='info'>
                                <div className='name'>
                                    <h2>{input?.name ? input.name : '' + ' ' + input?.lastname ? input.lastname : ''}</h2>
                                    <h4>@{input?.username}</h4>
                                </div>
                                <p className='textProfile'>
                                    {input?.email}
                                </p>
                            </div>
                        </div>
                    </div>
                }








                <div className="field">
                    <label className="label">Name</label>
                    <div className="control">
                        <input
                            placeholder={!Object.keys(user).length ? 'loading...' : 'Name'}
                            name="name"
                            className="name"
                            type="text"
                            onChange={handleChangeTextBox}
                            value={input?.name ? input.name : ''}
                        />
                    </div>
                    {errors.name &&
                        <p className="help-danger">{errors.name}</p>
                    }
                </div>
                <div className="field">
                    <label className="label">Lastname</label>
                    <div className="control">
                        <input
                            placeholder={!Object.keys(user).length ? 'loading...' : 'Lastname'}
                            name="lastname"
                            className="lastname"
                            type="text"
                            onChange={handleChangeTextBox}
                            value={input?.lastname ? input.lastname : ''}
                        />
                    </div>
                    {errors.lastname &&
                        <p className="help-danger">{errors.lastname}</p>
                    }
                </div>
                <div className="field">
                    <label className="label">Phone</label>
                    <div className="control">
                        <input
                            placeholder={!Object.keys(user).length ? 'loading...' : '000-000-0000000'}
                            name="phone"
                            className="phone"
                            type="text"
                            onChange={handleChangeTextBox}
                            value={input?.phone ? input.phone : ''}
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


            <ShowAddresses />
        </>
        )
    } else {
        return <Redirect to='/' />
    }
}