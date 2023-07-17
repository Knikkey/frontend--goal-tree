"use client";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useState } from "react";

export default function Modal({ children, handleSubmit }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="dialog-title"
    >
      <DialogTitle id="dialog-title">Add a goal</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}
