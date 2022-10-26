import React from 'react'
import "./Widget.scss"
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
function Widget({type}) {

    let data;


    //temporal


    const amount = 100
    const diff = 80

    switch(type){

        case "user":
            data ={title:"USERS", ifMoney: false, link:"See all users", icon: <Person2OutlinedIcon className='icon' style={{color: "crimson", backgroundColor: "rgba(255, 0, 0, 0.2)"}}/>,
    };
    break;
    case "order":
            data ={title:"ORDERS", ifMoney: false, link:"View all orders", icon: <LocalGroceryStoreOutlinedIcon className='icon' style={{color: "goldenrod", backgroundColor: "rgba(218, 165, 32, 0.2)"}}/>,
    };
    break;
    case "earning":
            data ={title:"EARNINGS", ifMoney: true, link:"View net earnings", icon: <MonetizationOnOutlinedIcon className='icon' style={{color: "green", backgroundColor: "rgba(0, 128, 0, 0.2)"}}/>,
    };
    break;
    case "balance":
            data ={title:"BALANCE", ifMoney: true, link:"See details", icon: <AccountBalanceWalletOutlinedIcon className='icon' style={{color: "purple", backgroundColor: "rgba(128, 0, 128, 0.2)"}}/>,
    };
    break;
    default:
        break;
}



  return (
    <div className='widget'>
        <div className="left">
             <span className="title">{data.title}</span>
             <span className="counter">{data.ifMoney && "$"}{amount}</span>
             <span className="link">{data.link}</span>
             </div>
        <div className="right">
            <div className="percentage positive">
            <KeyboardArrowUpIcon></KeyboardArrowUpIcon>
                {diff} %
                </div>
                {data.icon}

        </div>
    </div>
  )
}

export default Widget