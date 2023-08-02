"use client";
import { useEffect } from "react";
import { AnimatedTree } from "react-tree-graph";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentGoal, buildTree } from "@/redux/features/goalsSlice";
import { openGoalCard } from "@/redux/features/modalSlice";
import GoalCard from "./GoalCard";
import { Box, CircularProgress, Typography } from "@mui/material";

export default function GoalTree() {
  const { currMainGoalId, tree, pending, error } = useSelector(
    (state) => state.goals
  );
  const { goalCardIsOpen } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  const handleGoalClick = async (e, nodeKey) => {
    const response = await fetch(
      `http://localhost:5000/dashboard/goals/${nodeKey}`
    );
    const data = await response.json();
    dispatch(setCurrentGoal(data));
    dispatch(openGoalCard());
  };

  useEffect(() => {
    dispatch(buildTree(currMainGoalId));
  }, [currMainGoalId]);

  return (
    <Box
      display="flex"
      alignItems="center"
      height="700px"
      width="700px"
      // sx={{ transform: { xs: "rotate(90deg)", md: "rotate(0deg)" } }}
    >
      {tree && !pending && (
        <AnimatedTree
          data={tree}
          height={700}
          width={700}
          textProps={{
            style: { fill: "white" },
            dy: -15,
            dx: -0.75,
            textAnchor: "middle",
            className: "tree-text",
          }}
          margins={{ bottom: 10, left: 120, right: 180, top: 10 }}
          keyProp="id"
          gProps={{
            onClick: (e, nodeKey) => {
              handleGoalClick(e, nodeKey);
            },
          }}
        />
      )}
      {pending && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}
      {goalCardIsOpen && <GoalCard />}
    </Box>
  );
}
