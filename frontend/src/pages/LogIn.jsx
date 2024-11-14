import React, { useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

export default function LogIn() {
  const navigate = useNavigate();

  const logIn = async (e) => {
    e.preventDefault();
    try {
      const email = e.target[0].value;
      const password = e.target[1].value;
      const response = await fetch(
        `http://localhost:5000/log-in`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ "email": email, "password": password }),
        },
      );

      if (!response.ok) {
        console.log("Login failed");
      }

      const data = await response.json();
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      navigate("/study");
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  }

  return (
    <>
      <Header />
      <div className="sm:w-4/6 lg:w-3/6 mx-auto">
        <form className="card-body" onSubmit={logIn}>
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered"
            required
          />
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered"
            required
          />
          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary">
              Log in
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
