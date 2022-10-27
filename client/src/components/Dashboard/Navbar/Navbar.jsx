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
                            src="https://media.revistavanityfair.es/photos/60e85a8f9bf55ca1055acb9d/master/pass/14521.jpg"
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