import React from "react";
import {
  AppLayout,
  ContentLayout,
} from "@cloudscape-design/components";
import CustomHeader from "../components/CustomHeader.jsx";
import { Outlet} from "react-router-dom";

export default function Home({component}) {
  return (
    <AppLayout
      toolsHide={true}
      navigationHide={true}
      content={
        <ContentLayout>
          <CustomHeader />
          <Outlet />
        </ContentLayout>
      }
    />
  );
}
