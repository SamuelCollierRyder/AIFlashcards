import React from "react";
import Layout from "./Layout";

export default function App() {
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
          Sign up
        </div>
      }
    />
  );
}
