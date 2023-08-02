"use client";
import { useEffect } from "react";
import { login, logout } from "../../redux/features/userSlice";
import { AppDispatch, useTypedSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { Button, Grid, Typography, Box, Stack, Divider } from "@mui/material";
import MainGoals from "./_components/maingoals/MainGoals";
import GoalTree from "./_components/tree/GoalTree";

export default function page() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  let firstName = useTypedSelector((state) => state.user.name)?.split(" ")[0];

  useEffect(() => {
    const handleLogin = async () => {
      try {
        const res = await fetch("http://localhost:5000/dashboard", {
          credentials: "include",
        });
        const data = await res.json();
        dispatch(login(data));
      } catch (err) {
        return err;
      }
    };
    handleLogin();
  }, []);

  const handleLogout = async () => {
    dispatch(logout());
    await fetch("http://localhost:5000/auth/logout", {
      credentials: "include",
    });
    router.push("/");
  };

  return (
    <Stack component="main" sx={{ padding: "1rem" }} direction="row">
      <Stack
        sx={{
          height: "100%",
          width: "30%",
          paddingLeft: "1rem",
          paddingRight: "2rem",
        }}
        spacing={2}
      >
        <Typography variant="h3" component="h1" align="center">
          Hello, {firstName}
        </Typography>
        <MainGoals />
        <Button variant="contained" color="error" onClick={handleLogout}>
          Logout
        </Button>
      </Stack>
      <Divider orientation="vertical" />
      <Box sx={{ width: "70%" }}>
        <GoalTree />
      </Box>
    </Stack>
  );
}
