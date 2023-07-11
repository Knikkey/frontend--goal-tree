"use client";
import { useEffect } from "react";
import { login, logout } from "../../redux/features/userSlice";
import { AppDispatch, useTypedSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import styles from "./dashboard.module.scss";
import { useRouter } from "next/navigation";
import MainGoals from "./_components/maingoals/MainGoals";

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
        console.log(data);
        dispatch(login(data));
      } catch (err) {
        console.log(err);
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
    <main className={styles.dashboard}>
      <div className={styles.sidebar}>
        <h1>Hello, {firstName}!</h1>
        <MainGoals />
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div className={styles.mainbar}></div>
    </main>
  );
}
