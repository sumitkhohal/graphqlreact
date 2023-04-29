import { useQuery } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";
import { GET_ALL_QUOTES } from "../gqloperations/queries";

const Home = () => {
  const { loading, error, data } = useQuery(GET_ALL_QUOTES, {
    fetchPolicy: "cache-and-network",
  });

  if (loading) return <h1>Loading</h1>;
  if (error) {
    console.log(error.message);
  }
  if (data.quotes.length == 0) {
    return <h1>No quotes are available</h1>;
  }
  return (
    <div className="container">
      {data.quotes.map((quote) => {
        return (
          <blockquote>
            <h6>{quote.name}</h6>
            <Link to={`/profile/${quote.by._id}`}>
              <p className="right-align">~{quote.by.firstName}</p>
            </Link>
          </blockquote>
        );
      })}
    </div>
  );
};

export default Home;
