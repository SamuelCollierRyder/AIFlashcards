import React from "react";
import TopNavigation from "@cloudscape-design/components/top-navigation";

export default function Header() {
  return (
    <TopNavigation
      style={{color: "red"}}
      identity={{
        href: "#",
        title: "Ponder",
        logo: {
          src: "src/images/logo.png",
          alt: "Ponder"
        }
      }}
      utilities={[
        {
          type: "button",
          text: "Link",
          href: "https://example.com/",
          external: true,
          externalIconAriaLabel: " (opens in a new tab)",
        },
      ]}
    />
  );
}
