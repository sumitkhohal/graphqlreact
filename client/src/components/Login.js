import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN_USER } from "../gqloperations/mutations";

const Login = () => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const [signinUser, { loading, error, data }] = useMutation(
    LOGIN_USER
    //   , {
    //   onCompleted(data) {
    //     localStorage.setItem("token", data.user.token);
    //     navigate("/");
    //   },
    // }
  );

  if (loading) return <h1>Loading</h1>;

  if (data) {
    localStorage.setItem("token", data.user.token);
    navigate("/");
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    signinUser({
      variables: {
        userSignIn: formData,
      },
    });
  };

  return (
    <div className="container my-container">
      {error && <div className="red card-panel">{error.message}</div>}

      <h5>LOGIN</h5>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          value={formData.email}
          name="email"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          placeholder="password"
          value={formData.password}
          name="password"
          onChange={handleChange}
          required
        />
        <Link to="/signup">
          <p>Don't have an account?</p>
        </Link>
        <button
          className="btn #673ab7 deep-purple
"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
