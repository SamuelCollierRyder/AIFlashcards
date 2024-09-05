import React, { useState, useEffect } from "react";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import ContentLayout from "@cloudscape-design/components/content-layout";
import { applyTheme } from "@cloudscape-design/components/theming";
import Header from "./Header";
import AddCardModal from "./AddCardModal";
import ReviewCardModal from "./ReviewCardModal";

function nextCard(cards, index) {
  if (cards.length - 1 > index) {
    return index + 1;
  }
  return 0;
}

export default function App() {
  const [addCardVisibile, setAddCardVisibile] = useState(false);
  const [reviewCardVisibile, setReviewCardVisibile] = useState(false);
  const [cards, setCards] = useState([{}]);
  const [index, setIndex] = useState(0);

  const theme = {
    tokens: {
      colorBackgroundLayoutMain: "white"
    },
    contexts: {
      "top-navigation": {
        tokens: {
          colorTextAccent: "#44b9d6",
          colorBackgroundContainerContent: "#83c5be"
        },
      },
    },
  };

  applyTheme({ theme });

  async function fetchCards() {
    fetch("http://localhost:3000/cards")
      .then((data) => data.json())
      .then((data) => setCards(data));
  }

  useEffect(() => {
    fetchCards(setCards);
  }, []);

  return (
    <ContentLayout header={<Header />}>
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

        <ReviewCardModal
          isVisible={reviewCardVisibile}
          setVisible={setReviewCardVisibile}
          answer={cards[index].back}
          question={cards[index].front}
          nextCard={() =>
            cards.length - 1 > index ? setIndex(index + 1) : setIndex(0)
          }
        />

        <SpaceBetween alignItems="center" size="xs">
          <Button onClick={() => setAddCardVisibile(true)}>Create card</Button>
          <Button variant="primary" onClick={() => setReviewCardVisibile(true)}>
            Practice
          </Button>
        </SpaceBetween>
      </div>
    </ContentLayout>
  );
}
