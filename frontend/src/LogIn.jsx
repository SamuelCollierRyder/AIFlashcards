import React, { useState } from "react";
import Layout from "./Layout";
import Input from "@cloudscape-design/components/input";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import { useNavigate } from "react-router-dom";

async function logIn(email, password, setMessage, navigate) {
  try {
    const response = await fetch(
      `http://localhost:5000/log-in?email=${email}&password=${password}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      },
    );

    if (!response.ok) {
      setMessage("Login failed");
      throw new Error("Login failed");
    }

    const data = await response.json();
    localStorage.setItem("token", data.access_token);
    localStorage.setItem("refresh_token", data.refresh_token);
    navigate("/");
  } catch (error) {
    console.error("Login failed:", error);
    setMessage("Login failed");
    throw error;
  }
}

export default function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [message, setMessage] = useState(null);
  return (
    <Layout
      content={
        <div
          style={{
            height: "70vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <SpaceBetween alignItems="center" size="xs">
            <div>{message}</div>
            <Input
              onChange={({ detail }) => setEmail(detail.value)}
              value={email}
              placeholder="Email"
            />
            <Input
              onChange={({ detail }) => setPassword(detail.value)}
              value={password}
              placeholder="Password"
              type="password"
            />
            <Button
              onClick={() => logIn(email, password, setMessage, navigate)}
            >
              Log in
            </Button>
          </SpaceBetween>
        </div>
      }
    />
  );
}
