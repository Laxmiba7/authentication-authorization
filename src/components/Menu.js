import React from 'react'
import {Nav,Accordion,NavDropdown,Navbar} from 'react-bootstrap'
import logo from '../images/logo.png' 
import { NavLink } from 'react-router-dom'

export const Menu = () => {
  return (
    <div>
       <Nav  className="flex-column align-items-center p-5">
<Navbar.Brand >
  <img src={logo}  alt="logo" className="logo mt-2"/>
</Navbar.Brand>
  <Nav.Link href="/home" className="mt-2 font">Home</Nav.Link>
 <Nav.Link>
  <Accordion className="text-white">
          <Accordion.Item eventKey="0">
            <Accordion.Header className="text-white bg-primary  ">
              <span className="ps-3 name  text-white mt-2">User Setting</span>
            </Accordion.Header>
            <Accordion.Body >
              <NavLink to='user'><li> Create User</li></NavLink>
              <NavLink to='role'><li> Role Setting</li></NavLink>
              <NavLink to='screen'><li> Screen Setup</li></NavLink>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        </Nav.Link>
       
</Nav>
    </div>
  )
}
