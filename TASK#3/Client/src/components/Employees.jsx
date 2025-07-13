import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import { FaSearch } from 'react-icons/fa'
import { recentEmployees } from './constants'

const Employees = () => {
  const [Emlpoyees, setEmlpoyees] = useState([])
  const getEmployees = async () => {
    try {
      const response = await fetch('/api/employees',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      const data = await response.json();
      console.log(data);
      // assuming data has employees json{status:200, employees:[employeeArray]}
      setEmlpoyees(data.employees);
    } catch (error) {

    }
  }
  useEffect(() => {
    getEmployees();
  }, [])


  return (
    <section className='min-h-screen bg-gray-200'>
      <Navbar />
      <div className="w-4/5 min-h-1/2 shadow-md m-5 mx-auto">
        <h2 className="font-semibold flex p-4 justify-between bg-blue-300 rounded-md">
          <div className='bg-white/70 px-2 py-1 rounded-md'>All Employees</div>
          <div className='flex gap-2 items-center'>
            <input className='bg-white/70 px-2 py-1 rounded-md' type="text" placeholder='Enter Employee Name' />
            <button className='bg-blue-700 hover:bg-blue-600 transition-all cursor-pointer text-white px-2 py-1 rounded-md flex gap-3 items-center justify-center'>
              <span>Search</span>
              <span className='text-xs'>
                <FaSearch />
              </span>
            </button>
          </div>
        </h2>
        <table className="w-full">
          <thead>
            <tr className="bg-blue-800 text-white text-left">
              <th className="py-2 px-3">Name</th>
              <th className="py-2 px-3">Date of Birth</th>
              <th className="py-2 px-3">Join Date</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {/*  // render Employees instead of recentEmployees fetched from database */}
            {recentEmployees.map((emp, i) => (
              <tr
                key={i}
                className={i % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                <td className="py-2 px-3">{emp.name}</td>
                <td className="py-2 px-3">{emp.dob}</td>
                <td className="py-2 px-3">{emp.joinDate}</td>
              </tr>
            ))}
            {/* Just wrote it again to show more content on the page. */}
            {recentEmployees.map((emp, i) => (
              <tr
                key={i}
                className={i % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                <td className="py-2 px-3">{emp.name}</td>
                <td className="py-2 px-3">{emp.dob}</td>
                <td className="py-2 px-3">{emp.joinDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Employees