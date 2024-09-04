import React, { useState } from 'react'
import Modal from "@cloudscape-design/components/modal";
import Box from "@cloudscape-design/components/box";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";

export default function ReviewCardModal({isVisible, setVisible, question, answer, nextCard}) {
  const [showAnswer, setShowAnswer] = useState(false)
  return (
    <Modal
      onDismiss={() => setVisible(false)}
      visible={isVisible}
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="link" onClick={() => setVisible(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => {
              nextCard()
              setShowAnswer(false)
              }}>Next card</Button>
            <Button variant="primary" onClick={() => setShowAnswer(!showAnswer)}>Toggle show</Button>
          </SpaceBetween>
        </Box>
      }
      header={question}
    >
        {showAnswer ? answer : "-"}
    </Modal>
  )
}
