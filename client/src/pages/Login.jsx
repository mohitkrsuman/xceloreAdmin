import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { newUser } from "../redux/reducers/userSlice";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/v1/user/login", {
        ...user,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        dispatch(newUser(response.data.user));
        navigate("/dashboard");
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
            onSubmit={loginUser}
            className="flex items-center justify-center flex-col gap-5 w-full rounded-md bg-gray-200 p-[3rem]"
          >
            <h2 className="text-4xl pb-5">LOGIN</h2>
            <input
              className="p-2 rounded-md outline-none w-[25rem]"
              type="email"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="Email"
            />
            <input
              className="p-2 rounded-md outline-none w-[25rem]"
              type="password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Password"
            />

            <button className="p-2 rounded-md bg-blue-500 text-white w-[25rem] border-none mt-3 hover:bg-blue-700 transition-colors">
              Login
            </button>
          </form>
          <p className="text-sm">
            Not an user ?{" "}
            <Link to="/register" className="text-blue-600">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
