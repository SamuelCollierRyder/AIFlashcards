import React, { useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import Layout from "../templates/Layout";

export default function LogIn() {
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const email = e.target.email.value;
      const password = e.target.password.value;
      const response = await fetch(`http://localhost:5000/log-in`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      });

      if (!response.ok) {
        setError(true);
      } else {
        const data = await response.json();
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("refresh_token", data.refresh_token);
        navigate("/study");
      }
    } catch (error) {
      setError(true);
      throw error;
    }
  };

  return (
    <Layout
      content={
        <>
          <div className="sm:w-4/6 lg:w-3/6 mx-auto">
            <form className="card-body" onSubmit={handleSubmit}>
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                id="email"
                type="email"
                placeholder="Email"
                className="input input-bordered"
                required
              />
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                id="password"
                type="password"
                placeholder="Password"
                className="input input-bordered"
                required
              />
              {error ? (
                <div role="alert" className="alert alert-error">
                  <span>Invalid email or password</span>
                </div>
              ) : (
                <></>
              )}
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                  Log in
                </button>
              </div>
            </form>
          </div>
        </>
      }
    />
  );
}
