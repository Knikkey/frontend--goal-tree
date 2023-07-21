"use client";
import { useEffect, useState } from "react";
import { AnimatedTree } from "react-tree-graph";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";

export default function GoalTree() {
  const [goalTree, setGoalTree] = useState(null);
  const { currMainGoalId } = useSelector((state) => state.mainGoals);

  const handleGoalClick = (e, nodeKey) => {
    console.log(nodeKey);
  };

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
        setGoalTree(data);
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
      {goalTree && (
        <AnimatedTree
          data={goalTree}
          height={500}
          width={500}
          textProps={{ style: { fill: "white" } }}
          keyProp="id"
          gProps={{
            onClick: (e, nodeKey) => {
              handleGoalClick(e, nodeKey);
            },
          }}
        />
      )}
    </div>
  );
}
