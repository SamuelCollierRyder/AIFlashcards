import React, { useState, useEffect } from "react";
import { MathJax } from "better-react-mathjax";
import { useNavigate } from "react-router-dom";
import Layout from "../templates/Layout";

export default function AddCards({qwe}) {
  console.log(qwe);
  const navigate = useNavigate();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents page reload on form submission
    const event = e.nativeEvent.submitter.id;
    const question = e.target.question.value;
    const answer = e.target.answer.value;

    if (event === "preview") {
      setQuestion(question);
      setAnswer(answer);
      document.getElementById("my_modal_1").showModal();
    } else if (event === "submit") {
    }
  };

  return (
    <Layout authRequired="true" content={
    <>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <strong>Question:</strong>
          <MathJax>{question}</MathJax>
          <strong>Answer:</strong>
          <MathJax>{answer}</MathJax>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>

      <div className="sm:w-4/6 lg:w-3/6 mx-auto my-10">
        <form onSubmit={handleSubmit}>
          <div className="join-vertical space-y-2">
            <textarea
              className="textarea textarea-bordered w-full resize-none join-item"
              placeholder="Question"
              spellCheck="true"
              id="question"
            ></textarea>
            <textarea
              className="textarea textarea-bordered w-full resize-none join-item"
              placeholder="Answer"
              spellCheck="true"
              id="answer"
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button id="preview" className="btn mx-2">
              Show preview
            </button>
            <button id="submit" type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
    } />
  );
}
