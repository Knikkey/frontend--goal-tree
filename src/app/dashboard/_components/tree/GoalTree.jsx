"use client";
import { useEffect } from "react";
import { AnimatedTree } from "react-tree-graph";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentGoal, buildTree } from "@/redux/features/goalsSlice";
import { openGoalCard } from "@/redux/features/modalSlice";
import GoalCard from "./GoalCard";
import { Box, CircularProgress } from "@mui/material";

export default function GoalTree() {
  const { currMainGoalId, tree, pending } = useSelector((state) => state.goals);
  const { goalCardIsOpen } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  const handleGoalClick = async (e, nodeKey) => {
    const response = await fetch(
      `http://localhost:5000/dashboard/goals/${nodeKey}`
    );
    const data = await response.json();
    dispatch(setCurrentGoal(data));
    dispatch(openGoalCard());
    console.log(data);
  };

  useEffect(() => {
    dispatch(buildTree(currMainGoalId));
  }, [currMainGoalId]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      {tree && !pending && (
        <AnimatedTree
          data={tree}
          height={500}
          width={800}
          textProps={{
            style: { fill: "white" },
            dy: -15,
            textAnchor: "middle",
          }}
          margins={{ bottom: 10, left: 100, right: 150, top: 10 }}
          keyProp="id"
          gProps={{
            onClick: (e, nodeKey) => {
              handleGoalClick(e, nodeKey);
            },
          }}
        />
      )}
      {pending && <CircularProgress />}
      {goalCardIsOpen && <GoalCard />}
    </Box>
  );
}
