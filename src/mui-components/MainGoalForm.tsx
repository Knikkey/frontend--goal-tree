"use client";

import { useTypedSelector, AppDispatch } from "@/redux/store";
import Modal from "./Modal";
import { setSnackOpen } from "@/redux/features/snackbarSlice";
import { useDispatch } from "react-redux";
import { closeModal } from "@/redux/features/modalSlice";
import MuiForm from "./MuiForm";

type FormValues = {
  title: string;
  description: string | null;
  completed: boolean;
};

export default function MainGoalForm() {
  const { id } = useTypedSelector((state) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = async (data: FormValues) => {
    const newGoal = { ...data, ownerId: id, masterGoal: true };
    try {
      const res = await fetch(`http://localhost:5000/dashboard/main-goals/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Accept: "application/json",
        },
        body: JSON.stringify(newGoal),
      });
      const results = await res.json();
      dispatch(setSnackOpen(true));
      dispatch(closeModal());
      console.log("success", results);
      return results;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal dialogueTitle="Create New Goal">
      <MuiForm onSubmit={onSubmit} />
    </Modal>
  );
}
