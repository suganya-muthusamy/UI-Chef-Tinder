import React, { useState } from "react";
import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";

const Profile = () => {
  // const user = useSelector((store) => store?.user);
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("user in profile", user);
  const [showEdit, setShowEdit] = useState(false);
  return (
    <div className="flex justify-center">
      <div className="flex flex-col justify-between items-center md:flex-row my-20 py-10 px-5 sm:py-20 sm:px-10 bg-base-200 border-base-100 w-[calc(100vw-30px)] md:w-8/12 ">
        <div className="flex flex-shrink-0 flex-col w-full md:w-5/12 items-center justify-center ">
          <img
            src={user?.data?.photoUrl}
            alt={`${user?.data?.firstName} ${user?.data?.lastName}`}
            className="h-44 w-44 lg:w-60 lg:h-60 rounded-full object-cover mb-4 transition duration-300 "
          />
          <div className="flex items-center justify-between w-full">
            <p className="text-gray-600 mt-4">{user?.data?.about}</p>

            <div className="">
              <button
                onClick={() => {
                  setShowEdit(true);
                  console.log("showEdit value:", true);
                }}
                className="btn btn-accent"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
        <div className="mt-10 md:mt-0 mb-10 w-full md:w-6/12">
          <h1 className="text-3xl font-bold">
            {user?.data?.firstName} {user?.data?.lastName}
          </h1>
          <p className="text-gray-500 my-5">Age: {user?.data?.age}</p>
          <p className="text-gray-500 my-5">Gender: {user?.data?.gender}</p>
          <p className="text-gray-500 my-5">
            Skills: {user?.data?.skills?.join(", ")}
          </p>
        </div>
      </div>
      {showEdit && <EditProfile user={user} setShowEdit={setShowEdit} />}
    </div>
  );
};

export default Profile;
