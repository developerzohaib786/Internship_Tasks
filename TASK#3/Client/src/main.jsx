import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Login from './components/Login.jsx'
import Signup from './components/signup.jsx'
import Employees from './components/Employees.jsx'
import ManageEmployees from './components/AddEmploye.jsx'
import Dashboard from './components/Dashboard.jsx'
import AddEmployee from './components/AddEmployee.jsx'
import GetEmployees from './components/GetEmployees.jsx'
import AddEmploye from './components/AddEmploye.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/employees" element={<GetEmployees/>}/>
        <Route path="/manage" element={<AddEmploye/>}/>
        <Route path="/addemployee" element={<AddEmployee/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
