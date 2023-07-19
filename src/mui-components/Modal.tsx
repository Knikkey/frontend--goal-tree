"use client";
import { Button, Dialog, DialogContent, DialogActions } from "@mui/material";
import { useDispatch } from "react-redux";
import { useTypedSelector, AppDispatch } from "@/redux/store";
import { closeModal } from "@/redux/features/modalSlice";

export default function Modal({ children, dialogueTitle }) {
  const dispatch = useDispatch<AppDispatch>();
  const { mainGoalIsOpen } = useTypedSelector((state) => state.modal);

  return (
    <Dialog
      open={mainGoalIsOpen}
      onClose={() => dispatch(closeModal())}
      PaperProps={{
        sx: {
          backgroundColor: "#222",
        },
      }}
      aria-label={dialogueTitle}
    >
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={() => dispatch(closeModal())}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
