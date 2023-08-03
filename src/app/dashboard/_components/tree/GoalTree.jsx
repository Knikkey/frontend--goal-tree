"use client";
import { AnimatedTree } from "react-tree-graph";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentGoal } from "@/redux/features/goalsSlice";
import { openGoalCard } from "@/redux/features/modalSlice";
import GoalCard from "./GoalCard";
import { Box, CircularProgress, Typography } from "@mui/material";

export default function GoalTree() {
  const { tree, pending, error } = useSelector((state) => state.goals);
  const { goalCardIsOpen } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  const handleGoalClick = async (e, nodeKey) => {
    const response = await fetch(
      `https://goal-tree-by-knikkey-backend.onrender.com/dashboard/goals/${nodeKey}`
    );
    const data = await response.json();
    dispatch(setCurrentGoal(data));
    dispatch(openGoalCard());
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      height="700px"
      width="700px"
      //style to rotate node text
      // sx={{ transform: { xs: "rotate(90deg)", md: "rotate(0deg)" } }}
    >
      {tree && !pending && (
        <AnimatedTree
          data={tree}
          height={700}
          width={700}
          svgProps={{ id: "tree", ariaBusy: pending }}
          textProps={{
            style: { fill: "white", cursor: "pointer" },
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
            style: { cursor: "pointer" },
          }}
        />
      )}
      {pending && (
        <CircularProgress aria-describedby="tree" sx={{ margin: "0 auto" }} />
      )}
      {error && (
        <Typography color="error" sx={{ margin: "0 auto" }}>
          {error}
        </Typography>
      )}
      {goalCardIsOpen && <GoalCard />}
    </Box>
  );
}
