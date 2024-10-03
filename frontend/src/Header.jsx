import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopNavigation from "@cloudscape-design/components/top-navigation";
import { getLoggedInUser } from "./utils.js";

export default function Header({ }) {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // This might not be optimal, consider using a state management library
    getLoggedInUser().then((user) => setLoggedIn(Boolean(user)));
  }, []);

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
      utilities={
        loggedIn
          ? [
            {
              type: "button",
              text: "Log out",
              onClick: () => {
                localStorage.removeItem("token");
                sessionStorage.removeItem("token");
                window.location.reload();
                navigate("/");
              },
            },
          ]
          : [
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
          ]
      }
    />
  );
}
