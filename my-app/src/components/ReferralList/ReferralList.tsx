"use client";

import { Delete, Edit } from "@mui/icons-material";
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Typography,
} from "@mui/material";
import { ReferralLink } from "@prisma/client";
import { DateTime } from "luxon";
import Link from "next/link";
import React, { useState } from "react";

export default function ReferralList(props: { items: ReferralLink[] }) {
  const [items, setItems] = useState<ReferralLink[]>(props.items);

  return (
    <Box>
      <List>
        {items.map((item, i) => (
          <React.Fragment key={i}>
            <ListItem
              key={i}
              secondaryAction={
                <React.Fragment>
                  <IconButton aria-label="edit" disabled>
                    <Edit />
                  </IconButton>
                  <IconButton aria-label="delete" disabled>
                    <Delete />
                  </IconButton>
                </React.Fragment>
              }
            >
              <ListItemText
                primary={
                  <Link href={item.referral_link} target="_blank">
                    {item.referral_link}
                  </Link>
                }
                secondary={
                  <Typography variant="subtitle2">
                    {" "}
                    Created:{" "}
                    {DateTime.fromISO(
                      item.created_date as unknown as string,
                    ).toLocaleString(DateTime.DATE_MED)}
                  </Typography>
                }
              />
            </ListItem>
            <Divider variant="middle" component="li" />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
}
