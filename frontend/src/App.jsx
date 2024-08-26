import React, { useState, useEffect } from 'react';
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button"
import CardModal from './CardModal';

export default function App() {
  const [visibile, setVisible] = useState(false)
  const [cards, setCards] = useState([])
  useEffect(() => {
    fetch("http://localhost:3000/cards")
      .then((data) => data.json())
      .then((data) => setCards(data))
  }, []);

  return (
    <div style={{ height: "70vh", display: "flex", justifyContent: "center", alignItems: 'center' }}>
      <CardModal isVisible={visibile} setVisible={setVisible} />
      <SpaceBetween alignItems="center" size="xs" >
        <Button onClick={() => setVisible(true)}>Create card</Button>
        <Button variant="primary">
          Practice
        </Button>
      </SpaceBetween>
    </div>
  )
}
