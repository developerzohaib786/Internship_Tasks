import axios from "axios";
import React, { useEffect, useState } from "react";

const ProjectTable = ({ searchTerm }) => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/employees")
      .then((res) => setEmployees(res.data))
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const filteredEmployees = employees.filter((item) =>
    item.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalEmployees=employees.length;

  return (
    <div className="p-6 mt-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Employees Data</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="text-gray-500 text-sm">
              <th className="py-3 px-4">Profile Picture</th>
              <th className="py-3 px-4">Employee Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Joining Date</th>
            </tr>
          </thead>
          <tbody className="text-sm font-medium">
            {filteredEmployees.map((item) => (
              <tr key={item._id} className="bg-gray-50 hover:bg-gray-100">
                <td className="py-3 px-4">
                  <img
                    src={`http://localhost:3000${item.profileImage}`}
                    alt="avatar"
                    onError={(e) => {
                      e.target.onerror = null; // prevent infinite loop
                      e.target.src = `http://localhost:5173${item.profileImage}`;
                    }}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>
                <td className="py-3 px-4">{item.Name}</td>
                <td className="py-3 px-4">{item.email}</td>
                <td className="py-3 px-4">{new Date(item.JoiningData).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectTable;
