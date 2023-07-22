"use client";
import { useEffect, useState } from "react";
import { AnimatedTree } from "react-tree-graph";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setCurrentGoal } from "@/redux/features/goalsSlice";
import { openGoalCard } from "@/redux/features/modalSlice";

export default function GoalTree() {
  const [goalTree, setGoalTree] = useState(null);
  const { currMainGoalId } = useSelector((state) => state.goals);
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
        setGoalTree(data);
      } catch (err) {
        console.log(err);
      }
    };
    getGoalTree();
  }, [currMainGoalId]);

  return (
    <div>
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
      {goalCardIsOpen && <p>Goal card opens!</p>}
    </div>
  );
}
