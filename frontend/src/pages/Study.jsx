import React, { useState, useEffect } from "react";
import Layout from "../templates/Layout";
import { fetchWithAuth } from "../utils/auth";

export default function Study() {
  const [message, setMessage] = useState(null);
  const [cards, setCards] = useState([{}]);
  const [cardIndex, setCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  async function fetchCards() {
    fetchWithAuth("http://localhost:5000/get-cards")
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        if (data.length === 0) {
          setMessage("No cards available");
          return;
        }
        setCards(data);
      });
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
          <div>{message || cards[cardIndex].question}</div>
          <div>{showAnswer ? cards[cardIndex].answer : " "}</div>
          <div className="fixed bottom-0">
            {!showAnswer ? (
              <button
                className="btn btn-primary m-2"
                onClick={() => setShowAnswer(!showAnswer)}
              >
                Show answer
              </button>
            ) : (
              <>
                <button onClick={() => nextCard()} className="btn btn-error m-2">Again</button>
                <button onClick={() => nextCard()} className="btn btn-warning m-2">Hard</button>
                <button onClick={() => nextCard()} className="btn btn-info m-2">Good</button>
                <button onClick={() => nextCard()} className="btn btn-success m-2">Easy</button>
              </>
            )}
          </div>
        </div>
      }
    />
  );
}
