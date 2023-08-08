import { CircularProgress } from "@mui/material";

type Props = {
  describedby?: string;
  ariaLabel?: string;
};

export default function LoadingSpinner({ describedby, ariaLabel }: Props) {
  return (
    <CircularProgress
      aria-describedby={describedby}
      sx={{ margin: "0 auto" }}
    />
  );
}
