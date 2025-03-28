import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constant";
import { addRequests } from "../redux/requestSlice";
import { useEffect } from "react";

const ConnectionRequests = () => {
  const requests = useSelector((store) => store.request);
  console.log(requests);

  const dispatch = useDispatch();

  const fetchRequests = async () => {
    if (requests) return;
    try {
      const res = await axios.get(BASE_URL + "/user/request/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res?.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="flex my-20">
      <div className="mx-auto">
        <h1 className="text-xl mb-4 font-bold">Connection Requests</h1>
        {requests &&
          requests?.data.map((request) => {
            return (
              <div
                key={request._id}
                className="flex my-4 p-4 bg-gray-700 rounded relative"
              >
                <div>
                  <img
                    src={request.fromUserId.photoUrl}
                    alt="user"
                    className="w-20 h-20 mb-5 object-cover rounded-full"
                  />
                  <p className="absolute bottom-1 text-xs">
                    Received on {""}
                    {new Date(request.updatedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="mx-5">
                  <h1 className="font-semibold">
                    {request.fromUserId.firstName} {request.fromUserId.lastName}
                  </h1>
                  <button className="btn btn-primary mt-2 ">Accept</button>
                  <button className="btn btn-secondary mt-2 mx-4">
                    Reject
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ConnectionRequests;
