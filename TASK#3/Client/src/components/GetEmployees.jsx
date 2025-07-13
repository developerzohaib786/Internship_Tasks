import React, { useEffect, useState } from 'react';
import axios from 'axios';

function GetEmployees() {
  const [Employees, setEmployee] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/employees')
      .then(response => {
        setEmployee(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h1>Items from MongoDB</h1>
      <ul>
        {Employees.map(Employee => (
          <li key={Employee._id}>{Employee.Name}</li>
        ))}
      </ul>
    </div>
  );
}

export default GetEmployees;
