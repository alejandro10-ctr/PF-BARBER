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



function Sidebar() {
  return (
    <div className='sidebar'>
        <div className='top'><span className='logo'><img src="https://henrybarbershoplv.square.site/uploads/b/b818a310-a8a8-11eb-b79b-3f3ed2ae8a60/Henry%20barbershop-02.png" alt="logo" /></span></div>
        <hr></hr>
        <div className='center'>
            <ul>
                <p className="title">MAIN</p>
                <li>
                        <DashboardIcon className='icon'></DashboardIcon>
                    <span> 
                        Dashboard</span>
                </li>
                <p className="title">LIST</p>
                <li> <GroupIcon className='icon'></GroupIcon>
                    <span>Users</span>
                </li>
                <li> <StoreIcon className='icon'></StoreIcon>
                    <span>Products</span>
                </li>
                <li> <CreditCardIcon className='icon'></CreditCardIcon>
                    <span>Orders</span>
                </li>
                <p className="title">USEFULL</p>
                <li> <QueryStatsIcon className='icon'></QueryStatsIcon>
                    <span>Stats</span>
                </li>
                <li> <LocalShippingIcon className='icon'></LocalShippingIcon>
                    <span>Delivery</span>
                </li>
                <li> <NotificationsIcon className='icon'></NotificationsIcon>
                    <span>Notifications</span>
                </li>
                <li> <SettingsIcon className='icon'></SettingsIcon>

                    <span>Settings</span>
                </li>
                <p className="title">USER</p>
                <li> <AccountCircleOutlinedIcon className='icon'></AccountCircleOutlinedIcon>
                    <span>Profile</span>
                </li>
                <li> <ExitToAppOutlinedIcon className='icon'></ExitToAppOutlinedIcon>
                    <span>Logout</span>
                </li>
            </ul>
            </div>

        <div className='bottom'>
            <div className="colorOption"></div>
            <div className="colorOption"></div>

            </div>
    </div>

  )
}

export default Sidebar