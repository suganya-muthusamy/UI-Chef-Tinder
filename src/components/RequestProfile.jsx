import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const RequestProfile = () => {
  const { userId } = useParams();
  console.log("params", userId);

  const requests = useSelector((store) => store.request.data);
  console.log("--------", requests);

  const user = requests.find(
    (request) => request.fromUserId._id === userId
  )?.fromUserId;

  console.log(user);

  return (
    <div className="flex items-center my-20  py-20 px-10 bg-base-200 border-base-100 w-8/12 mx-auto">
      <div className="ml-10 mr-20">
        <img
          src={user?.photoUrl}
          alt={`${user?.firstName} ${user?.lastName}`}
          className="w-60 h-60 rounded-full object-cover mb-4"
        />
        <p className="text-gray-600 mt-4">{user?.about}</p>
      </div>
      <div className=" mb-10">
        <h1 className="text-3xl font-bold">
          {user?.firstName} {user?.lastName}
        </h1>
        <p className="text-gray-500 my-5">Age: {user?.age}</p>
        <p className="text-gray-500 my-5">Gender: {user?.gender}</p>
        <p className="text-gray-500 my-5">Skills: {user?.skills?.join(", ")}</p>
      </div>
    </div>
  );
};

export default RequestProfile;
