import { useSearchParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { MathJax } from "better-react-mathjax";
import Layout from "../templates/Layout";
import { fetchWithAuth } from "../utils/auth";
import { MathJaxContext } from "better-react-mathjax";

export default function AddCards() {
  const [searchParams] = useSearchParams();
  const [id, setId] = useState(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loadingAIAnswer, setLoadingAIAnswer] = useState(false);

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
          "/update-card",
          { id: id, question: question, answer: answer },
          "POST",
        );
      } else {
        await fetchWithAuth(
          "/add-card",
          {
            question: question,
            answer: answer,
          },
          "POST",
        );
        e.target.question.value = "";
        e.target.answer.value = "";
      }
    } else if (event === "aiAnswer") {
      setLoadingAIAnswer(true);
      const response = await fetchWithAuth(
        `/get-answer?question=${question}`,
      );
      const data = await response.json();
      document.getElementById("answer").value = data.answer;
      setAnswer(data.answer);
      setLoadingAIAnswer(false);
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
              <MathJaxContext>
                <MathJax>{question}</MathJax>
                <strong>Answer:</strong>
                <MathJax>{answer}</MathJax>
              </MathJaxContext>
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
                  disabled={loadingAIAnswer}
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button
                  id="aiAnswer"
                  className="btn mx-2"
                  disabled={loadingAIAnswer}
                >
                  Generate AI answer
                </button>
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
