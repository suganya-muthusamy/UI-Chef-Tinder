import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addUser } from "../redux/userSlice";
import { BASE_URL } from "../utils/constant";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((store) => store.user);
  const fetchUser = async () => {
    if (user) return;
    try {
      const user = await axios.get(BASE_URL + "/profile", {
        withCredentials: true,
      });
      console.log(user.data);
      dispatch(addUser(user.data));
    } catch (err) {
      console.log(err);
      if (err.status === 401) {
        navigate("/login");
      }
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Body;
