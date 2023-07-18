"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, useTypedSelector } from "@/redux/store";
import { setMainGoals } from "@/redux/features/mainGoalsSlice";
import PlusButton from "@/mui-components/PlusButton";

import styles from "./MainGoals.module.scss";

export default function MainGoals() {
  const dispatch = useDispatch<AppDispatch>();
  const { mainGoals } = useTypedSelector((state) => state.mainGoals);
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
  };

  return (
    <div className={styles["main-goals"]}>
      {mainGoals &&
        mainGoals.map((goal) => (
          <div key={goal.id} id={goal.id} className={styles.goal}>
            <p>{goal.title}</p>
          </div>
        ))}
      <PlusButton onClick={handleAddMainGoal} ariaLabel="add a new main goal" />
    </div>
  );
}
