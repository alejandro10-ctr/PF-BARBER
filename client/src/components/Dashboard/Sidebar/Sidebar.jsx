import React, { useContext, useEffect } from 'react'
import "./Sidebar.scss"
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import StoreIcon from '@mui/icons-material/Store';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';

import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

import { Link, Redirect } from 'react-router-dom';
import { CartContext } from '../../Shopping/ShoppingCart';




function Sidebar() {
    let { myUser, setUpdateUser, updateUser } = useContext(CartContext)


    

    useEffect(async () => {
        setUpdateUser(!updateUser)
    }, [0]);
    if (!Object.keys(myUser).length) {
        return <h1>Cargando...{ }</h1>
    } else if (!myUser?.isAdmin) {
        return <Redirect to='/' />

    } else {
        return (
            <div className='sidebar' >
                <div className='top'><span className='logo'><img src="https://cdn.discordapp.com/attachments/1026475887874539562/1037179521243304067/cositas3.png" alt="logo" /></span></div>
                <hr />
                <div className='center' >
                    <ul>
                        <p className="title">MAIN</p>
                        <Link to="/dash">

                            <li>
                                <DashboardIcon className='icon'></DashboardIcon>
                                <span>
                                    Dashboard</span>
                            </li>
                        </Link>

                        <Link to="/dash/users">
                            <li> <GroupIcon className='icon'></GroupIcon>
                                <span>Users</span>

                            </li>
                        </Link>
                        <Link to="/dash/products">
                            <li> <StoreIcon className='icon'></StoreIcon>
                                <span>Products</span>
                            </li>
                        </Link>
                        <li> <CreditCardIcon className='icon'></CreditCardIcon>
                            <span>Orders</span>
                        </li>





                        <p className="title">USER</p>


                        <Link to="/">
                        <li> <HomeOutlinedIcon className='icon'></HomeOutlinedIcon>
                            <span>Home</span>
                        </li>
                        </Link>
                        <Link to="/logout">
                        <li> <ExitToAppOutlinedIcon className='icon'></ExitToAppOutlinedIcon>
                            <span>Logout</span>
                        </li>
                        </Link>
                    </ul>
                </div>

            </div>

        )
    }
}

export default Sidebar