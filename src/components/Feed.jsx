import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constant";
import { addFeed } from "../redux/feedSlice";
import { useDispatch, useSelector } from "react-redux";
import FeedCard from "./FeedCard";

const Feed = () => {
  const feedData = useSelector((store) => store?.feed);
  // console.log("feed", feedData);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feedData) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));

      // console.log(res?.data?.data, "feed");
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getFeed();
  }, []);

  return (
    <div className="flex flex-col items-center mx-auto">
      {feedData &&
        feedData.map((data) => <FeedCard key={data._id} data={data} />)}
    </div>
  );
};

export default Feed;
