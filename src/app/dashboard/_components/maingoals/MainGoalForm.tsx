"use client";
import { useDispatch } from "react-redux";
import { useTypedSelector, AppDispatch } from "@/redux/store";
import {
  getMainGoals,
  buildTree,
  setCurrMainGoal,
} from "@/redux/features/goalsSlice";
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
  const { currentGoal, currMainGoalId } = useTypedSelector(
    (state) => state.goals
  );

  const onSubmit = async (data: FormValues) => {
    const newGoal: Goal = { ...data, ownerId: id! };
    if (currentGoal) newGoal.parentGoalId = currentGoal.id;
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/dashboard/goals/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            Accept: "application/json",
          },
          body: JSON.stringify(newGoal),
        }
      );
      const results = await res.json();
      await dispatch(getMainGoals(id!));
      if (!currentGoal) {
        dispatch(setCurrMainGoal(results.id));
        await dispatch(buildTree(results.id));
      } else {
        await dispatch(buildTree(currMainGoalId));
      }
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
