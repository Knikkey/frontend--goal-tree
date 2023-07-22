import { Snackbar } from "@mui/material";
import { useDispatch } from "react-redux";
import { AppDispatch, useTypedSelector } from "@/redux/store";
import { closeSnack } from "@/redux/features/snackbarSlice";

type Prop = {
  message: string;
};

export default function SnackbarMsg({ message }: Prop) {
  const { snackIsOpen } = useTypedSelector((state) => state.snackbar);

  return (
    <Snackbar
      message={message}
      autoHideDuration={3000}
      open={snackIsOpen}
      onClose={closeSnack}
    />
  );
}
