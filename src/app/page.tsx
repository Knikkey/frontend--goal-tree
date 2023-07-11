"use client";

import Image from "next/image";
import googleIcon from "./_imgs/google-icon.png";
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
        <button onClick={handleLogin} className={styles["login-btn"]}>
          <Image
            src={googleIcon}
            alt="google icon"
            className={styles.icon}
          ></Image>
          Login With Google
        </button>
      </div>
    </main>
  );
}
