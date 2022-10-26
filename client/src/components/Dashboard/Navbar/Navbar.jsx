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
                            src="https://www.geekmi.news/__export/1661874578180/sites/debate/img/2022/08/30/denji1.jpg_1789166332.jpg"
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