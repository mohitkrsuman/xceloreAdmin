import axios from "axios";
import React, { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { editUserData } from "../redux/reducers/userDataSlice";

const UserList = ({ setUserList }) => {
  const adminId = JSON.parse(localStorage.getItem("user"))._id;
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getAllUser = async () => {
    try {
      const response = await axios.get(
        `/api/v1/admin/getAllUser/?id=${adminId}`
      );
      if (response.data.success) {
        setData(response.data.users);
        toast.success(response.data.message);
      }
    } catch (err) {
      toast.error("Unable to fetch users");
    }
  };

  useEffect(() => {
    getAllUser();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `/api/v1/admin/deleteUser?id=${adminId}&userId=${id}`
      );
      if (response.data.success) {
        setData(data.filter((item) => item._id !== id));
        toast.success(response.data.message);
      }
    } catch (err) {
      toast.error("Unable to delete user");
    }
  };

  const handleEdit = (user) => {
    setUserList(false);
    navigate("/edit", { state: user });
    dispatch(editUserData(user));
  };

  const searchHandler = async(e) => {
      try{
         const response = await axios.get(`/api/v1/user/search?val=${search}`);
         if(response.data.success){
            setData(response.data.allUsers)
         }
      }catch(err){
         toast.error("Error in search");
      }
  }


  useEffect(() => {
    searchHandler();
  }, [search]);

  return (
    <div className="flex flex-col p-5 overflow-y-scroll h-full">
      <div
        onClick={() => setUserList(false)}
        className="w-full h-[1rem] text-white flex justify-between"
      >
        <div className="w-[90%]"></div>
        <ImCross className="cursor-pointer" />
      </div>
      <div>
        <input
          type="text"
          placeholder="search by name"
          className="w-[14rem] p-3 bg-slate-700 outline-none"
          name='search'
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="text-white mt-[2rem]">
        {data &&
          data.map((user) => (
            <div
              key={user._id}
              className="flex p-2 bg-gray-300 text-black gap-2 mb-6 rounded-md justify-between items-center"
            >
              <div className="flex gap-4">
                <h1>{user.firstname}</h1>
                <h1>{user.lastname}</h1>
                <h1>{user.email}</h1>
                <h1>{user.role}</h1>
              </div>
              <div className="flex gap-3 items-center">
                <button
                  onClick={() => handleEdit(user)}
                  className="p-3 bg-green-500 rounded-md"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user._id)}
                  s
                  className="p-3 bg-red-700 rounded-md"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default UserList;
