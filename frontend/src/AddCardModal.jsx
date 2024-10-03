import React, { useState } from "react";
import Modal from "@cloudscape-design/components/modal";
import Box from "@cloudscape-design/components/box";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import Textarea from "@cloudscape-design/components/textarea";
import Spinner from "@cloudscape-design/components/spinner";
import { fetchWithAuth } from "./utils";

async function addCard(input, fetchCards) {
  fetchWithAuth(
    "http://localhost:5000/add-card?question=" +
    input.front +
    "&answer=" +
    input.back,
  );
  setTimeout(fetchCards, 1000); // TODO: Remove this hack
  fetchCards();
}

async function getAIAnswer(question, setAnswerText, setLoading) {
  setLoading(true);
  await fetchWithAuth("http://localhost:5000/get-answer?question=" + question)
    .then((data) => data.json())
    .then((data) => {
      setAnswerText(data.answer);
    });
  setLoading(false);
}

export default function AddCardModal({ isVisible, setVisible, fetchCards }) {
  const [questionText, setQuestionText] = useState("");
  const [answerText, setAnswerText] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <Modal
      onDismiss={() => setVisible(false)}
      visible={isVisible}
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button
              variant="link"
              onClick={() =>
                getAIAnswer(questionText, setAnswerText, setLoading)
              }
              disabled={loading}
            >
              Get AI answer
            </Button>
            <Button variant="link" onClick={() => setVisible(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                addCard({ front: questionText, back: answerText }, fetchCards);
                setAnswerText("");
                setQuestionText("");
              }}
            >
              Add card
            </Button>
          </SpaceBetween>
        </Box>
      }
      header="Add card"
    >
      <SpaceBetween size="xxs">
        <Textarea
          onChange={({ detail }) => setQuestionText(detail.value)}
          value={questionText}
          placeholder={"Enter a question"}
        />
        {loading ? (
          <Spinner />
        ) : (
          <Textarea
            onChange={({ detail }) => setAnswerText(detail.value)}
            value={loading ? <Spinner /> : answerText}
            placeholder={"Enter the answer"}
          />
        )}
      </SpaceBetween>
    </Modal>
  );
}
