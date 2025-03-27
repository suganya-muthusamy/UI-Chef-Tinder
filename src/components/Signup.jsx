import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState(null);
  const [gender, setGender] = useState("");
  // const[photoUrl, setPhotoUrl]=useState("")
  // const[skills, setSkills]=useState([])

  const [toast, settoast] = useState("");

  const navigate = useNavigate();

  const showToast = (data) => {
    settoast(data.data);
  };
  const handleSignup = async () => {
    try {
      const data = await axios.post("http://localhost:3000/signup", {
        firstName,
        lastName,
        emailId,
        password,
        age,
        gender,
      });
      console.log(data);
      if (data) {
        showToast(data);
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }

      // Reset form fields
      setFirstName("");
      setLastName("");
      setEmailId("");
      setPassword("");
      setAge(0);
      setGender("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center my-20">
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
          <input
            type="number"
            className="input mb-3 w-full"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />

          <div className="flex gap-4">
            <label>
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={gender === "Male"}
                onChange={(e) => setGender(e.target.value)}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={gender === "Female"}
                onChange={(e) => setGender(e.target.value)}
              />
              Female
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Others"
                checked={gender === "Others"}
                onChange={(e) => setGender(e.target.value)}
              />
              Others
            </label>
          </div>

          <button onClick={handleSignup} className="btn btn-neutral mt-4">
            Sign Up
          </button>
          <div>
            <span>{toast}</span>
          </div>
        </fieldset>
      </div>
    </>
  );
};

export default Signup;
