"use client";
import {
  TextField,
  FormControlLabel,
  Checkbox,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useEffect } from "react";
import { useTypedSelector } from "@/redux/store";

const inputStyle = {
  input: {
    color: "white",
    borderColor: "white",
  },
  label: { color: "white !important" },
  fieldset: { borderColor: "white !important" },
};

type FormValues = {
  title: string;
  description: string | null;
  completed: boolean;
};

export default function Form() {
  const { id } = useTypedSelector((state) => state.user);
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
      console.log("success", results);
      return results;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) reset();
  }, [isSubmitSuccessful, reset]);

  return (
    <>
      <form className="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={2}>
          <Typography variant="h4" component="h1">
            Create New Goal
          </Typography>
          <TextField
            label="Goal Title"
            id="title"
            {...register("title", { required: "Please name your goal" })}
            error={!!errors.title}
            helperText={errors.title?.message}
            autoFocus={true}
            sx={inputStyle}
            required
          />
          <TextField
            label="Goal Description"
            id="description"
            {...register("description")}
            sx={inputStyle}
          />
          <FormControlLabel
            label="Completed"
            control={
              <Checkbox
                sx={{
                  color: "white",
                }}
              />
            }
            id="completed"
            {...register("completed")}
            // checked={state}
            // onChange={handleCompleted}
          />
          <Stack spacing={2} direction="row">
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
    </>
  );
}
