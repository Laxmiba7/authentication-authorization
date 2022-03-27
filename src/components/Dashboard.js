import React from "react";
import { Menu } from "./Menu";
import { SiGravatar } from "react-icons/si";
import { Outlet } from "react-router-dom";
import { Badge } from "react-bootstrap";


export const Dashboard = ({name}) => {
 
  return (
    <>
    
    <div className="row">
      <div className="col-3 p-0">
        <Menu />
      </div>
      <div className="col-9 p-0">
        <div className="d-flex dashboard justify-content-between align-items-center">
        <h1 className="ms-5"> Dashboard</h1>
        <div className="avatar me-5">
      
          <SiGravatar />
          <h6> <Badge bg="primary">{name}</Badge></h6>
        </div>
        </div>
        
        <div className="row m-2">
        <Outlet/>
        </div>
       
        
      </div>
    </div>
    
    </>
  );
};
