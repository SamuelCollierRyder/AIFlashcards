import React, { useState } from "react";
import Header from "../components/Header";

export default function Study() {
  const question = "What is the capital of France?";
  const answer = "Paris";
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <>
      <Header signedIn={true} />
      <div className="flex flex-col items-center">
        <div>{question}</div>
        <div>{showAnswer ? answer : " "}</div>
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
              <button className="btn btn-error m-2">Again</button>
              <button className="btn btn-warning m-2">Hard</button>
              <button className="btn btn-info m-2">Good</button>
              <button className="btn btn-success m-2">Easy</button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
