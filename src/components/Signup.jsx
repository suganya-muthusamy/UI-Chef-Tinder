import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../redux/userSlice";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");

  const user = useSelector((store) => store.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignup = async () => {
    if (user) {
      return navigate("/feed");
    }
    try {
      const data = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId,
          password,
        },
        { withCredentials: true }
      );
      console.log("signup", data);
      if (data.status === 200) {
        dispatch(addUser(data.data.data));
        return navigate("/profile");
      } else {
        console.log("Invalid signup credentials");
        return; // Prevent navigation if there's an error
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center my-20">
        <fieldset className="fieldset w-4/12 bg-base-200 border border-base-300 p-4 rounded-box">
          <legend className="fieldset-legend">Sign Up</legend>
          <input
            type="text"
            className="input mb-3 w-full"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            className="input mb-3 w-full"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            type="email"
            className="input mb-3 w-full"
            placeholder="Email Id"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
          />

          <input
            type="password"
            className="input mb-3 w-full"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={handleSignup} className="btn btn-neutral mt-4">
            Sign Up
          </button>
        </fieldset>
        <p className="mt-5">
          Already Registered?{" "}
          <Link to={"/login"} className="mx-3">
            Login!
          </Link>
        </p>
      </div>
    </>
  );
};

export default Signup;
