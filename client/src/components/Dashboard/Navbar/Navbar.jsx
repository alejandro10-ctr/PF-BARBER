import './navbar.scss'
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';

const NavbarDash = () => {
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
export default NavbarDash