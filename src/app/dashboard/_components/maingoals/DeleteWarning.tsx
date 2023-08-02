import Modal from "@/mui-components/Modal";
import { Typography, Stack, Button } from "@mui/material";
import { closeModal } from "@/redux/features/modalSlice";
import { setTree } from "@/redux/features/goalsSlice";
import { useDispatch } from "react-redux";
import { AppDispatch, useTypedSelector } from "@/redux/store";

export default function DeleteWarning() {
  const dispatch = useDispatch<AppDispatch>();
  const { currentGoal, currMainGoalId } = useTypedSelector(
    (state) => state.goals
  );

  const deleteHandler = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/dashboard/goals/${currentGoal?.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            Accept: "application/json",
          },
        }
      );
      const results = await res.json();
      const getGoalTree = async () => {
        dispatch(setTree(null));
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
          dispatch(setTree(data));
          console.log(data);
        } catch (err) {
          console.log(err);
        }
      };
      getGoalTree();
      dispatch(closeModal());
      console.log("success", results);
      return results;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal dialogueTitle="WARNING">
      <Stack spacing={2} justifyContent="end">
        <Typography variant="h2" align="center" color="error">
          WARNING
        </Typography>
        <Typography>
          You are about to delete this goal and all of the child goals that are
          associated with it. This process cannot be reversed. Proceed?
        </Typography>
        <Button variant="contained" color="error" onClick={deleteHandler}>
          DELETE
        </Button>
      </Stack>
    </Modal>
  );
}
