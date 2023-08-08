"use client";
import { useState } from "react";
import Image from "next/image";
import googleIcon from "./_imgs/google-icon.png";
import { Button, Icon, Stack, Typography } from "@mui/material";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleLogin = async () => {
    setError(false);
    setLoading(true);
    try {
      window.open(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google`,
        "_self"
      );
    } catch (err) {
      setLoading(false);
      setError(true);
    }
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
        disabled={loading}
        sx={{
          color: "#111 !important",
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
        {loading ? "Logging in..." : "Login With Google"}
      </Button>
      {error && (
        <Typography variant="h6" component="p" color="error">
          An error occured
        </Typography>
      )}
    </Stack>
  );
}
