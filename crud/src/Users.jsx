import React, { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "react-bootstrap";
import { MdModeEdit, MdDelete, MdDashboard } from "react-icons/md";
import DataTable from "react-data-table-component"

function Users(){
    
    const[users,setUsers] = useState([])

    useEffect(()=>{
        axios.get('https://crud-application-react-js.onrender.com')
        .then(result => {
            setUsers(result.data)})
        .catch(err => console.log(err))
    },[])

    const handleDelete = (id) => {
        axios.delete('https://crud-application-react-js.onrender.com/delete/'+id)
        .then(res => {console.log(res)
          window.location.reload()})
        .catch(err => console.log(err))
    }
  const colums = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Age",
      selector: (row) => row.age,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="user-btns">
          <Button
            className="edit-btn edit"
            variant="success"
            onClick={(e) => navigate(`/update/${row._id}`)}
          >
            <i>
              <MdModeEdit className="edit-icon" />
            </i>
            <i></i>
          </Button>
          <Button
            className="admin-edit-btn"
            variant="danger"
            onClick={(e) => handleDelete(row._id)}
          >
            {" "}
            <i>
              <MdDelete className="admin-edit-icon" />
            </i>
            <i></i>
          </Button>
        </div>
      ),
    },
  ];

  return (
    <section id="user-crud">
      <div className="details-all">
        <div className="details">
          <Link to="/create" className="btn btn-success">
            Add +
          </Link>
          <div className="table">
            <DataTable
              title=""
              columns={colums}
              data={users}
              pagination
              fixedHeader
              fixedHeaderScrollHeight="450px"
              selectableRows
              selectableRowsHighlight
              highlightOnHover
              responsive
              sroll
            />
          </div>
        </div>
      </div>
    </section>
  );
}
export default Users;
