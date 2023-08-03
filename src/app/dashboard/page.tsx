"use client";
import { useEffect, useState } from "react";
import { login, logout } from "../../redux/features/userSlice";
import { AppDispatch, useTypedSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import {
  Button,
  Typography,
  Box,
  Stack,
  Drawer,
  IconButton,
} from "@mui/material";
import MainGoals from "./_components/maingoals/MainGoals";
import GoalTree from "./_components/tree/GoalTree";
import MenuIcon from "@mui/icons-material/Menu";

export default function page() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { currMainGoalId } = useTypedSelector((state) => state.goals);
  let firstName = useTypedSelector((state) => state.user.name)?.split(" ")[0];

  const handleDrawer = () => {
    setOpenDrawer((prev) => !prev);
  };

  useEffect(() => {
    handleDrawer();
  }, [currMainGoalId]);

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

  const SidebarContent = (
    <Stack
      sx={{
        height: "100%",
        padding: "2rem",
        boxSizing: "border-box",
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
  );

  return (
    <Stack component="main" direction="row">
      <IconButton
        color="primary"
        aria-label="open main goal menu"
        onClick={handleDrawer}
        sx={{
          display: { xs: "block", md: "none" },
          position: "absolute",
          top: "2%",
          left: "2%",
          zIndex: "99999999999",
        }}
      >
        <MenuIcon sx={{ height: "40px", width: "auto" }} />
      </IconButton>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          width: "400px",
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: "400px" },
        }}
      >
        {SidebarContent}
      </Drawer>

      <Drawer
        variant="temporary"
        open={openDrawer}
        onClose={handleDrawer}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: "100vw" },
        }}
      >
        {SidebarContent}
      </Drawer>
      <Box
        sx={{
          width: { sm: "100%", md: "calc(100vw - 400px)" },
          overflow: "auto",
          backgroundColor: "inherit",
          height: "100vh",
        }}
      >
        <GoalTree />
      </Box>
    </Stack>
  );
}
