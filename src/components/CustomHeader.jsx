import React from "react";
import Header from "@cloudscape-design/components/header";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import { Link } from "react-router-dom";

const CustomHeader = () => {
  return (
    <Header
      variant="h1"
      actions={
        <SpaceBetween direction="horizontal" size="xs">
          <Link to="/login">
            <Button>Login</Button>
          </Link>
          <Link to="signup">
            <Button variant="primary">Sign Up</Button>
          </Link>
        </SpaceBetween>
      }
    >
      Sam's flashcards
    </Header>
  );
};

export default CustomHeader;
