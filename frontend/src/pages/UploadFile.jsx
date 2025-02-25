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
        if (data.error) {
          setLoading(false);
          return;
        }
        setCards(data);
        setLoading(false);
      };
      reader.readAsText(selectedFile);
    }
  };

  const removeCard = (index) => {
    cards.splice(index, 1);
    setCards([...cards]);
  };

  const addCard = async (index) => {
    cards.splice(index, 1);
    setCards([...cards]);

    await fetchWithAuth(
      "/cards/add",
      {
        question: cards[index].question,
        answer: cards[index].answer,
      },
      "POST",
    );

    console.log("Card added");
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
            <button
              className="btn btn-primary"
              onClick={handleButtonClick}
              disabled={loading}
            >
              Upload file
            </button>
            <span
              className="loading loading-dots loading-lg m-8"
              style={{ visibility: loading ? "visible" : "hidden" }}
            ></span>

            {cards.map((card, index) => (
              <div
                key={index}
                className="card bg-neutral text-neutral-content w-96 m-2"
              >
                <div className="card-body items-center text-center">
                  <h2 className="card-title">{card.question}</h2>
                  <p>{card.answer}</p>
                  <div className="card-actions justify-end">
                    <button
                      onClick={() => addCard(index)}
                      className="btn btn-primary"
                    >
                      Add
                    </button>
                    <button
                      onClick={() => removeCard(index)}
                      className="btn btn-ghost"
                    >
                      Discard
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      }
    />
  );
}
