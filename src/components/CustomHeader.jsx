import React from 'react'
import Header from "@cloudscape-design/components/header";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";

const CustomHeader = () => {
  return (
    <Header
      variant="h1"
      actions={
        <SpaceBetween direction="horizontal" size="xs">
          <Button>Login</Button>
          <Button variant="primary">
            Sign Up
          </Button>
        </SpaceBetween>
      }
    >
      Sam's flashcards
    </Header>
  )
}

export default CustomHeader
