import React, { useEffect } from "react";
import Header from "../components/Header";
import { getLoggedInUser } from "../utils/auth.js";
import { useNavigate } from "react-router-dom";

export default function Layout({ content, authRequired }) {
  const navigate = useNavigate();

  useEffect(() => {
    getLoggedInUser().then((user) => {
      if (!user && authRequired) {
        console.log("User not logged in");
        navigate("/");
      } else if (user && !authRequired) {
        navigate("/add-cards");
      }
    });
  }, []);

  return (
    <>
      <Header signedIn={authRequired} navigate={navigate} />
      {content}
    </>
  );
}
