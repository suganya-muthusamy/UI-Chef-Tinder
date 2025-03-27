import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/userSlice";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("muthu@gmail.com");
  const [password, setPassword] = useState("Muthu@123");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const data = await axios.post(
        "http://localhost:3000/login",
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
    <div className="flex justify-center items-center my-20">
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
      <p>
        New User? <Link to={"/signup"}>Sign Up!</Link>
      </p>
    </div>
  );
};

export default Login;
