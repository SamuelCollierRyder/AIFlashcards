import React, { useState, useEffect } from "react";
import { MathJax } from "better-react-mathjax";
import Layout from "../templates/Layout";
import { fetchWithAuth } from "../utils/auth";
import { MathJaxContext } from "better-react-mathjax";

export default function Study() {
  const [cards, setCards] = useState([{}]);
  const message = cards.length == 0 ? "No more cards available" : null;
  const [cardIndex, setCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  async function fetchCards() {
    fetchWithAuth("/cards/get-current")
      .then((data) => data.json())
      .then((data) => {
        setCards(data);
      });
  }

  async function updateTime(difficulty) {
    await fetchWithAuth(
      "/cards/update-time",
      { id: cards[cardIndex].id, difficulty: difficulty },
      "POST",
    );
    await fetchCards();
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
            <MathJaxContext>
              <MathJax>
                {message || (cards[cardIndex] ? cards[cardIndex].question : "")}
              </MathJax>
            </MathJaxContext>
          </div>
          <div>
            <MathJaxContext>
              <MathJax>
                {showAnswer && cards[cardIndex] ? cards[cardIndex].answer : " "}
              </MathJax>
            </MathJaxContext>
          </div>
          <div className="fixed bottom-0">
            {!showAnswer ? (
              <button
                className="btn btn-primary m-2"
                onClick={() => setShowAnswer(!showAnswer)}
                style={{ visibility: message ? "hidden" : "visible" }}
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
                  onClick={() => updateTime("2")}
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
                    updateTime("5");
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
