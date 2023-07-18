"use client";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useTypedSelector, AppDispatch } from "@/redux/store";
import { closeModal } from "@/redux/features/modalSlice";

export default function Modal({ children }) {
  const dispatch = useDispatch<AppDispatch>();
  const { mainGoalsOpen } = useTypedSelector((state) => state.modal);

  return (
    <Dialog open={mainGoalsOpen} aria-labelledby="dialog-title">
      <DialogTitle id="dialog-title">Add a goal</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={() => dispatch(closeModal)}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
