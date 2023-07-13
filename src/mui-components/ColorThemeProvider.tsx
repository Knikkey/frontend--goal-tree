"use client";
import { ThemeProvider, createTheme, colors } from "@mui/material";

const theme = createTheme({
  palette: {
    secondary: {
      main: colors.common.white,
      contrastText: colors.common.black,
    },
  },
});

export default function ColorThemeProvider({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
