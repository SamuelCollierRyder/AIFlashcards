import React, { useState, useEffect } from "react";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import AddCardModal from "./AddCardModal";
import ReviewCardModal from "./ReviewCardModal";
import Layout from "./Layout";

export default function App() {
  const [addCardVisibile, setAddCardVisibile] = useState(false);
  const [reviewCardVisibile, setReviewCardVisibile] = useState(false);
  const [cards, setCards] = useState([]);
  const [index, setIndex] = useState(0);

  async function fetchCards() {
    fetch("http://localhost:3000/cards")
      .then((data) => data.json())
      .then((data) => {
        setCards(data);
      });
  }

  useEffect(() => {
    fetchCards(setCards);
  }, []);

  return (
    <Layout
      content={
        <div
          style={{
            height: "70vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AddCardModal
            isVisible={addCardVisibile}
            setVisible={setAddCardVisibile}
            fetchCards={() => fetchCards()}
          />

          {cards.length ? (
            <ReviewCardModal
              isVisible={reviewCardVisibile}
              setVisible={setReviewCardVisibile}
              answer={cards[index].back}
              question={cards[index].front}
              nextCard={() =>
                cards.length - 1 > index ? setIndex(index + 1) : setIndex(0)
              }
            />
          ) : null}

          <SpaceBetween alignItems="center" size="xs">
            <Button
              variant="primary"
              onClick={() =>
                cards.length ? setReviewCardVisibile(true) : null
              }
            >
              Practice
            </Button>
            <Button onClick={() => setAddCardVisibile(true)}>
              Create card
            </Button>
          </SpaceBetween>
        </div>
      }
    />
  );
}
