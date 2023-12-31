"use client";
import { Button, Dialog, DialogContent, DialogActions } from "@mui/material";
import { useDispatch } from "react-redux";
import { useTypedSelector, AppDispatch } from "@/redux/store";
import { closeModal } from "@/redux/features/modalSlice";

export default function Modal({ children, dialogueTitle }) {
  const dispatch = useDispatch<AppDispatch>();
  const { modalIsOpen } = useTypedSelector((state) => state.modal);

  return (
    <Dialog
      open={modalIsOpen}
      onClose={() => dispatch(closeModal())}
      aria-label={dialogueTitle}
    >
      <DialogContent sx={{ padding: 4 }}>{children}</DialogContent>
      <DialogActions>
        <Button onClick={() => dispatch(closeModal())}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
