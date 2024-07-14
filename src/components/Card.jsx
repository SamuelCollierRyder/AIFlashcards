import * as React from "react";
import Modal from "@cloudscape-design/components/modal";
import Box from "@cloudscape-design/components/box";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import Textarea from "@cloudscape-design/components/textarea";

const Card = ({visible, setVisible}) => {
  const [frontSideValue, setFrontSideValue] = React.useState("");
  const [backSideValue, setBackSideValue] = React.useState("");
  return (
    <Modal
      onDismiss={() => setVisible(false)}
      visible={visible}
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="link" onClick={() => setVisible(false)}>Cancel</Button>
            <Button variant="primary">Add card</Button>
          </SpaceBetween>
        </Box>
      }
      header="Add Card"
    >
      <SpaceBetween size="xs">
        <Textarea
          onChange={({ detail }) => setFrontSideValue(detail.value)}
          value={frontSideValue}
          placeholder="Add the card's frontside"
        />
        <Textarea
          onChange={({ detail }) => setBackSideValue(detail.value)}
          value={backSideValue}
          placeholder="Add the card's backside"
        />
      </SpaceBetween>
    </Modal>
  );
};

export default Card;
