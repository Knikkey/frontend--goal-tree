"use client";
import { useTypedSelector, AppDispatch } from "@/redux/store";
import Modal from "../../../../mui-components/Modal";
import { useDispatch } from "react-redux";
import {
  closeModal,
  openDeleteWarning,
  openMainGoals,
} from "@/redux/features/modalSlice";
import MuiForm from "../../../../mui-components/MuiForm";
import { Button, Stack } from "@mui/material";
import { useState } from "react";
import DeleteWarning from "./DeleteWarning";

type FormValues = {
  title: string;
  description: string | null;
  completed: boolean;
};

export default function GoalCard() {
  const [isEdit, setIsEdit] = useState(false);
  const { currentGoal } = useTypedSelector((state) => state.goals);
  const { deleteWarningisOpen } = useTypedSelector((state) => state.modal);
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = async (data: FormValues) => {
    const newGoal = { ...data };
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/dashboard/goals/${currentGoal?.id}`,
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
      return results;
    } catch (err) {
      return err;
    }
  };

  const addNewGoalHandler = () => {
    dispatch(openMainGoals());
  };

  return (
    <>
      <Modal dialogueTitle={currentGoal?.title}>
        <MuiForm onSubmit={onSubmit} goal={currentGoal} isEdit={isEdit} />
        {!isEdit && (
          <Stack spacing={2}>
            <Stack spacing={2} direction="row" justifyContent="center">
              <Button variant="outlined" onClick={() => setIsEdit(true)}>
                Edit Goal
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={addNewGoalHandler}
              >
                Add Child Goal
              </Button>
            </Stack>
            <Button
              variant="contained"
              color="error"
              onClick={() => dispatch(openDeleteWarning())}
            >
              Delete Goal
            </Button>
          </Stack>
        )}
      </Modal>
      {deleteWarningisOpen && <DeleteWarning />}
    </>
  );
}
