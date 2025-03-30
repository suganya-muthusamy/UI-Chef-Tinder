import axios from "axios";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constant";
import { addConnection } from "../redux/connectionSlice";
import FeedCard from "./FeedCard";
import { Link } from "react-router-dom";

const Connections = () => {
  const connections = useSelector((store) => store.connection);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    if (connections > 0) return;
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnection(res?.data?.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  return (
    <div className="my-10 flex">
      <div className="mx-auto">
        <h1 className="text-xl  mb-4">My Connections</h1>

        {connections.length > 0 &&
          connections.map((connection) => {
            return (
              <Link
                to={`/profile/${connection._id}`}
                className="flex items-center my-2 bg-gray-700 p-2 shadow-sm rounded-sm"
              >
                <div>
                  <img
                    src={connection.photoUrl}
                    alt="connection-user"
                    className="w-20 h-20 object- rounded-full"
                  />
                </div>
                <div className="mx-4">
                  <h1 className="font-bold text-xl">
                    {connection.firstName} {connection.lastName}
                  </h1>
                  <p className="text-gray-500">{connection.about}</p>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default Connections;
