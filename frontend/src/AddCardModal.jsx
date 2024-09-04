import React from 'react'
import Modal from "@cloudscape-design/components/modal";
import Box from "@cloudscape-design/components/box";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";

export default function AddCardModal({isVisible, setVisible}) {
  return (
    <Modal
      onDismiss={() => setVisible(false)}
      visible={isVisible}
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="link" onClick={() => setVisible(false)}>Cancel</Button>
            <Button variant="primary">Ok</Button>
          </SpaceBetween>
        </Box>
      }
      header="Modal title"
    >
      Your description should go here
    </Modal>
  )
}
