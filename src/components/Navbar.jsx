import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../redux/userSlice";
import { BASE_URL } from "../utils/constant";

const Navbar = () => {
  // const user = useSelector((store) => store?.user);
  const user = JSON.parse(localStorage.getItem("user"));

  // const connections = useSelector((store) => store?.connection) || [];
  // const connectionsRequest = useSelector((store) => store?.request) || [];

  console.log(user, "connections in navbar");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const hanldeLogout = async () => {
    try {
      const data = await axios.post(
        BASE_URL + "/logout",
        {},
        { withCredentials: true }
      );
      // console.log(data);
      dispatch(removeUser());
      return navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="navbar bg-base-300 sticky top-0 z-50 shadow-lg px-0 md:px-10">
      <div className="flex-1">
        <Link to={"/feed"} className="btn btn-ghost text-xl">
          Chef Tinder
        </Link>
      </div>
      <div className="flex gap-2 mx-5">
        {/* <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          />
        </div> */}
        {user && (
          <div className="dropdown dropdown-end">
            <div className="flex justify between items-center">
              <p className="mr-5">Welcome {user?.data?.firstName}!</p>
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={user?.data?.photoUrl}
                  />
                </div>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-200 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to={"/profile"} className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to={"/connections"}>
                  Connections
                  {/* <span className="badge">{connections.length}</span> */}
                </Link>
              </li>
              <li>
                <Link to={"/connection-requests"}>
                  Connection Requests{" "}
                  {/* <span className="badge">
                    {connectionsRequest && connectionsRequest.length}
                  </span> */}
                </Link>
              </li>
              <li onClick={hanldeLogout}>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
