import axios from "axios";
import React, { useState } from "react";
import { ImCross } from "react-icons/im";
import { toast } from "react-toastify";

const AddUser = ({ setAddUser }) => {
  const adminId = JSON.parse(localStorage.getItem("user"))._id;
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    role: "",
    password: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `/api/v1/admin/addUser/?id=${adminId}`,
        {
          ...user,
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setAddUser(false);
      }
    } catch (err) {
      toast.error("Unable to add user");
    }
  };
  return (
    <div className="flex flex-col p-5">
      <div
        onClick={() => setAddUser(false)}
        className="w-full h-[1rem] text-white flex justify-between"
      >
        <div className="w-[90%]"></div>
        <ImCross className="cursor-pointer" />
      </div>
      <div>
        <form
          onSubmit={submitHandler}
          className="flex items-center justify-center flex-col gap-5 w-full text-black"
        >
          <h2 className="text-4xl pb-5 text-white">ADD NEW USER</h2>

          <input
            className="p-2 rounded-md outline-none xl:w-[25rem]"
            type="text"
            placeholder="First Name"
            onChange={(e) => setUser({ ...user, firstname: e.target.value })}
            required
          />
          <input
            className="p-2 rounded-md outline-none xl:w-[25rem]"
            type="text"
            placeholder="Last Name"
            onChange={(e) => setUser({ ...user, lastname: e.target.value })}
            required
          />
          <input
            className="p-2 rounded-md outline-none xl:w-[25rem]"
            type="email"
            placeholder="Email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            required
          />
          <select
            className="p-2 rounded-md outline-none w-[12rem] xl:w-[25rem]"
            onChange={(e) => setUser({ ...user, role: e.target.value })}
          >
            <option value="user">User</option>
            <option value="Admin">Admin</option>
          </select>
          <input
            className="p-2 rounded-md outline-none xl:w-[25rem]"
            type="password"
            placeholder="Password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            required
          />

          <button className="p-2 w-[11rem] rounded-md bg-blue-500 text-white xl:w-[25rem] border-none mt-3 hover:bg-blue-700 transition-colors">
            AddUser
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
