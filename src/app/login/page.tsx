"use client";

import Image from "next/image";
import googleIcon from "./_imgs/google-icon.png";
import styles from "./login.module.scss";

export default function page() {
  return (
    <div className={styles["login-page"]}>
      <div className={styles["content-container"]}></div>
      <h1 className={styles.title}>Goal Planner</h1>
      <h2 className={styles.subtitle}>Divide and Conquer Your Goals</h2>
      <button className={styles["login-btn"]}>
        <Image
          src={googleIcon}
          alt="google icon"
          className={styles.icon}
        ></Image>
        Login With Google
      </button>
    </div>
  );
}
