import React, {useEffect, useState}from 'react'
import {MdOutlineModeEdit,MdDelete} from 'react-icons/md'
import {AiFillSetting} from 'react-icons/ai'
import {BsPlusLg} from 'react-icons/bs'
import { Table } from "react-bootstrap";
import axios from 'axios';


function RoleDetails() {
  const [role, setRole] = useState([]);
  const api = `https://ecom-react-task.herokuapp.com/roles`;
  const token = JSON.parse(localStorage.getItem("token"));
  console.log(token);

  useEffect(() => {
    axios
      .get(api, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setRole(res.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
 console.log(role)
  return (
    <div>
      <div className="row m-2">
          <div>
         <h2>Role Details</h2> 
         </div>
         <div>
         <h5 className="text-end"><BsPlusLg/>Add Role</h5>
         </div>
         <Table bordered hover className="m-3">
  <thead>
    <tr>
      <th>S.No.</th>
      <th>Role Name</th>
      <th>Description</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {role.map((data, ind)=>(
        <tr>
        <td>{ind+1}</td>
        <td>{data.name}</td>
        <td>{data.description}</td>
        <td className="d-flex">
          <div className="fonty">
        <MdOutlineModeEdit/>
        </div>
        <div className="delete fonty">
        <MdDelete/>
        </div>
        <div className='fonty'>
        <AiFillSetting/>
        </div>
        </td>
      </tr>
    ))}
    
   
  </tbody>
</Table>
        </div>  
    </div>
  )
}

export default RoleDetails