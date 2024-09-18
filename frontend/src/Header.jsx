import React from "react";
import { useNavigate } from "react-router-dom";
import TopNavigation from "@cloudscape-design/components/top-navigation";
import { fetchWithAuth } from "./utils.js";

async function test() {
  fetchWithAuth("http://localhost:5000/protected")
    .then((data) => data.json())
    .then((data) => {
      console.log(data);
    });
}

export default function Header() {
  const navigate = useNavigate();

  return (
    <TopNavigation
      identity={{
        href: "/",
        title: "Ponder",
        logo: {
          src: "src/images/logo.png",
          alt: "Ponder",
        },
      }}
      utilities={[
        {
          type: "button",
          text: "Sign up",
          onClick: () => navigate("/sign-up"),
        },
        {
          type: "button",
          text: "Log in",
          onClick: () => navigate("/log-in"),
        },
        {
          type: "button",
          text: "Test JWT",
          onClick: () => test(),
        },
      ]}
    />
  );
}
