import { Login } from "./components/Login";
import { useState } from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard } from "./components/Dashboard";
import { Preference } from "./components/Preference";
//import { ProtectedRoute } from "./ProtectedRoute";
import { ScreenDetails } from "./components/ScreenDetails";
import { UserDetails } from "./components/UserDetails";
import RoleDetails from "./components/RoleDetails";

function App() {
  const [user, setUser] = useState(null);
  const [name,setName] = useState('');
 
  return (
    <div>
     
      
      <Routes>
        {!user && (
            <Route path="/" element={<Login authenticate={()=> setUser(true) } name= {name} setName={setName}/>}/>
        )}
		
    {user && (
      	<Route path="dashboard" element={<Dashboard name={name}/>}>
        <Route path="screen" element={<ScreenDetails/>}/>
        <Route path="user" element={<UserDetails/>}/>
        <Route path="role" element={<RoleDetails/>}/>
      </Route>
    )}
	  <Route path="*" element={<Navigate to = {user ? "/dashboard": "/"}/>}/>
		
      </Routes>
     
    </div>
   
  );
}

export default App;
