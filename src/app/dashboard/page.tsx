"use client";
import { useEffect, useState } from "react";
import { login } from "../../redux/features/userSlice";
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
  const [error, setError] = useState(false);
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
      setError(false);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/dashboard`,
          {
            credentials: "include",
          }
        );
        console.log(res);
        const data = await res.json();
        console.log("data", data);
        dispatch(login(data));
      } catch (err) {
        setError(true);
        console.log("err", err);
      }
    };
    handleLogin();
  }, []);

  const handleLogout = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`, {
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
      <Typography
        variant="h3"
        component="h1"
        align="center"
        sx={{ wordWrap: "break-word" }}
      >
        Hello, {firstName}
      </Typography>
      <MainGoals />
      <Button variant="contained" color="error" onClick={handleLogout}>
        Logout
      </Button>
    </Stack>
  );

  const UndefinedUserMsg = (
    <Stack
      spacing={2}
      sx={{
        height: "100%",
        padding: "2rem",
        boxSizing: "border-box",
      }}
    >
      <Typography
        variant="h3"
        component="h1"
        align="center"
        color="error"
        sx={{ wordWrap: "break-word" }}
      >
        Oh no!
      </Typography>
      <Typography>
        There was a problem getting your user data. This may be due to your
        privacy settings. Please try using a different browser like Chrome or
        Safari, or adjust your privacy/cookie settings.
      </Typography>
      <Button variant="contained" onClick={() => router.push("/")}>
        Return to login page
      </Button>
    </Stack>
  );

  return (
    <Stack component="main" direction="row">
      {!error && (
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
      )}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          width: "400px",
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: "400px" },
        }}
      >
        {error ? UndefinedUserMsg : SidebarContent}
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
        {error ? UndefinedUserMsg : SidebarContent}
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
