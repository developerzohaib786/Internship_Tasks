import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios'; 

const AddEmployee = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); 

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
  
      formData.append('Name', data.Name);
      formData.append('JoiningData', data.JoiningData);
      formData.append('email', data.email);
      formData.append('Salary', data.Salary);
      
      if (data.profileImage && data.profileImage[0]) {
        formData.append('profileImage', data.profileImage[0]); 
      }
  
      const url = "http://localhost:3000/api/newemployee";
      const { data: res } = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      reset(); 
      setError('');
      setSuccessMessage(res.message); 
      console.log(`Response Message: ${res.message}`);
    } catch (error) {
      setSuccessMessage('');
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setError(error.response.data.error);
      }
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#ddd6ce]">
      <form 
        onSubmit={handleSubmit(onSubmit)}
        className="bg-[#a2754e] p-8 rounded-lg shadow-lg w-full max-w-md space-y-4"
      >
        <div className="text-center mb-4">
          <h2 className="text-xl font-semibold text-white">Add New Employee</h2>
        </div>

        {/* success Message */}
        {successMessage && (
          <div className="bg-green-100 text-green-800 p-2 rounded text-center text-sm">
            {successMessage}
          </div>
        )}

        {/* error Message */}
        {error && (
          <div className="bg-red-100 text-red-800 p-2 rounded text-center text-sm">
            {error}
          </div>
        )}

        {/* FORM FIELDS */}
        <div>
            {/* Name */}
          <label className="block text-white mb-1">Name</label>
          <input
            className="w-full outline-none p-2 rounded border"
            {...register('Name', { required: 'Name is required' })}
          />
          {errors.Name && <p className="text-red-300">{errors.Name.message}</p>}
        </div>

        <div>
            {/* Joining Date  */}
          <label className="block text-white mb-1">Joining Date</label>
          <input
            type="date"
            className="w-full outline-none p-2 rounded border"
            {...register('JoiningData', { required: 'Joining Date is required' })}
          />
          {errors.JoiningData && <p className="text-red-300">{errors.JoiningData.message}</p>}
        </div>

        <div>
            {/* Email  */}
          <label className="block text-white mb-1">Email</label>
          <input
            type="email"
            className="w-full outline-none p-2 rounded border"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: 'Invalid email format',
              },
            })}
          />
          {errors.email && <p className="text-red-300">{errors.email.message}</p>}
        </div>

        <div>
            {/* Salary  */}
          <label className="block text-white mb-1">Salary</label>
          <input
            type="number"
            className="w-full p-2 outline-none rounded border"
            {...register('Salary', { required: 'Salary is required', min: 0 })}
          />
          {errors.Salary && <p className="text-red-300">{errors.Salary.message}</p>}
        </div>

        <div>
            {/* Profile Image  */}
          <label className="block text-white mb-1">Profile Image URL</label>
          <input
            type="file"
            className="w-full cursor-pointer outline-none p-2 rounded border"
            {...register('profileImage')}
          />
        </div>

        <button
          type="submit"
          className="w-full outline-white bg-transparent border-2 cursor-pointer text-white py-2 rounded hover:bg-[#1e2c21] transition"
        >
          Add Employee
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;
