"use client";
import { useDispatch } from "react-redux";
import { useTypedSelector, AppDispatch } from "@/redux/store";
import { getMainGoals } from "@/redux/features/goalsSlice";
import Modal from "@/mui-components/Modal";
import MuiForm from "@/mui-components/MuiForm";
import { closeModal } from "@/redux/features/modalSlice";

type FormValues = {
  title: string;
  description: string | null;
  completed: boolean;
};

type Goal = {
  title: string;
  description: string | null;
  completed: boolean;
  ownerId: string;
  parentGoalId?: string;
};

export default function MainGoalForm() {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useTypedSelector((state) => state.user);
  const { currentGoal } = useTypedSelector((state) => state.goals);

  const onSubmit = async (data: FormValues) => {
    const newGoal: Goal = { ...data, ownerId: id! };
    if (currentGoal) newGoal.parentGoalId = currentGoal.id;
    try {
      const res = await fetch(`http://localhost:5000/dashboard/goals/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Accept: "application/json",
        },
        body: JSON.stringify(newGoal),
      });
      const results = await res.json();
      await dispatch(getMainGoals(id!));
      dispatch(closeModal());
      return results;
    } catch (err) {
      return err;
    }
  };

  return (
    <Modal dialogueTitle="Create New Goal">
      <MuiForm onSubmit={onSubmit} isEdit={true} />
    </Modal>
  );
}
