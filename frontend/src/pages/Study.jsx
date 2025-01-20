import React, { useState, useEffect } from "react";
import { MathJax } from "better-react-mathjax";
import Layout from "../templates/Layout";
import { fetchWithAuth } from "../utils/auth";

export default function Study() {
  const [message, setMessage] = useState(null);
  const [cards, setCards] = useState([{}]);
  const [cardIndex, setCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showButtons, setShowButtons] = useState(true);

  async function fetchCards() {
    fetchWithAuth("http://localhost:5000/get-current-cards")
      .then((data) => data.json())
      .then((data) => {
        if (data.length === 0) {
          setMessage("No cards available");
          setShowButtons(false);
          return;
        }
        setCards(data);
      });
  }

  async function updateTime(hours) {
    await fetchWithAuth(
      "http://localhost:5000/update-time",
      { id: cards[cardIndex]._id.$oid, time: hours },
      "POST",
    );
    await fetchCards();
    setCardIndex((cardIndex + 1) % cards.length);
    setShowAnswer(false);
  }

  function nextCard() {
    setCardIndex((cardIndex + 1) % cards.length);
    setShowAnswer(false);
  }

  useEffect(() => {
    fetchCards();
  }, []);

  return (
    <Layout
      authRequired={true}
      content={
        <div className="flex flex-col items-center">
          <div>
            <MathJax>{message || cards[cardIndex].question}</MathJax>
          </div>
          <div>
            <MathJax>{showAnswer ? cards[cardIndex].answer : " "}</MathJax>
          </div>
          <div className="fixed bottom-0">
            {!showAnswer ? (
              <button
                className="btn btn-primary m-2"
                onClick={() => setShowAnswer(!showAnswer)}
                style={{ visibility: showButtons ? "visible" : "hidden" }}
              >
                Show answer
              </button>
            ) : (
              <>
                <button
                  onClick={() => updateTime("0")}
                  className="btn btn-error m-2"
                >
                  Again
                </button>
                <button
                  onClick={() => updateTime("1")}
                  className="btn btn-warning m-2"
                >
                  Hard
                </button>
                <button
                  onClick={() => updateTime("4")}
                  className="btn btn-info m-2"
                >
                  Good
                </button>
                <button
                  onClick={() => {
                    updateTime("24");
                  }}
                  className="btn btn-success m-2"
                >
                  Easy
                </button>
              </>
            )}
          </div>
        </div>
      }
    />
  );
}
