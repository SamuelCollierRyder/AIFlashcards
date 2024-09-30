import React, { useState, useEffect } from "react";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import AddCardModal from "./AddCardModal";
import ReviewCardModal from "./ReviewCardModal";
import Layout from "./Layout";
import { fetchWithAuth } from "./utils.js";

export default function App() {
  const [addCardVisibile, setAddCardVisibile] = useState(false);
  const [reviewCardVisibile, setReviewCardVisibile] = useState(false);
  const [cards, setCards] = useState([]);
  const [index, setIndex] = useState(0);
  const [user, setUser] = useState(null);

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

  useEffect(() => {
    fetchWithAuth("http://localhost:5000/get-user")
      .then((data) => data.json())
      .then((data) => {
        setUser(data.logged_in_as);
      });
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
            <div>Hello {user}</div>
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
