import React, { useState } from "react";
import Layout from "./Layout";
import Input from "@cloudscape-design/components/input";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";


async function logIn(email, password, setMessage) {
  try {
    const response = await fetch(`http://localhost:5000/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json();
    const token = data.access_token;
    localStorage.setItem("token", token);
    return token;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
  // let user = null;
  // await fetch("http://localhost:3000/credentials")
  //   .then((data) => data.json())
  //   .then((data) => {
  //     user = (data);
  //   });
  // if (user.find((user) => user.email === email && user.password === password)){
  //   setMessage("Logged in!");
  //   fetch("http://localhost:5000/login")
  // }
  // else {
  //   setMessage("Invalid email or password");
  // }
}

export default function SignUp() {
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
            <Button onClick={() => logIn(email, password, setMessage)}>
              Log in
            </Button>
          </SpaceBetween>
        </div>
      }
    />
  );
}
