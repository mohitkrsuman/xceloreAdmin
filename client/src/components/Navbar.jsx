import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { newUser } from "../redux/reducers/userSlice";
import AddUser from "./AddUser";
import UserList from "./UserList";

const Navbar = () => {
  const [adduser, setAddUser] = useState(false);
  const [userList, setUserList] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const logoutUser = () => {
    localStorage.clear();
    dispatch(newUser({}));
  };
  const handleCloseUser = () => {
    setUserList(false);
    setAddUser(!adduser);
  };
  const handleCloseList = () => {
    setUserList(!userList);
    setAddUser(false);
  };
  return (
    <div>
      <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                type="button"
                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open main menu</span>
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </button>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  <Link
                    to="/dashboard"
                    className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                    aria-current="page"
                  >
                    Dashboard
                  </Link>
                </div>
              </div>
            </div>
            <div className="absolute flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <div className="relative ml-3 text-white">
                {user && user.role === "user" ? (
                  <div className="flex items-center justify-center gap-5">
                    <button
                      onClick={logoutUser}
                      className="p-2 rounded border-none bg-gray-700"
                    >
                      Logout
                    </button>
                    <h2 className="uppercase text-2xl">{user.role}</h2>
                  </div>
                ) : (
                  <div></div>
                )}
                {adduser && (
                  <div className="absolute top-[8rem] md:top-[5rem] right-[-7rem] md:right-[3rem] xl:right-[7rem] xl:w-[60rem] xl:h-[32rem] bg-gray-800 rounded-lg w-[20rem] md:w-[40rem] md:h-[32rem] 3xl:w-[70rem] 3xl:h-[40rem] text-white">
                    <AddUser setAddUser={setAddUser} />
                  </div>
                )}

                {userList && (
                  <div className="absolute top-[8rem] md:top-[5rem] right-[-7rem] md:right-[3rem] xl:right-[7rem] xl:w-[60rem] xl:h-[32rem] bg-gray-800 rounded-lg w-[20rem] md:w-[40rem] md:h-[32rem] 3xl:w-[70rem] 3xl:h-[40rem] text-white">
                    <UserList setUserList={setUserList} />
                  </div>
                )}

                {user && user.role === "Admin" ? (
                  <div className="flex items-center justify-center gap-4">
                    <button
                      // onClick={() => setAddUser(!adduser)}
                      onClick={() => handleCloseUser()}
                      className="p-2 rounded border-none bg-gray-700 hover:bg-slate-800"
                    >
                      AddUser
                    </button>
                    <button
                      // onClick={() => setUserList(!userList)
                      onClick={() => handleCloseList()}
                      className="p-2 rounded border-none bg-gray-700 hover:bg-slate-800"
                    >
                      UserList
                    </button>
                    <button
                      onClick={logoutUser}
                      className="p-2 rounded border-none bg-gray-700"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="sm:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <Link
              to="/dashboard"
              className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white"
              aria-current="page"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
