"use client";
import Image from "next/image";
import googleIcon from "./_imgs/google-icon.png";
import { Button, Icon } from "@mui/material";
import styles from "./page.module.scss";

export default function Home() {
  const handleLogin = async () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };

  return (
    <main>
      <div className={styles["content-container"]}>
        <h1>Goal Planner</h1>
        <h2>Divide and Conquor Your Goals</h2>
        <Button
          onClick={handleLogin}
          variant="outlined"
          sx={{
            color: "#111",
            backgroundColor: "#fff",
            "&:hover": {
              backgroundColor: "#eee",
            },
          }}
          startIcon={
            <Icon className={styles.icon}>
              <Image
                src={googleIcon}
                alt="google icon"
                className={styles.icon}
              />
            </Icon>
          }
        >
          Login With Google
        </Button>
      </div>
    </main>
  );
}
