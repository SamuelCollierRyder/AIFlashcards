import React, { useState } from "react";
import Layout from "../templates/Layout";
import { fetchWithAuth } from "../utils/auth";

export default function Topic() {
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents page reload on form submission
    setLoading(true);
    const topic = e.target.topic.value;
    const response = await fetchWithAuth(
      "/ai/create-cards-from-topic",
      { topic: topic },
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
          <div className="flex flex-col items-center">
            <form onSubmit={handleSubmit}>
              <div className="join-vertical space-y-2 flex flex-col items-center">
                <textarea
                  className="textarea textarea-bordered w-full resize-none join-item"
                  placeholder="Enter a topic"
                  spellCheck="true"
                  id="topic"
                ></textarea>
                <button id="submit" type="submit" className="btn btn-primary">
                  Generate cards
                </button>
              </div>
            </form>

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
                      className="btn btn-error"
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
