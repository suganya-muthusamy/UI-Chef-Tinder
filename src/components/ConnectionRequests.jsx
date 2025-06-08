import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constant";
import { addRequests, removeRequest } from "../redux/requestSlice";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const ConnectionRequests = () => {
  const requests = useSelector((store) => store.request);
  console.log("--------", requests, "--------");
  const dispatch = useDispatch();

  const fetchRequests = async () => {
    if (requests > 0) return;
    try {
      const res = await axios.get(BASE_URL + "/user/request/received", {
        withCredentials: true,
      });
      console.log("all requests", res);
      dispatch(addRequests(res?.data?.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const reviewRequest = async (status, id) => {
    try {
      const res = await axios.post(
        BASE_URL + `/user/request/review/${status}/${id}`,
        {},
        { withCredentials: true }
      );
      console.log("review", res);
      dispatch(removeRequest(id));
    } catch (error) {
      console.log(error);
    }
  };

  if (requests?.length === 0)
    return (
      <h1 className="text-xl my-4 font-bold text-center">
        No Connection Requests Found
      </h1>
    );

  return (
    <div className="flex my-10">
      <div className="mx-auto">
        {requests?.length > 0 && (
          <>
            <h1 className="text-xl mb-4 font-bold">Connection Requests</h1>
            {requests?.map((request) => {
              return (
                <div
                  key={request._id}
                  className="flex flex-shrink-0 my-4 p-4 bg-gray-700 rounded relative"
                >
                  <div>
                    <Link to={`/connection/${request.fromUserId._id}`}>
                      <img
                        src={request.fromUserId.photoUrl}
                        alt="user"
                        className="w-14 h-14 sm:w-20 sm:h-20 mb-5 object-cover rounded-full transition-all duration-300"
                      />
                    </Link>
                    <p className="absolute bottom-1 text-xs mb-2 ">
                      Received on {""}
                      {new Date(request.updatedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="mx-5 mb-5">
                    <Link
                      to={`/connection/${request.fromUserId._id}`}
                      className="font-semibold"
                    >
                      {request.fromUserId.firstName}{" "}
                      {request.fromUserId.lastName}
                    </Link>
                    <div>
                      <button
                        onClick={() => reviewRequest("accepted", request._id)}
                        className="px-4 py-2 rounded bg-primary text-black mt-2 "
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => reviewRequest("rejected", request._id)}
                        className="px-4 py-2 rounded bg-secondary text-black mt-2 mx-2 sm:mx-4"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default ConnectionRequests;
