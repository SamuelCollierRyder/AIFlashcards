import React, { useState } from "react";
import Layout from "../templates/Layout";

export default function LogIn() {
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents page reload on form submission
    const email = e.target[0].value;
    const password = e.target[1].value;
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <Layout
      authRequired="false"
      content={
        <>
          <div
            className="hero h-[calc(100vh-68px)]"
            style={{
              backgroundImage:
                "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
            }}
          >
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-neutral-content text-center">
              <div className="max-w-md">
                <h1 className="mb-5 text-5xl font-bold">Welcome to Ponder</h1>
                <p className="mb-5">
                  Provident cupiditate voluptatem et in. Quaerat fugiat ut
                  assumenda excepturi exercitationem quasi. In deleniti eaque
                  aut repudiandae et a id nisi.
                </p>
              </div>
            </div>
          </div>
        </>
      }
    />
  );
}
