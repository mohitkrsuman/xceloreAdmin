import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EditUser = () => {
  const { state } = useLocation();
  const { userData } = useSelector((state) => state.userData);
  const adminId = JSON.parse(localStorage.getItem("user"))._id;
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstname: userData !== null ? userData.firstname : "",
    lastname: userData !== null ? userData.lastname : "",
    role: userData !== null ? userData.role : "",
  });

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `/api/v1/admin/editUser?id=${adminId}&userId=${state._id}`, user
      );
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/dashboard");
      }
    } catch (err) {
      toast.error("Unable to edit the user");
    }
  };

  useEffect(() => {
    setUser({
      firstname: userData !== null ? userData.firstname : "",
      lastname: userData !== null ? userData.lastname : "",
      role: userData !== null ? userData.role : "",
    });
  }, [userData]);
  return (
    <div>
      <div className="flex items-center justify-center flex-col w-full h-[80vh]">
        <div className="flex items-center justify-center flex-col gap-5 w-[40rem]">
          <form
            onSubmit={handleEdit}
            className="flex items-center justify-center flex-col gap-5 w-full rounded-md bg-gray-200 p-[3rem]"
          >
            <h2 className="text-4xl pb-5">EDIT USER INFO</h2>

            <input
              className="p-2 rounded-md outline-none w-[25rem]"
              type="text"
              placeholder="First Name"
              value={user.firstname}
              onChange={(e) => setUser({ ...user, firstname: e.target.value })}
            />
            <input
              className="p-2 rounded-md outline-none w-[25rem]"
              type="text"
              placeholder="Last Name"
              value={user.lastname}
              onChange={(e) => setUser({ ...user, lastname: e.target.value })}
            />
            <select
              className="p-2 rounded-md outline-none w-[12rem] xl:w-[25rem]"
              value={user.role}
              onChange={(e) => setUser({ ...user, role: e.target.value })}
            >
              <option value="user">User</option>
              <option value="Admin">Admin</option>
            </select>

            <button className="p-2 rounded-md bg-blue-500 text-white w-[25rem] border-none mt-3 hover:bg-blue-700 transition-colors">
              Edit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
