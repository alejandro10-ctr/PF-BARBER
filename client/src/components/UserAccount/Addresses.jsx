import { useEffect, useContext, useState } from "react";
import './Addresses.css'
import { useDispatch, useSelector } from "react-redux";
import { deleteAddress, getDBAddresses } from "../../redux/actions";
import { Link, Redirect, useHistory } from "react-router-dom";
import { CartContext } from "../Shopping/ShoppingCart";
import Swal from "sweetalert2";
export default function ShowAddresses() {
    const { userId } = useContext(CartContext)
    const [ini, setIni] = useState(false);
    const dispatch = useDispatch()
    const history = useHistory()
    const addresses = useSelector(state => state.addresses)
    useEffect(async () => {
        if (!ini && userId) {
            setIni(true)
            const { response } = await dispatch(getDBAddresses(userId))
            if (response?.data) {
                history.goBack()
                Swal.fire({
                    icon: "warning",
                    title: "Oops...",
                    text: response?.data,
                });
            }
        }
    }, [addresses, ini])

    if (userId) {
        return (
            <div>

                {
                    addresses.map((address) => {
                        return (
                            <div key={address.id} className="container">
                                <div className="card">

                                        <div className="back">
                                            <div>
                                                <Link className='button' to={`/useredit/shippinginfo/${address.id}`} >Edit</Link>
                                                <button className="button deleteAddress" onClick={async () => {
                                                    await dispatch(deleteAddress(address.id))
                                                    setIni(false)
                                                }}>Delete Adress</button>

                                            </div>
                                            <h1 className="text">{address.personReceives}
                                                <span>Reiceives in {address.country}</span>
                                            </h1>
                                            <span>{address.descriptionPlace}</span>
                                            <ul className="opciones">
                                                <li className="opcion">{address.phoneReceives}</li>
                                                <li className="opcion">{address.address}</li>
                                                <li className="opcion">{address.zipCode}</li>
                                            </ul>
                                        </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    } else {
        <Redirect to={history.goBack()} />
    }

}