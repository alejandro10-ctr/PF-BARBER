import React from 'react'
import axios from 'axios'

const ForgotPassword  = () => {
  
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
    <form>
        <h3>Forgot password</h3>
        
        <div>
            <label>Email</label>
            <input type="email" placeholder="Email"/>
        </div>

    </form>
  )
}

export default ForgotPassword;