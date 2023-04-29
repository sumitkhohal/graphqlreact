import { useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import { GET_USER_BY_ID } from "../gqloperations/queries";

const OtherUserProfile = () => {
  const { userId } = useParams();
  console.log(userId);
  const { loading, error, data } = useQuery(GET_USER_BY_ID, {
    variables: { userId },
  });

  if (loading) return <h1>Profile is Loading</h1>;
  if (error) {
    console.log(error.message);
  }
  if (data) {
    console.log(data, "wefwef");
  }
  return (
    <div className="container my-container">
      <div className="center-align">
        <img
          className="circle profileImg"
          src={`https://robohash.org/${data.user.firstName}.png?size=200x200`}
          alt="pic"
        />
        <h5>
          {data.user.firstName} {data.user.lastName}
        </h5>
        <h6>Email - {data.user.email}</h6>
      </div>
      <h3>Your Quotes</h3>
      {data.user.quotes.map((quote) => {
        return (
          <blockquote>
            <h6>{quote.name}</h6>
          </blockquote>
        );
      })}
    </div>
  );
};

export default OtherUserProfile;
