"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, useTypedSelector } from "@/redux/store";
import { setMainGoals } from "@/redux/features/mainGoalsSlice";
import { Button, Stack, Typography } from "@mui/material";
import PlusButton from "@/mui-components/PlusButton";
import { openMainGoals } from "@/redux/features/modalSlice";
import MainGoalForm from "@/mui-components/MainGoalForm";

export default function MainGoals() {
  const dispatch = useDispatch<AppDispatch>();
  const { mainGoals } = useTypedSelector((state) => state.mainGoals);
  const { mainGoalIsOpen } = useTypedSelector((state) => state.modal);
  const { id } = useTypedSelector((state) => state.user);

  useEffect(() => {
    const getMainGoals = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/dashboard/main-goals/${id}`,
          {
            credentials: "include",
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
              Accept: "application/json",
            },
          }
        );
        const data = await res.json();
        const arr = data.map((goal) => {
          return { id: goal.id, title: goal.title };
        });
        dispatch(setMainGoals(arr));
      } catch (err) {
        console.log(err);
      }
    };
    getMainGoals();
  }, [id]);

  const handleAddMainGoal = () => {
    console.log("button clicked!");
    dispatch(openMainGoals());
  };

  return (
    <Stack spacing={2}>
      {mainGoals &&
        mainGoals.map((goal) => (
          <Button
            key={goal.id}
            id={goal.id}
            sx={{
              padding: "0.5rem 1rem",
              textTransform: "initial !important",
            }}
            variant="contained"
            color="secondary"
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
