import Dashboard from "./components/Dashboard"
import React from "react"
import AddEmployee from "./components/AddEmployee"
import { Route,Routes } from "react-router-dom"
import Login from "./components/Login"
import GetEmployees from "./components/GetEmployees"

function App() {
  const user=localStorage.getItem("token");

  return (
    <>
     <Routes>
    <Route path="/" element={user ? (<Dashboard/>):(<Login/>)}/>
    <Route path="/gym" element={<gym/>}/>

    <Route path="/addemployee" element={<AddEmployee/>}/>
    <Route path="/employees" element={<GetEmployees/>}/>
     </Routes>
    </>
  )
}

export default App
