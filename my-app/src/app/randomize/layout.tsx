import React from "react";
import Box from "@mui/material/Box";
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import Header from "@/components/Header/Header";
import { AddCircle, Casino, Search } from "@mui/icons-material";

export const metadata = {
  title: "Tesla Referral Link Finder",
  description: "Next.js App Router + Material UI v5",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const links = [
    {
      text: "Search for referral links",
      icon: <Search />,
      href: "/search",
    },
    {
      text: "Randomly get a referral link",
      icon: <Casino />,
      href: "/randomize",
      disabled: true,
    },
    {
      text: "Add my referral link",
      icon: <AddCircle />,
      href: "/submit-referral",
    },
  ];

  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <Header links={links} />
          <Box component="main" sx={{ marginTop: "65px" }}>
            {children}
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  );
}
