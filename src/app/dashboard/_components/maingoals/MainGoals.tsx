"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, useTypedSelector } from "@/redux/store";
import {
  setCurrMainGoal,
  setCurrentGoal,
  getMainGoals,
  buildTree,
} from "@/redux/features/goalsSlice";
import { openMainGoals } from "@/redux/features/modalSlice";
import { Button, Stack, Typography } from "@mui/material";
import PlusButton from "@/mui-components/PlusButton";
import MainGoalForm from "@/app/dashboard/_components/maingoals/MainGoalForm";
import LoadingSpinner from "@/mui-components/LoadingSpinner";

export default function MainGoals() {
  const dispatch = useDispatch<AppDispatch>();
  const { mainGoals, currMainGoalId, pending } = useTypedSelector(
    (state) => state.goals
  );
  const { mainGoalIsOpen } = useTypedSelector((state) => state.modal);
  const { id } = useTypedSelector((state) => state.user);

  useEffect(() => {
    dispatch(getMainGoals(id!));
  }, [id]);

  const handleAddMainGoal = () => {
    dispatch(openMainGoals());
    dispatch(setCurrentGoal(null));
  };

  const handleTreeRender = async (e: React.MouseEvent<HTMLElement>) => {
    const target = e.currentTarget as HTMLButtonElement;
    console.log(target.id, currMainGoalId);
    if (target.id === currMainGoalId) return;
    dispatch(setCurrMainGoal(target.id));
    await dispatch(buildTree(target.id));
  };

  return (
    <Stack spacing={2}>
      {pending && <LoadingSpinner ariaLabel="main goals" />}
      {mainGoals &&
        mainGoals.map((goal) => (
          <Button
            key={goal.id}
            id={goal.id}
            aria-label={`render goal tree for ${goal.title}`}
            sx={{
              padding: "0.5rem 1rem",
              textTransform: "initial !important",
            }}
            variant="contained"
            color="secondary"
            onClick={(e) => handleTreeRender(e)}
          >
            <Typography variant="h6" component="span">
              {goal.title}
            </Typography>
          </Button>
        ))}
      <PlusButton onClick={handleAddMainGoal} ariaLabel="add a new main goal" />
      {mainGoalIsOpen && <MainGoalForm />}
    </Stack>
  );
}
