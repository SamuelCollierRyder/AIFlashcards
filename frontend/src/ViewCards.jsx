import React, { useState } from "react";
import Layout from "./Layout";
import Input from "@cloudscape-design/components/input";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import { useNavigate } from "react-router-dom";

export default function ViewCards() {
  const navigate = useNavigate();
  return (
    <Layout
      content={
        <>Hello world</>
      }
    />
  );
}
