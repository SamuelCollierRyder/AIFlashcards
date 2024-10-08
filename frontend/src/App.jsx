import React, { useState, useEffect } from "react";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import AddCardModal from "./AddCardModal";
import ReviewCardModal from "./ReviewCardModal";
import Layout from "./Layout";
import FileUpload from "./FileUpload";
import { fetchWithAuth, getLoggedInUser } from "./utils.js";

export default function App() {
  const [addCardVisibile, setAddCardVisibile] = useState(false);
  const [reviewCardVisibile, setReviewCardVisibile] = useState(false);
  const [cards, setCards] = useState([]);
  const [index, setIndex] = useState(0);
  const [user, setUser] = useState(null);
  const loggedIn = Boolean(user);

  async function fetchCards() {
    fetchWithAuth("http://localhost:5000/get-cards")
      .then((data) => data.json())
      .then((data) => {
        setCards(data);
      });
  }

  useEffect(() => {
    fetchCards(setCards);
  }, []);

  useEffect(() => {
    getLoggedInUser().then((user) => setUser(user));
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
              answer={cards[index].answer}
              question={cards[index].question}
              id={cards[index]._id.$oid}
              nextCard={() =>
                cards.length - 1 > index ? setIndex(index + 1) : setIndex(0)
              }
            />
          ) : null}

          <SpaceBetween alignItems="center" size="xs">
            <div>Hello {user}</div>
            {loggedIn ? (
              <>
                <Button
                  variant={cards.length ? "primary" : "disabled"}
                  onClick={() =>
                    cards.length ? setReviewCardVisibile(true) : null
                  }
                >
                  Practice
                </Button>
                <Button onClick={() => setAddCardVisibile(true)}>
                  Create card
                </Button>
                <FileUpload text={"Create cards from file"} />
              </>
            ) : (
              <div>Log in to start practicing</div>
            )}
          </SpaceBetween>
        </div>
      }
    />
  );
}
