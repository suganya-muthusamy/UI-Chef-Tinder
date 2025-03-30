import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { addFeed } from "../redux/feedSlice";
import { useDispatch, useSelector } from "react-redux";
import FeedCard from "./FeedCard";

const Feed = () => {
  const feedData = useSelector((store) => store?.feed);
  console.log("feed", feedData);
  const dispatch = useDispatch();

  // const isloggedIn = useSelector((store) => store?.auth?.isLoggedIn);
  // console.log("isloggedIn", isloggedIn);

  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      if (res?.data?.data) {
        dispatch(addFeed(res.data.data));
      }
    } catch (error) {
      console.log("Error fetching feed:", error.message);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feedData || feedData.length === 0) {
    return (
      <div className="flex justify-center my-10 h-screen">
        No Feed Available
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mx-auto">
      <FeedCard data={feedData[0]} />
    </div>
  );
};

export default Feed;
