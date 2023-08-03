"use client";
import Image from "next/image";
import googleIcon from "./_imgs/google-icon.png";
import { Button, Icon, Stack, Typography } from "@mui/material";

export default function Home() {
  const handleLogin = async () => {
    console.log(process.env.NEXT_PUBLIC_BACKEND_URL);
    window.open(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google`, "_self");
  };

  return (
    <Stack
      component="main"
      spacing={2}
      justifyContent="center"
      alignItems="center"
    >
      <Typography variant="h2" component="h1" lineHeight="0.75" align="center">
        Goal Planner
      </Typography>
      <Typography variant="h5" component="h2" align="center">
        Divide and Conquor Your Goals
      </Typography>
      <Button
        onClick={handleLogin}
        variant="outlined"
        sx={{
          color: "#111",
          backgroundColor: "#fff",
          marginTop: "1rem",
          padding: "0.75rem 1.5rem",
          "&:hover": {
            backgroundColor: "#eee",
          },
        }}
        startIcon={
          <Icon sx={{ width: "100%", height: "auto", display: "flex" }}>
            <Image
              src={googleIcon}
              alt="google icon"
              style={{
                maxWidth: "20px",
                width: "100%",
                height: "auto",
                marginRight: "1rem",
              }}
            />
          </Icon>
        }
      >
        Login With Google
      </Button>
    </Stack>
  );
}
