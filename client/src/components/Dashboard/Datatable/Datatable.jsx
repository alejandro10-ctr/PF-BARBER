import "./Datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns} from "./datatablesource";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getUsers } from '../../../redux/actions';

const Datatable = () => {
  const dispatch = useDispatch()
  const users = useSelector((state)=> state.users)

  console.log(users)

  const [data, setData] = useState();

  useEffect(() => {
    dispatch(getUsers())
  }, [])

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/dash/users/${params.id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
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
        checkboxSelection
      /> 
    </div>
  );
};

export default Datatable;
