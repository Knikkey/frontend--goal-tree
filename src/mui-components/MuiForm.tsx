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

type Props = {
  onSubmit: (data: FormValues) => any;
  goal?: FormSettings;
};

type FormSettings = {
  formTitle: string;
  title?: string;
  description?: string;
  completed?: boolean;
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

export default function MuiForm({ onSubmit, goal }: Props) {
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
            {goal ? goal.formTitle : "Create New Goal"}
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
    </>
  );
}
