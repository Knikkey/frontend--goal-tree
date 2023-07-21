"use client";
import { useEffect, useState } from "react";
import { AnimatedTree } from "react-tree-graph";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";
import { useDispatch } from "react-redux";

export default function GoalTree() {
  const [goalTree, setGoalTree] = useState(null);
  const dispatch = useDispatch();
  const { currMainGoalId } = useSelector((state) => state.mainGoals);

  useEffect(() => {
    const getGoalTree = async () => {
      if (!currMainGoalId) return;
      try {
        const res = await fetch(
          `http://localhost:5000/dashboard/build-tree/${currMainGoalId}`,
          {
            credentials: "include",
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
              Accept: "application/json",
            },
          }
        );
        const data = await res.json();
        console.log(data);
        dispatch(setGoalTree(data));
      } catch (err) {
        console.log(err);
      }
    };
    getGoalTree();
  }, [currMainGoalId]);

  return (
    <div>
      <Typography variant="h6" component="span">
        {currMainGoalId}
      </Typography>
    </div>
  );
}
