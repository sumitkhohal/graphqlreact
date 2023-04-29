import { useQuery } from "@apollo/client";
import React from "react";
import { useNavigate } from "react-router-dom";
import { GET_MY_PROFILE } from "../gqloperations/queries";

const Profile = () => {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_MY_PROFILE, {
    fetchPolicy: "cache-and-network",
  });

  if (!localStorage.getItem("token")) {
    navigate("/login");
  }

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
          src={`https://robohash.org/${data.usr.firstName}.png?size=200x200`}
          alt="pic"
        />
        <h5>
          {data.usr.firstName} {data.usr.lastName}
        </h5>
        <h6>Email - {data.usr.email}</h6>
      </div>
      <h3>Your Quotes</h3>
      {data.usr.quotes.map((quote) => {
        return (
          <blockquote>
            <h6>{quote.name}</h6>
          </blockquote>
        );
      })}
    </div>
  );
};

export default Profile;
