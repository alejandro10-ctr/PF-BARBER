import "./Datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns} from "./datatablesource";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, updateUsersLogic } from '../../../redux/actions';
import Swal from "sweetalert2";

const Datatable = () => {
  const dispatch = useDispatch()
  const users = useSelector((state)=> state.users)

  console.log(users)

  const [data, setData] = useState();

  useEffect(() => {
    dispatch(getUsers())
  }, [])

  let handleDelete = (id, user) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        // user.isActive = false
        console.log('SOY USER', user)
        dispatch(updateUsersLogic(id, {isActive: false}))
      }
      getUsers()
      getUsers()
    }
    )
    getUsers()


  }

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        console.log('soy params', params)
        return (
          <div className="cellAction">
            <Link to={`/dash/users/${params.id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            {/* <div
              className="deleteButton"
              onClick= {({user = user.id}) => handleDelete(user)}
            >
              Delete
            </div> */}
            <button className="deleteButton" onClick= {({id = params.row.id}) => handleDelete(id)}>Delete</button>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      
<div className="rows">

</div>


      <DataGrid
        className="datagrid"
        rows={users}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
   
      /> 
    </div>
  );
};

export default Datatable;
