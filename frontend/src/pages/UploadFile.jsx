import React, { useState, useRef, useEffect } from "react";
import Layout from "../templates/Layout";
import { fetchWithAuth } from "../utils/auth";

export default function UploadFile() {
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState([]);

  // Trigger file selection window
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  // Handle file selection
  const handleFileChange = async (event) => {
    setLoading(true);
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
        console.log(data);
        setCards(data);
        setLoading(false);
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
            <span
              className="loading loading-dots loading-lg"
              style={{ visibility: loading ? "visible" : "hidden" }}
            >
              Hello
            </span>
            {cards.map((card, index) => (
              <div key={index} className="card">
                <span>{card.question}:{card.answer}</span>
              </div>
            ))}
          </div>
        </>
      }
    />
  );
}
