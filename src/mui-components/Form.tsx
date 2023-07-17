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

const inputStyle = {
  input: {
    color: "white",
    borderColor: "white",
  },
  label: { color: "white !important" },
  fieldset: { borderColor: "white !important" },
};

export default function Form() {
  const form = useForm();
  const { register, control } = form;

  return (
    <>
      <form className="form">
        <Stack spacing={2}>
          <Typography variant="h4" component="h1">
            Create New Goal
          </Typography>
          <TextField
            label="Goal Title"
            id="goal-title"
            {...register("goal-title")}
            autoFocus={true}
            sx={inputStyle}
            required
          />
          <TextField
            label="Goal Description"
            id="goal-description"
            {...register("goal-description")}
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
            <Button variant="outlined">Reset</Button>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Stack>
        </Stack>
      </form>
      <DevTool control={control} />
    </>
  );
}
