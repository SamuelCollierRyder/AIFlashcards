import React from "react";
import { useNavigate } from "react-router-dom";
import TopNavigation from "@cloudscape-design/components/top-navigation";

export default function Header({ loggedIn = true}) {
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
