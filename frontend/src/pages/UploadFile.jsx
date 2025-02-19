import React, { useState, useRef, useEffect } from "react";
import Layout from "../templates/Layout";
import { fetchWithAuth } from "../utils/auth";

export default function UploadFile() {
  const fileInputRef = useRef(null);

  // Trigger file selection window
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  // Handle file selection
  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const text = e.target.result;
        const response = await fetchWithAuth(
          "/ai/create-cards-from-file",
          { text: text },
          "POST",
        );
        const data = await response.json();
        console.log(JSON.parse(data));
      };
      reader.readAsText(selectedFile);
    }
  };

  return (
    <Layout
      authRequired={true}
      content={
        <>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
            accept=".txt, .md, .tex"
          />

          <div className="flex flex-col items-center">
            <button className="btn btn-primary" onClick={handleButtonClick}>
              Upload file
            </button>
          </div>
        </>
      }
    />
  );
}
