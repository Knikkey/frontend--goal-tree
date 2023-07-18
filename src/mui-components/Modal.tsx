"use client";
import { Button, Dialog, DialogContent, DialogActions } from "@mui/material";
import { useDispatch } from "react-redux";
import { useTypedSelector, AppDispatch } from "@/redux/store";
import { closeModal } from "@/redux/features/modalSlice";

export default function Modal({ children, dialogueTitle }) {
  const dispatch = useDispatch<AppDispatch>();
  const { mainGoalsOpen } = useTypedSelector((state) => state.modal);

  return (
    <Dialog
      open={mainGoalsOpen}
      PaperProps={{
        sx: {
          backgroundColor: "#111",
        },
      }}
      aria-label={dialogueTitle}
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.25)",
      }}
    >
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={() => dispatch(closeModal)}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
