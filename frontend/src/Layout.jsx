import React from 'react'
import ContentLayout from "@cloudscape-design/components/content-layout";
import { applyTheme } from "@cloudscape-design/components/theming";
import Header from "./Header";

export default function Layout({ content }) {
  const theme = {
    tokens: {
      colorBackgroundLayoutMain: "white",
    },
    contexts: {
      "top-navigation": {
        tokens: {
          colorTextAccent: "#FFFFFF",
          colorTextInteractiveDefault: "#F5F3E7",
          colorBackgroundContainerContent: "#83c5be",
        },
      },
    },
  };

  applyTheme({ theme });

  return (
    <ContentLayout header={<Header />}>
      { content }
    </ContentLayout>
  );
}

