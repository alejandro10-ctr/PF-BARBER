import { useEffect } from "react";
import { useDispatch, useSelector} from 'react-redux';
import { useParams } from "react-router-dom";
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';
import '../Single/Single.scss';
import { getDBUser } from "../../../redux/actions";


const Single = (props) => {

    const dispatch = useDispatch()
    const {id} = useParams()
    const user = useSelector((state)=> state.user)
    console.log(user)

    useEffect(() => {
        dispatch(getDBUser(id))
      }, [])
    

    return (
   
        <div className='single'>
            <Sidebar />
            <div className='singleContainer'> 
                <Navbar />
                <div className='top'>
                    <div className='left'>
                        <div className='editButton'>Edit</div>
                        <h1 className='title'> Information</h1>
                        <div className='item'>     
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Falkland_Islands_Penguins_05.jpg/1200px-Falkland_Islands_Penguins_05.jpg"
                                alt="" 
                                className='itemImg'/>
                                <div className='details'>
                                    <span className="itemtitle">{user.name} {user.lastname}</span>
                                   
                                    <div className="detailItem">
                                        <span className='itemKey'>Email:</span>
                                        <span className='itemValue'>{user.email}</span>
                                    </div>
                                    <div className="detailItem">
                                        <span className='itemKey'>Phone:</span>
                                        <span className='itemValue'>{user.phone}</span>
                                    </div>
                                    <div className="detailItem">
                                        <span className='itemKey'>Role:</span>
                                        <span className='itemValue'>{user.isAdmin === 'true' ? "Admin" : "User" }</span>
                                    </div>
                                </div>
                        </div>
                   
                    </div>
                    <div className='right'></div>
                </div>
                <div className='bottom'>
                    <h1 className='title'> Last Transactions</h1>
                </div>
            </div>
        </div>
    )
}

export default Single