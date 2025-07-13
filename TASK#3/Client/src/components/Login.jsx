import React, { useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const [error, setError] = useState("")

  const onSubmit = async (data) => {
    try {
      const url = "http://localhost:3000/api/auth"
      const { data: res } = await axios.post(url, data)
      localStorage.setItem("token", res.data)
      window.location = "/"
      console.log(data);
    } catch (err) {
      if (err.response && err.response.status >= 400 && err.response.status <= 500) {
        setError(err.response.data.message)
      }
    }
  }

  return (
    <section className="h-full flex flex-col items-center justify-center bg-[#DCD7C9] dark:bg-[#DCD7C9]">
      <div className="container h-full p-10">
        <div className="flex h-full items-center justify-center text-neutral-800 dark:text-neutral-200">
          <div className="w-full max-w-md">
            <div className="rounded-lg bg-stone-300 shadow-lg dark:bg-[#A27B5C] p-8">
              <div className="text-center mb-6">
                <img
                  className="mx-auto w-32"
                  src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                  alt="logo"
                />
                <h4 className="mt-4 text-xl font-semibold">Welcome Back</h4>
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Email */}
                <label className="block text-sm font-bold mb-1">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="mb-4 w-full text-white dark:bg-[#A27B5C] p-2 rounded border focus:outline-none"
                  {...register("email", { required: true })}
                />
                {errors.email && <p className="text-red-500 text-sm">Email is required</p>}

                {/* Password */}
                <label className="block text-sm font-bold mb-1">Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="mb-4 w-full text-white dark:bg-[#A27B5C] p-2 rounded border focus:outline-none"
                  {...register("password", { required: true })}
                />
                {errors.password && <p className="text-red-500 text-sm">Password is required</p>}
                {error && <p className="text-red-500 text-sm">{error}</p>}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full mt-4 bg-[#2C3930] text-white py-2 rounded shadow-md hover:bg-[#1e2a22] transition"
                >
                  Sign In
                </button>
              </form>

              {/* Signup Link */}
              <div className="text-center mt-6">
                <p className="text-sm">
                  Don’t have an account?
                  <Link to="/signup" className="text-blue-600 ml-1 hover:underline">Signup</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login
