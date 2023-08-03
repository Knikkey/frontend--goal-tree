"use client";
import { ThemeProvider, createTheme } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function ColorThemeProvider({ children }) {
  return <ThemeProvider theme={darkTheme}>{children}</ThemeProvider>;
}
