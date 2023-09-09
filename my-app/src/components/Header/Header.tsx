import {
  AppBar,
  Box,
  Button,
  Icon,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

export type HeaderLink = {
  icon: ReactNode;
  text: string;
  href: string;
  disabled?: boolean | (() => boolean);
};

export default function Header({ links }: { links: HeaderLink[] }) {
  return (
    <AppBar position="fixed">
      <Toolbar
        sx={{ backgroundColor: "background.paper", alignItems: "center" }}
      >
        <Icon sx={{ color: "#444", mr: 2, transform: "translateY(-2px)" }}>
          <Image
            src="/images/tesla.svg"
            alt={"Tesa Logo"}
            width={25}
            height={25}
          />
        </Icon>
        <Typography variant="h6" noWrap color="black" sx={{ flexGrow: 1 }}>
          Tesla Referral Finder
        </Typography>
        {links.map((link, i) => (
          <IconButton
            key={i}
            title={link.text}
            LinkComponent={Link}
            href={link.href}
            target="_self"
            disabled={
              typeof link.disabled === "function"
                ? link.disabled()
                : !!link.disabled
            }
          >
            {link.icon}
          </IconButton>
        ))}
      </Toolbar>
    </AppBar>
  );
}
