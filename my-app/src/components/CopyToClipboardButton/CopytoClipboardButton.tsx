"use client";

import { ContentCopy } from "@mui/icons-material";
import { Button, IconButton, Snackbar } from "@mui/material";
import { useState } from "react";

const CopyToClipboardButton = (props: { text: string }) => {
  const [open, setOpen] = useState(false);
  const [text] = useState(props.text);

  const handleClick = () => {
    setOpen(true);
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      <Button variant="text" onClick={handleClick}>
        Copy to Clipboard
      </Button>
      <Snackbar
        open={open}
        onClose={() => setOpen(false)}
        autoHideDuration={2000}
        message="Copied to clipboard"
      />
    </>
  );
};

export default CopyToClipboardButton;
