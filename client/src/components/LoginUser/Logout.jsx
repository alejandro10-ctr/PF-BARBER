import React, { useContext } from 'react';
import Cookies from 'universal-cookie';
import { useHistory } from 'react-router-dom';
import { CartContext } from "../Shopping/ShoppingCart";



 const Logout = () => {
    const {SignOff } = useContext(CartContext)
    const cookies = new Cookies()
    const history = useHistory();
    const onClickFunc = (e) => {
        e.preventDefault();
        cookies.remove('token')
        SignOff()
        history.push('/')
    }
    
  return (
    <div>
        <h3>Are you sure you want to sign out?</h3>
        <button class="btn btn-dark" onClick={(e) => { onClickFunc(e)}}>Sign out</button>
    </div>
  )
}

export default Logout
