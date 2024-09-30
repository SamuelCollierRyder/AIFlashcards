import React, { useState } from "react";
import Layout from "./Layout";
import Input from "@cloudscape-design/components/input";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";

async function signUp(email, password, setMessage) {
  await fetch(
    `http://localhost:5000/sign-up?email=${email}&password=${password}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  setMessage("Signed up!");
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
            <Button onClick={() => signUp(email, password, setMessage)}>
              Sign Up
            </Button>
          </SpaceBetween>
        </div>
      }
    />
  );
}
