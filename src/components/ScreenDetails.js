import React from 'react'
import {MdOutlineModeEdit,MdDelete} from 'react-icons/md'
import {BsPlusLg} from 'react-icons/bs'
import { Table } from "react-bootstrap";
import axios from 'axios';
import { useEffect,useState } from 'react';

export const ScreenDetails = () => {
  const [screen,setScreen] = useState([])
    const api = `https://ecom-react-task.herokuapp.com/screens`;
  const token = JSON.parse(localStorage.getItem('token'));
  console.log(token)
  
  useEffect(() => {
    axios
      .get(api, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setScreen(res.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
console.log(screen)

  
  return (
    
         <div>
          <div className='screen-container'>
         <h2>Screen Table</h2> 
         </div>
         <div>
         <h5 className="text-end"><BsPlusLg/>Add Screen</h5>
         </div>
         <Table bordered hover className="m-3">
  <thead>
    
    <tr>
      <th>S.No.</th>
      <th>Screen Name</th>
      <th>Description</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
  {screen.map((data,ind)=>(
     <tr key={ind}>
     <td>{ind+1}</td>
     <td>{data.name}</td>
     <td>{data.description}</td>
     <td className="d-flex">
       <div className="fonty">
     <MdOutlineModeEdit/>
     </div>
     <div className="delete fonty">
     <MdDelete fonty/>
     </div>
     </td>
   </tr>
  ))}
   
   
   
  </tbody>
</Table>
</div>
    

  )
}
