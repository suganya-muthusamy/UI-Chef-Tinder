import React, { useState } from "react";
import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((store) => store?.user);
  const [showEdit, setShowEdit] = useState(false);
  return (
    <>
      <div className="flex  items-center my-20  py-20 px-10 bg-base-200 border-base-100 w-8/12 mx-auto">
        <div className="ml-10 mr-20">
          <img
            src={user?.photoUrl}
            alt={`${user?.firstName} ${user?.lastName}`}
            className="w-60 h-60 rounded-full object-cover mb-4"
          />
          <p className="text-gray-600 mt-4">{user?.about}</p>

          <div className="ml-auto mt-10">
            <button
              onClick={() => {
                setShowEdit(true);
                console.log("showEdit value:", true);
              }}
              className="btn btn-accent"
            >
              Edit Profile
            </button>
          </div>
        </div>
        <div className=" mb-10">
          <h1 className="text-3xl font-bold">
            {user?.firstName} {user?.lastName}
          </h1>
          <p className="text-gray-500 my-5">Age: {user?.age}</p>
          <p className="text-gray-500 my-5">Gender: {user?.gender}</p>
          <p className="text-gray-500 my-5">
            Skills: {user?.skills?.join(", ")}
          </p>
        </div>
      </div>
      {showEdit && <EditProfile user={user} setShowEdit={setShowEdit} />}
    </>
  );
};

export default Profile;
