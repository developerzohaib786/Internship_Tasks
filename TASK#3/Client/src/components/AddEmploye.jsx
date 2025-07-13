import React, { useEffect } from 'react'
import Navbar from './Navbar'
import {IoTrashBin} from "react-icons/io5";
import { FaArrowUp, FaPlus, FaSearch, FaUpload, FaUser } from 'react-icons/fa'
import { useState } from 'react'
import { recentEmployees } from './constants'
import { toast } from 'sonner'
import { Toaster } from 'sonner'
import AddEmployee from './AddEmployee';
import axios from 'axios'

const AddEmploye = () => {
    const [empID, setempID] = useState(0);
    const [name,setName] = useState('');
    const [dob,setDob] = useState('');
    const [joinDate,setJoinDate] = useState('');
    const searchEmp = () => {
        const searchedEmp = recentEmployees.find(emp => {
            return emp.id === Number(empID)
        })
        if(!searchedEmp){
            toast.error('Employee not found');
            return;
        }
        setName(searchedEmp.name);
        setDob(searchedEmp.dob);
        setJoinDate(searchedEmp.joinDate);

    }

    const deleteEmp = async () => {
        try {
          const response = await fetch(`http://localhost:3000/api/employees/${empID}`, {
            method: 'DELETE',
          });
      
          if (!response.ok) {
            throw new Error('Failed to delete employee.');
          }
      
          const data = await response.json();
          if (data.status === 200) {
            toast.success('User deleted successfully.');
          } else {
            toast.error('Deletion failed');
          }
        } catch (error) {
          console.error(error);
          toast.error('An unknown error occured');
        }
      };
    const updateExistingEmployee = async() => {
      try {
        const response = await fetch(`http://localhost:3000/api/employees/${empID}`,
            {
                method:'PUT',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({name,dob,joinDate})
            }
        )
        const data = await response.json();
        if(data.status == 200){
            toast.success('Employee updated successfully')
        }
      } catch (error) {
        toast.message(error.message);
      }
    }
    
    const [employee, setEmployees] = useState([]);
        
    useEffect(() => {
        // update the database and show the latest message with updated a success-toast message.
    }, [])

    useEffect(() => {
        axios.get("http://localhost:3000/api/employees")
          .then((res) => setEmployees(res.data))
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      }, []);

      const totalEmployees=employee.length;

    return (
        <div>
            <Toaster richColors/>
            <section className='min-h-screen bg-gradient-to-bl pb-20 from-blue-100 to-red-300'>
                <Navbar />
                <div>
                    <div className="my-5 flex justify-around gap-3 w-4/5 mx-auto">
                        <div className="bg-black/90 flex hover:bg-black cursor-pointer flex-col p-5 text-white rounded-md w-full text-xl font-semibold">
                            Add Employee
                            <span  className="mt-5 hover:bg-white/30 p-2 w-fit text-xl flex gap-2 items-center">
                                <FaPlus />
                            </span>
                        </div>
                        <div className="bg-black/90 flex hover:bg-black cursor-pointer flex-col p-5 text-white rounded-md w-full text-xl font-semibold">
                            Delete Employee
                            <span onClick={deleteEmp} className="mt-5 text-xl flex gap-2 items-center hover:bg-white/30 p-2 w-fit">
                                <IoTrashBin />
                            </span>
                        </div>
                        <div className="bg-black/90 flex hover:bg-black cursor-pointer flex-col p-5 text-white rounded-md w-full text-xl font-semibold">
                            Update Existing
                            <span onClick={updateExistingEmployee} className="mt-5 text-xl flex gap-2 items-center hover:bg-white/30 p-2 w-fit">
                                <FaUpload />
                            </span>
                        </div>
                        <div className="bg-black/90 flex hover:bg-black cursor-pointer flex-col p-5 text-white rounded-md w-full text-xl font-semibold">
                            Total Employees
                            <span className="mt-5 text-xl flex gap-2 items-center hover:bg-white/30 p-2 w-fit">
                                {totalEmployees}<FaArrowUp/>
                            </span>
                        </div>

                    </div>
                </div>
          
     <AddEmployee/>
            </section>
        </div>
    )
}

export default AddEmploye