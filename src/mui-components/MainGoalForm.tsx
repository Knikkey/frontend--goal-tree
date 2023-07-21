"use client";
import {
  TextField,
  FormControlLabel,
  Checkbox,
  Typography,
  Button,
  Stack,
  Snackbar,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useEffect, useState } from "react";
import { useTypedSelector, AppDispatch } from "@/redux/store";
import Modal from "./Modal";
//if we decide later we want to close on submit
// import { closeModal } from "@/redux/features/modalSlice";
// import { useDispatch } from "react-redux";

type FormValues = {
  title: string;
  description: string | null;
  completed: boolean;
};

export default function MainGoalForm() {
  const [snackIsOpen, setSnackIsOpen] = useState(false);
  const { id } = useTypedSelector((state) => state.user);
  //if we decide later we want to close on submit
  //const dispatch = useDispatch<AppDispatch>();
  const form = useForm<FormValues>({
    defaultValues: {
      completed: false,
      description: null,
    },
    mode: "onBlur",
  });
  const { register, control, handleSubmit, formState, reset } = form;
  const { errors, isSubmitting, isSubmitSuccessful } = formState;

  const onSubmit = async (data: FormValues) => {
    const newGoal = { ...data, ownerId: id, masterGoal: true };
    try {
      const res = await fetch(`http://localhost:5000/dashboard/main-goals/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Accept: "application/json",
        },
        body: JSON.stringify(newGoal),
      });
      const results = await res.json();
      setSnackIsOpen(true);
      //if we decide later we want to close on submit
      //dispatch(closeModal());
      console.log("success", results);
      return results;
    } catch (err) {
      console.log(err);
    }
  };

  const closeSnack = (_, reason: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackIsOpen(false);
  };

  useEffect(() => {
    if (isSubmitSuccessful) reset();
  }, [isSubmitSuccessful, reset]);

  return (
    <Modal dialogueTitle="Create New Goal">
      <form className="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={2}>
          <Typography variant="h4" component="h2">
            Create New Goal
          </Typography>
          <TextField
            label="Goal Title"
            id="title"
            {...register("title", { required: "Please name your goal" })}
            error={!!errors.title}
            helperText={errors.title?.message}
            required
          />
          <TextField
            label="Goal Description"
            id="description"
            {...register("description")}
            multiline
          />
          <FormControlLabel
            label="Completed"
            control={<Checkbox />}
            id="completed"
            {...register("completed")}
            // checked={state}
            // onChange={handleCompleted}
          />
          <Stack spacing={2} direction="row" justifyContent="end">
            <Button
              variant="outlined"
              onClick={() => reset()}
              disabled={isSubmitting}
            >
              Reset
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={isSubmitting}
            >
              Submit
            </Button>
          </Stack>
        </Stack>
      </form>
      <DevTool control={control} />
      <Snackbar
        message="Goal has been saved!"
        autoHideDuration={3000}
        open={snackIsOpen}
        onClose={closeSnack}
      />
    </Modal>
  );
}