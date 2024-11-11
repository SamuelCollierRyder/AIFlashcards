import React, { useState } from "react";
import Header from "../components/Header";

export default function LogIn() {
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents page reload on form submission
    const email = e.target[0].value;
    const password = e.target[1].value;
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <>
      <Header />
      <div className="sm:w-4/6 lg:w-3/6 mx-auto">
        <form className="card-body" onSubmit={handleSubmit}>
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
