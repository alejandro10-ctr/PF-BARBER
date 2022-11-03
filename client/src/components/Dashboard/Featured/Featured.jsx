import React from 'react'
import "./Featured.scss"
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { CircularProgressbar } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import { useDispatch, useSelector } from 'react-redux';


function Featured() {
    const dispatch = useDispatch()
    const users = useSelector((state)=> state.users)
    return (
        <div className='featured'>
            <div className="top">
                <h1 className="title">Total Users</h1>
               
            </div>
            <div className="bottom">
                <div className="featuredChart">
                    <CircularProgressbar value={users.length} text={users.length + "%"} strokeWidth={3} />
                </div>
                <p className="title">{"Goals " + users.length + "/100 users"}</p>
               
                  
          
            </div>

        </div>
    )
}

export default Featured