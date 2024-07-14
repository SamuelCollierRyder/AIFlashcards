import React from "react";
import { Button, Header } from "@cloudscape-design/components";
import Card from "../components/Card.jsx";

export default function Home() {
  const [visible, setVisible] = React.useState(false);
  return (
    <>
      <Button variant="primary" onClick={() => setVisible(true)}>
        Add card
      </Button>
      <Card visible={visible} setVisible={setVisible} />
    </>
  );
}
