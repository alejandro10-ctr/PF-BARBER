import './navbar.scss'
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import { useContext, useEffect } from 'react';
import { CartContext } from '../../Shopping/ShoppingCart';
import { Redirect } from 'react-router-dom';

const NavbarDash = () => {
    let { myUser,setUpdateUser,updateUser } = useContext(CartContext)

    useEffect(async () => {
      setUpdateUser(!updateUser)
    }, [0]);
    if (!Object.keys(myUser).length) {
      return <h1>Cargando...{}</h1>
    } else if (!myUser?.isAdmin) {
      return <Redirect to='/' />
  
    } else {
  
        return (
    
            <div className='navbar'>
                <div className='wrapper'>
                    <div className='search'>
                        <input type="text" placeholder='Search....' />
                        <SearchIcon />
                    </div>
                    <div className='items' >
                        <div className='items' >
                            <LogoutIcon className="logout" />
                        </div>
    
    
                        <div className='items' >
                            <img
                                src="https://ih1.redbubble.net/image.1215201729.3879/pp,840x830-pad,1000x1000,f8f8f8.u1.jpg"
                                alt="avatar"
                                className='avatar'
    
                            />
                        </div>
                    </div>
                </div>
            </div>
    //:)
        )
    }
}
export default NavbarDash