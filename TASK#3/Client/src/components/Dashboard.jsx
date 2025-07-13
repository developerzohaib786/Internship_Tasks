import React, { useState } from 'react'
import Navbar from './Navbar'
import { FaArrowUp, FaArrowDown, FaSearch } from "react-icons/fa";
import ProjectTable from './ProjectTable';

const Dashboard = () => {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <section className='min-h-screen bg-gradient-to-bl pb-20 from-blue-100 to-red-300'>
            <Navbar />
            <div className="w-4/5 min-h-1/2 shadow-md m-5 mx-auto">
                <h2 className="font-semibold flex p-4 justify-between bg-blue-300 rounded-md">
                    <div className='bg-white/70 px-2 py-1 rounded-md'>All Employees</div>
                    <div className='flex gap-2 items-center'>
                        <input
                            className='bg-white/70 px-2 py-1 rounded-md'
                            type="text"
                            placeholder='Enter Employee Name'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button
                            onClick={() => setSearchTerm("")}
                            className='bg-blue-700 hover:bg-blue-600 transition-all cursor-pointer text-white px-2 py-1 rounded-md flex gap-3 items-center justify-center'
                        >
                            <span>Show All</span>
                        </button>
                    </div>
                </h2>
                <ProjectTable searchTerm={searchTerm} />
            </div>
        </section>
    )
}

export default Dashboard
