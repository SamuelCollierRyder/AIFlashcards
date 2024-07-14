import React from "react";
import {
  Container,
  Header,
  Input,
  SpaceBetween,
  Button
} from "@cloudscape-design/components";

const LogIn = () => {
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  return (
    <Container header={<Header variant="h2"></Header>}>
      <SpaceBetween size="xl">
        <div>
          Email
          <Input
            onChange={({ detail }) => setUserName(detail.value)}
            value={userName}
            placeholder="Email address"
          />
        </div>
        <div>
          Password
          <Input
            onChange={({ detail }) => setPassword(detail.value)}
            value={password}
            placeholder="Password"
            type="password"
          />
        </div>
        <div>
          <SpaceBetween alignItems="center">
            <Button>Log In </Button>
          </SpaceBetween>
        </div>
      </SpaceBetween>
    </Container>
  );
};

export default LogIn;
