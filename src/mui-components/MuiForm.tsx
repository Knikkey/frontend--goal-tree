"use client";
import {
  TextField,
  FormControlLabel,
  Checkbox,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useEffect, useState } from "react";

type Props = {
  onSubmit: (data: FormValues) => any;
  goal?: GoalObj | null;
  isEdit?: boolean;
};

type GoalObj = {
  completed: boolean;
  createdAt: string;
  deadline: null | string;
  description: string;
  id: string;
  ownerId: string;
  parentGoalId: null;
  title: string;
  updatedAt: string;
};

type FormValues = {
  title: string;
  description: string | null;
  completed: boolean;
};

type DefaultValues = {
  title?: string;
  description?: string | null;
  completed?: boolean;
};

export default function MuiForm({ onSubmit, goal, isEdit }: Props) {
  const defaultValues: DefaultValues = {
    description: null,
    completed: false,
  };

  if (goal) {
    defaultValues.title = goal.title;
    goal.description && (defaultValues.description = goal.description);
    defaultValues.completed = goal.completed;
  }

  const form = useForm<FormValues>({
    defaultValues: defaultValues,
    mode: "onBlur",
  });
  const { register, control, handleSubmit, formState, reset } = form;
  const { errors, isSubmitting, isSubmitSuccessful } = formState;

  useEffect(() => {
    if (isSubmitSuccessful) reset();
  }, [isSubmitSuccessful, reset]);

  return (
    <>
      <form className="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={2}>
          <Typography variant="h4" component="h2">
            {goal ? goal.title : "Create New Goal"}
          </Typography>
          <TextField
            label="Goal Title"
            id="title"
            {...register("title", {
              required: "Please name your goal",
              maxLength: {
                value: 22,
                message: "Title cannot be longer than 22 characters",
              },
            })}
            aria-invalid={errors.title ? "true" : "false"}
            error={!!errors.title}
            helperText={errors.title?.message}
            InputProps={{
              readOnly: !isEdit,
            }}
            required
          />
          <TextField
            label="Goal Description"
            id="description"
            {...register("description")}
            multiline
            InputProps={{
              readOnly: !isEdit,
            }}
          />
          <FormControlLabel
            label="Completed"
            control={
              <Controller
                name="completed"
                control={control}
                render={({ field: { value, ...field } }) => (
                  <Checkbox {...field} checked={!!value} disabled={!isEdit} />
                )}
              />
            }
            id="completed"
            {...register("completed")}
          />
          {isEdit && (
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
          )}
        </Stack>
      </form>
      <DevTool control={control} />
    </>
  );
}
