import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/v1/user/register", {
        ...user,
      });
      
      if(response.data.success){
         toast.success(response.data.message);
         navigate("/login");
      }
    } catch (err) {
        toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center flex-col w-full h-[80vh]">
        <div className="flex items-center justify-center flex-col gap-5 w-[40rem]">
          <form
            onSubmit={submitHandler}
            className="flex items-center justify-center flex-col gap-5 w-full rounded-md bg-gray-200 p-[3rem]"
          >
            <h2 className="text-4xl pb-5">REGISTER</h2>

            <input
              className="p-2 rounded-md outline-none w-[25rem]"
              type="text"
              placeholder="First Name"
              onChange={(e) => setUser({ ...user, firstname: e.target.value })}
              required
            />
            <input
              className="p-2 rounded-md outline-none w-[25rem]"
              type="text"
              placeholder="Last Name"
              onChange={(e) => setUser({ ...user, lastname: e.target.value })}
              required
            />
            <input
              className="p-2 rounded-md outline-none w-[25rem]"
              type="email"
              placeholder="Email"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              required
            />
            <input
              className="p-2 rounded-md outline-none w-[25rem]"
              type="password"
              placeholder="Password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              required
            />

            <button className="p-2 rounded-md bg-blue-500 text-white w-[25rem] border-none mt-3 hover:bg-blue-700 transition-colors">
              Register
            </button>
          </form>
          <p className="text-sm">Already an user? <Link to="/login" className="text-blue-600">Login</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
