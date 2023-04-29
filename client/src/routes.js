import Profile from "./components/Profile";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import CreateQuote from "./components/CreateQuote";
import React from "react";
import OtherUserProfile from "./components/OtherUserProfile";
import NotFound from "./components/NotFound";

export const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/create",
    element: <CreateQuote />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/profile/:userId",
    element: <OtherUserProfile />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
