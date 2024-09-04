import React, { useState } from "react";
import Modal from "@cloudscape-design/components/modal";
import Box from "@cloudscape-design/components/box";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import Textarea from "@cloudscape-design/components/textarea";

async function addCard(input, fetchCards) {
  await fetch("http://localhost:3000/cards", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  // Fetch cards so all new cards are visible when practicing
  await fetchCards()

  return;
}

export default function AddCardModal({ isVisible, setVisible, fetchCards }) {
  const [questionText, setQuestionText] = useState("");
  const [answerText, setAnswerText] = useState("");
  return (
    <Modal
      onDismiss={() => setVisible(false)}
      visible={isVisible}
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="link" onClick={() => setVisible(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                addCard({ front: questionText, back: answerText }, fetchCards)
                setAnswerText("")
                setQuestionText("")
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

        <Textarea
          onChange={({ detail }) => setAnswerText(detail.value)}
          value={answerText}
          placeholder={"Enter the answer"}
        />
      </SpaceBetween>
    </Modal>
  );
}
