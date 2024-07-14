"use client";
import React from "react";
import {
  AppLayout,
  ContentLayout,
  Button,
  Header,
} from "@cloudscape-design/components";
import Card from "./components/Card.jsx";
import CustomHeader from "./components/CustomHeader.jsx";

export default function App() {
  const [visible, setVisible] = React.useState(false);
  return (
    <AppLayout
      toolsHide={true}
      navigationHide={true}
      content={
        <ContentLayout>
          <CustomHeader />
          {/* <Button variant="primary" onClick={() => setVisible(true)}> */}
          {/*   Add card */}
          {/* </Button> */}
          <Card visible={visible} setVisible={setVisible} />
        </ContentLayout>
      }
    />
  );
}
