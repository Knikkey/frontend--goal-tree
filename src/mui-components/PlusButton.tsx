import { Button, IconButton } from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";

export default function PlusButton({ onClick, ariaLabel }) {
  return (
    <IconButton aria-label={ariaLabel} color="primary" onClick={onClick}>
      <ControlPointIcon />
    </IconButton>
  );
}
