import { useSearchParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { MathJax } from "better-react-mathjax";
import Layout from "../templates/Layout";
import { fetchWithAuth } from "../utils/auth";

export default function AddCards() {
  const [searchParams] = useSearchParams();
  const [id, setId] = useState(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents page reload on form submission
    const event = e.nativeEvent.submitter.id;
    const question = e.target.question.value;
    const answer = e.target.answer.value;

    if (event === "preview") {
      setQuestion(question);
      setAnswer(answer);
      document.getElementById("preview_monad").showModal();
    } else if (event === "submit") {
      if (id) {
        await fetchWithAuth(
          "http://localhost:5000/remove-card",
          { id: id },
          "DELETE",
        );
      }

      await fetchWithAuth(
        "http://localhost:5000/add-card?question=",
        {
          question: question,
          answer: answer,
        },
        "POST",
      );
      e.target.question.value = "";
      e.target.answer.value = "";
    }
  };

  useEffect(() => {
    const question = searchParams.get("question");
    if (question) {
      setQuestion(question);
      document.getElementById("question").value = question;
    }

    const answer = searchParams.get("answer");
    if (answer) {
      setAnswer(answer);
      document.getElementById("answer").value = answer;
    }
    const id = searchParams.get("id");
    if (id) {
      setId(id);
    }
  }, []);

  return (
    <Layout
      authRequired={true}
      content={
        <>
          <dialog id="preview_monad" className="modal">
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
      }
    />
  );
}
