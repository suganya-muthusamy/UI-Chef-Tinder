import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const EditProfile = ({ user, setShowEdit }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [skills, setSkills] = useState(user.skills);
  const [gender, setGender] = useState(user.gender);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [about, setAbout] = useState(user.about);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEdit = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          age,
          skills,
          gender,
          photoUrl,
          about,
        },
        { withCredentials: true }
      );

      console.log(res);
      dispatch(addUser(res?.data?.data));
      setShowEdit(false);
      return navigate("/profile");
    } catch (error) {
      console.log(error.message);
    }
  };
  if (!user) return <p>Loading...</p>;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <fieldset className="fieldset w-4/12 bg-base-200 border border-base-300 p-4 rounded-box relative">
        <legend className="fieldset-legend text-xl">Edit Profile</legend>
        <p
          onClick={() => setShowEdit(false)}
          className="absolute right-0 -top-6 cursor-pointer"
        >
          ❌
        </p>

        <div className="flex flex-col">
          <input
            type="text"
            className="input mb-3"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            className="input mb-3"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            type="number"
            className="input mb-3"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <div className="mb-3">
            <label className="mr-2">Gender:</label>
            <label className="mr-2">
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
          </div>
          <div className="mb-3">
            <label className="mr-2">Skills:</label>
            <input
              type="text"
              className="input mb-2"
              placeholder="Add a skill"
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.target.value.trim()) {
                  setSkills([...skills, e.target.value.trim()]);
                  e.target.value = "";
                }
              }}
            />
            <div className="flex flex-wrap mt-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="badge badge-primary mr-2 mb-2 cursor-pointer"
                  onClick={() =>
                    setSkills(skills.filter((_, i) => i !== index))
                  }
                >
                  {skill} &times;
                </span>
              ))}
            </div>
          </div>
          <input
            type="text"
            className="input mb-3"
            placeholder="Photo URL"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
          />
          <input
            type="text"
            className="input mb-3"
            placeholder="About you"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />

          <button onClick={handleEdit} className="btn btn-primary mt-4">
            Save Profile
          </button>
        </div>
      </fieldset>
    </div>
  );
};

export default EditProfile;
