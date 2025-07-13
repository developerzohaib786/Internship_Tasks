import React from 'react'
import axios from 'axios'
import { useForm } from "react-hook-form"
import {Link,useNavigate} from 'react-router-dom'
import { useState } from 'react'

const Signup = () => {

    const navigate=useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const [error, setError] = useState([]);

  const onSubmit = async (data) => {
    console.log(data);
    try {
        const url="http://localhost:3000/api/users";
        const {data:res}=await axios.post(url,data);
        navigate('/login')
        console.log(`Response Message: ${res.message}`)
    } catch (error) {
        if(error.response && error.response.status>=400 && error.response.status<=500)
        setError(error.response.data.message)
    }
  };

  return (
    <section className="h-full flex flex-col items-center justify-center bg-[#DCD7C9]  dark:bg-[#DCD7C9]">
      <div className="container  h-full p-10">
        <div className="g-6 flex  h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
          <div className="w-full ">
            <div className="block rounded-lg bg-stone-300 shadow-lg dark:bg-[#A27B5C]">
              <div className="g-0 lg:flex lg:flex-wrap">
                {/* Left Column */}
                <div className="px-4 md:px-0 lg:w-6/12">
                  <div className="md:mx-6 md:p-12">
                    {/* Logo */}
                    <div className="text-center">
                      <img
                        className="mx-auto w-48"
                        src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                        alt="logo"
                      />
                      <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
                        We are The Lotus Team
                      </h4>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <p className="mb-4">Please register an account</p>
  {/* First Name */}
  <div className='font-bold text-2xl'><h1>First Name</h1></div>
                      <input
                        type="text"
                        placeholder="First Name"
                        className="mb-4 text-white w-full dark:bg-[#A27B5C] focus:outline-none p-2  rounded border "
                        {...register("firstName", { required: true })}
                      />
                        {/* Last Name*/}
                        <div className='font-bold text-2xl'><h1>Last Name</h1></div>
                      <input
                        type="text"
                        placeholder="Last Name"
                        className="mb-4 text-white w-full dark:bg-[#A27B5C] focus:outline-none p-2 rounded border "
                        {...register("lastName", { required: true })}
                      />
                      {/* Username input */}
                      <div className='font-bold text-2xl'><h1>Email</h1></div>
                      <input
                        type="email"
                        placeholder="Email"
                        className="mb-4 text-white dark:bg-[#A27B5C] focus:outline-none w-full p-2 rounded border border-gray-300"
                        {...register("email", { required: true })}
                      />
                      {errors.username && <p className="text-red-500 text-sm">Username is required</p>}

                      {/* Password input */}
                      <div className='font-bold text-2xl'><h1>Password</h1></div>
                      <input
                        type="password"
                        placeholder="Password"
                        className="mb-4 w-full text-white focus:bg-[#A27B5C] focus:outline-none p-2 rounded border "
                        {...register("password", { required: true })}
                      />
                      {errors && <p className="text-red-500 text-sm">{error}</p>}

                      {/* Submit button */}
                      <div className="mb-12 pb-1 pt-1 text-center">
                        <button
                          type="submit"
                          className="mb-3 inline-block w-full outline-white cursor-pointer rounded px-6 pb-2 border-white pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md "
                        >
                          Sign up
                        </button>
                      </div>

                      {/* Login Link */}
                      <div className="flex items-center justify-between pb-6">
                        <p className="mb-0 mr-2">Have an account?</p>
                      <Link to="/login">
                      <button
                          type="button"
                          className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-[#2C3930]  hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 cursor-pointer dark:hover:bg-[#2C3930] dark:hover:bg-opacity-10"
                        >
                          Login
                        </button></Link>
                      </div>
                    </form>
                  </div>
                </div>  
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Signup
