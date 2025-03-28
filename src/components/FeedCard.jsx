import React from "react";

const FeedCard = ({ data }) => {
  const { firstName, lastName, age, skills, photoUrl, about } = data;
  return (
    <div className="card card-compact bg-base-300 w-96 shadow-xl my-5">
      <figure className="">
        <img src={photoUrl} alt="user" className="rounded" />
      </figure>
      <div className="card-body flex flex-col items-center">
        <h2 className="card-title">
          {firstName} {lastName}
        </h2>
        <p>{about}</p>
        {skills.leng && age && <p>Age:{age}</p>}
        <div className="card-actions my-5">
          <button className="btn btn-secondary mx-2">Interested</button>
          <button className="btn btn-primary">Ignore</button>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
