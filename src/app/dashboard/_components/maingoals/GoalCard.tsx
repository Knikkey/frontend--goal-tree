"use client";
import { useTypedSelector, AppDispatch } from "@/redux/store";
import Modal from "../../../../mui-components/Modal";
import { useDispatch } from "react-redux";
import { closeModal } from "@/redux/features/modalSlice";
import MuiForm from "../../../../mui-components/MuiForm";

type FormValues = {
  title: string;
  description: string | null;
  completed: boolean;
};

export default function GoalCard() {
  const { currentGoal } = useTypedSelector((state) => state.goals);
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = async (data: FormValues) => {
    const newGoal = { ...data };
    try {
      const res = await fetch(
        `http://localhost:5000/dashboard/goals/${currentGoal?.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            Accept: "application/json",
          },
          body: JSON.stringify(newGoal),
        }
      );
      const results = await res.json();
      dispatch(closeModal());
      console.log("success", results);
      return results;
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Modal dialogueTitle={currentGoal?.title}>
      <MuiForm onSubmit={onSubmit} goal={currentGoal} />
    </Modal>
  );
}