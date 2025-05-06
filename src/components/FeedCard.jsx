import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { removeFeed } from "../redux/feedSlice";

const FeedCard = ({ data }) => {
  console.log("data: ", data);
  const { _id, firstName, lastName, age, skills, photoUrl, about } = data;

  const dispatch = useDispatch();

  const sendStatus = async (status, id) => {
    const res = await axios.post(
      BASE_URL + `/user/request/send/${status}/${id}`,
      {},
      { withCredentials: true }
    );
    dispatch(removeFeed(id));

    console.log("status: ", res);
  };

  return (
    <div className="card card-compact bg-base-300 w-72 sm:w-80 shadow-xl my-5">
      <figure className="h-92 1-80 w-full">
        <img
          src={photoUrl}
          alt="user"
          className="rounded object-cover h-92 w-80"
        />
      </figure>
      <div className="card-body flex flex-col items-center">
        <h2 className="card-title">
          {firstName} {lastName}
        </h2>
        <p>{about}</p>
        {skills.leng && age && <p>Age:{age}</p>}
        <div className="card-actions my-5">
          <button
            onClick={() => {
              sendStatus("interested", _id);
            }}
            className="btn btn-secondary mx-2"
          >
            Interested
          </button>
          <button
            onClick={() => {
              sendStatus("ignored", _id);
            }}
            className="btn btn-primary"
          >
            Ignore
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
