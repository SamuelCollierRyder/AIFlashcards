import React, { useState } from "react";
import Layout from "../templates/Layout";
import { fetchWithoutAuth } from "../utils/auth";

export default function SignUp() {
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const passwordConfirm = e.target.passwordConfirm.value;

    if (password !== passwordConfirm) {
      setAlertMessage("Passwords do not match");
      setAlertType("alert-error");
      return;
    }

    try {
      const response = await fetchWithoutAuth(
        `/sign-up`,
        { email: email, password: password, passwordConfirm: passwordConfirm },
        "POST",
      );

      if (!response.ok) {
        setAlertMessage("Email already exists");
        setAlertType("alert-error");
      } else {
        setAlertMessage("User created successfully");
        setAlertType("alert-success");
      }
    } catch (error) {
      setAlertMessage("Error creating user");
      setAlertType("alert-error");
      throw error;
    }
  };

  return (
    <Layout
      authRequired={false}
      content={
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

            <label className="label">
              <span className="label-text">Confirm password</span>
            </label>
            <input
              id="passwordConfirm"
              type="password"
              placeholder="Confirm Password"
              className="input input-bordered"
              required
            />
            {alertMessage ? (
              <div role="alert" className={`alert ${alertType}`}>
                <span>{alertMessage}</span>
              </div>
            ) : (
              <></>
            )}

            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                Sign up
              </button>
            </div>
          </form>
        </div>
      }
    />
  );
}
