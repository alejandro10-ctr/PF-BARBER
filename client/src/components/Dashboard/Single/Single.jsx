import { useEffect, useState } from "react";
import { useDispatch, useSelector} from 'react-redux';
import { useParams } from "react-router-dom";
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';
import '../Single/Single.scss';
import { getDBUser, updateUserMartin } from "../../../redux/actions";
import Swal from 'sweetalert2'

const Single = (props) => {

    const dispatch = useDispatch()
    const {id} = useParams()
    const user = useSelector((state)=> state.user)
    const [edit, setEdit] = useState('false')

    const [input, setInput] = useState({
        isAdmin : "",
    })
function handleChange(e) {
        e.preventDefault()
        setInput(({
            ...input,
            [e.target.name]: e.target.value

        }));


    }
    useEffect(() => {
        dispatch(getDBUser(id))
      }, [])
      const editHandle = (e) => {
        setEdit("true")
    }
    const saveHandle = (e) => {
        Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'Suceffuly Upload!',
            showConfirmButton: false,
            timer: 1500
        })
        setEdit("false")
        setInput({
            isAdmin : e.target.value
        })
    dispatch(updateUserMartin(id, input))

        dispatch(dispatch(getDBUser(id)))

    }

    console.log(input)
    return (
   
        <div className='single'>
            <Sidebar />
            <div className='singleContainer'> 
                <Navbar />
                {edit === "false"? 
                                <div className='top'>
                                <div className='left'>
                                    <button class='editButton' onClick={() => editHandle()}>Edit</button>
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
                                                    <span className='itemValue'>{user.isAdmin === true ? "Admin" : "User" }</span>
                                                </div>
                                            </div>
                                    </div>
                               
                                </div>
                                <div className='right'></div>
                            </div>
                            : <div className='top'>
                            <div className='left'>
                                <button class='editButton' onClick={(e) => saveHandle(e)}>Save</button>
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
                                                <span className='itemValue'><select defaultValue={"disable"} name="isAdmin" onClick={(e) => handleChange(e)}>
                                            <option name="disable" value="disable" disabled hidden>Select</option>
                                            <option name="isAdmin" value= {true} >Admin</option>
                                            <option name="isAdmin" value= {false}>User</option>
                                        </select></span>
                                            </div>
                                        </div>
                                </div>
                           
                            </div>
                            <div className='right'></div>
                        </div>}

                <div className='bottom'>
                    <h1 className='title'> Last Transactions</h1>
                </div>
            </div>
        </div>
    )
}

export default Single