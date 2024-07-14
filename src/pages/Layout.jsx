import React from "react";
import {
  AppLayout,
  ContentLayout,
  SpaceBetween,
} from "@cloudscape-design/components";
import CustomHeader from "../components/CustomHeader.jsx";
import { Outlet } from "react-router-dom";

export default function Home() {
  return (
    <AppLayout
      toolsHide={true}
      navigationHide={true}
      content={
        <ContentLayout>
          <SpaceBetween size="xl">
            <CustomHeader />
            <Outlet />
          </SpaceBetween>
        </ContentLayout>
      }
    />
  );
}
