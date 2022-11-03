import { useEffect, useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDBAddress, createAddress, updateAddress } from '../../redux/actions'
import { CartContext } from "../Shopping/ShoppingCart";
import { Redirect, useHistory } from 'react-router-dom'
// import bcrypt from "bcrypt";
import './Addresses.css'

import bcrypt from "bcryptjs-react";
import { validateAddress } from "./validate";
import Swal from "sweetalert2";

import './UserEdit.css'

export default function DatosDeEnvio({ addressId }) {
    const [input, setInput] = useState()
    const [errors, setErrors] = useState({})
    const [ini, setIni] = useState(false);
    const { userId, } = useContext(CartContext)
    const history = useHistory();
    const dispatch = useDispatch()
    let detailaddress = useSelector(state => state.detailaddress)
    useEffect(async () => {
        detailaddress = {}
    }, [addressId])
    useEffect(async () => {
        if (!Object.keys(detailaddress).length && userId && addressId) {
            const { response } = await dispatch(getDBAddress(addressId))
            if (response) {
                history.goBack()
            }
        }
        if (Object.keys(detailaddress).length && userId && addressId) {
            
            setErrors(validateAddress({ ...detailaddress }))
            setIni(true)
            setInput({ ...detailaddress })
        } else {
            setInput({
                personReceives: '',
                phoneReceives: '',
                address: '',
                descriptionPlace: '',
                zipCode: '',
                country: '',
            })
        }
    }, [detailaddress])

    const handleChangeTextBox = (e) => {
        setIni(true)
        setErrors(validateAddress({ ...input, [e.target.name]: e.target.value }))
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    if (userId) {
        return ( <div className="box">
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
                                if (addressId) {
                                    if (await dispatch(updateAddress({ ...input }))) {
                                        history.goBack()
                                    }

                                }
                                else {
                                    if (await dispatch(createAddress({ ...input }, userId))) {
                                        history.goBack()
                                    }
                                }



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
                    setErrors(validateAddress({ ...input }))
                    setIni(true)
                }
            }}>
                <h1>{addressId?'Update address':'Create address'}</h1>
                <div className="field">
                    <label className="label">Person receives *</label>
                    <div className="control">
                        <input
                            placeholder={
                                addressId ?
                                    !Object.keys(detailaddress).length ?
                                        'loading...' :
                                        'Name'
                                    : 'Name'
                            }
                            name="personReceives"
                            className="personReceives"
                            type="text"
                            onChange={handleChangeTextBox}
                            value={input ? input.personReceives : ''}
                        />
                    </div>
                    {errors.personReceives &&
                        <p className="help-danger">{errors.personReceives}</p>
                    }
                </div>
                <div className="field">
                    <label className="label">Phone receives Number</label>
                    <div className="control">
                        <input
                            placeholder={addressId ?
                                !Object.keys(detailaddress).length ?
                                    'loading...' :
                                    '000-000-0000000'
                                :
                                '000-000-0000000'
                            }
                            name="phoneReceives"
                            className="phoneReceives"
                            type="text"
                            onChange={handleChangeTextBox}
                            value={input ? input.phoneReceives : ''}
                        />
                    </div>
                    {errors.phoneReceives &&
                        <p className="help-danger">{errors.phoneReceives}</p>
                    }
                </div>
                <div className="field">
                    <label className="label">Street Adress *</label>
                    <div className="control">
                        <input
                            placeholder={addressId ?
                                !Object.keys(detailaddress).length ?
                                    'loading...' :
                                    '1234 Main St'
                                :
                                '1234 Main St'
                            }
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
                    <label className="label">Any description place</label>
                    <div className="control">
                        <input
                            placeholder={addressId ?
                                !Object.keys(detailaddress).length ?
                                    'loading...' :
                                    'Apartament or suite'
                                :
                                'Apartament or suite'
                            }
                            name="descriptionPlace"
                            className="descriptionPlace"
                            type="text"
                            onChange={handleChangeTextBox}
                            value={input ? input.descriptionPlace : ''}
                        />
                    </div>
                    {errors.descriptionPlace &&
                        <p className="help-danger">{errors.descriptionPlace}</p>
                    }
                </div>
                <div className="field">
                    <label className="label">Country</label>
                    <div className="control">
                        <input
                            placeholder={addressId ?
                                !Object.keys(detailaddress).length ?
                                    'loading...' :
                                    'Arauca-Colombia'
                                :
                                'Arauca-Colombia'
                            }
                            name="country"
                            className="country"
                            type="text"
                            onChange={handleChangeTextBox}
                            value={input ? input.country : ''}
                        />
                    </div>
                    {errors.country &&
                        <p className="help-danger">{errors.country}</p>
                    }
                </div>
                <div className="field">
                    <label className="label">Zip Code</label>
                    <div className="control">
                        <input
                            placeholder={addressId ?
                                !Object.keys(detailaddress).length ?
                                    'loading...' :
                                    '1234'
                                :
                                '1234'
                            }
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


                {
                    addressId ?

                        !Object.keys(detailaddress).length
                            ? <h4>Loading...</h4>
                            :
                            <button className='button' type="submit">Update address</button>
                        :
                        <button class='btn btn-dark ' type="submit">Create address</button>
                }
            </form>
            </div>
        )
    } else {
        return <Redirect to='/' />
    }
}