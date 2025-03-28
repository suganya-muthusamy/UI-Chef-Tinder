import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../redux/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const user = useSelector((store) => store.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (user) return;
    try {
      const data = await axios.post(
        BASE_URL + "/login",
        {
          emailId: email,
          password,
        },
        { withCredentials: true }
      );
      if (data.status === 200) {
        dispatch(addUser(data.data));
        navigate("/feed");
      } else {
        console.log("Invalid login credentials");
        return; // Prevent navigation if there's an error
      }
    } catch (error) {
      setMessage(error.response.data);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center my-20">
      <fieldset className="fieldset w-4/12 bg-base-200 border border-base-300 p-4 rounded-box">
        <legend className="fieldset-legend text-xl">Login</legend>

        <div className="flex flex-col">
          <input
            type="email"
            className="input mb-3"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p>{message}</p>
          <button onClick={handleLogin} className="btn btn-neutral mt-4">
            Login
          </button>
        </div>
      </fieldset>
      <p className="mt-5">
        New User?{" "}
        <Link to={"/signup"} className="mx-3">
          Sign Up!
        </Link>
      </p>
    </div>
  );
};

export default Login;
