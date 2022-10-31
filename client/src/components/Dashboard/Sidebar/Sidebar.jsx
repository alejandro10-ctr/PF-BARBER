import React from 'react'
import "./Sidebar.scss"
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import StoreIcon from '@mui/icons-material/Store';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { Link } from 'react-router-dom';



function Sidebar() {
    return (
        <div className='sidebar' >
            <div className='top'><span className='logo'><img src="https://img.freepik.com/premium-vector/vintage-barbershop-logo-template_441059-27.jpg" alt="logo" /></span></div>
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
                    <li> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="purple" class="bi bi-house-door" viewBox="0 0 16 16">
                        <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5z" />
                    </svg>
                        <span>Home</span>
                    </li>
                    <li> <ExitToAppOutlinedIcon className='icon'></ExitToAppOutlinedIcon>
                        <span>Logout</span>
                    </li>
                </ul>
            </div>

        </div>

    )
}

export default Sidebar