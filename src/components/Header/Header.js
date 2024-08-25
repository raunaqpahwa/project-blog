"use client";
import React from "react";
import clsx from "clsx";
import Cookies from "js-cookie";
import { Rss, Sun, Moon } from "react-feather";
import { LIGHT_TOKENS, DARK_TOKENS } from "@/constants";

import Logo from "@/components/Logo";
import VisuallyHidden from "@/components/VisuallyHidden";

import styles from "./Header.module.css";

function Header({ initialTheme, className, ...delegated }) {
  const [theme, setTheme] = React.useState(initialTheme);

  function setThemeCookie() {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    Cookies.set("color-theme", nextTheme);
    const root = document.documentElement;
    const COLORS = nextTheme === "light" ? LIGHT_TOKENS : DARK_TOKENS;
    root.setAttribute("data-color-theme", nextTheme);

    Object.entries(COLORS).forEach(([key, value]) =>
      root.style.setProperty(key, value)
    );
  }

  return (
    <header className={clsx(styles.wrapper, className)} {...delegated}>
      <Logo />

      <div className={styles.actions}>
        <button className={styles.action}>
          <Rss
            size="1.5rem"
            style={{
              // Optical alignment
              transform: "translate(2px, -2px)",
            }}
          />
          <VisuallyHidden>View RSS feed</VisuallyHidden>
        </button>
        <button className={styles.action} onClick={setThemeCookie}>
          {theme === "dark" ? <Sun size="1.5rem" /> : <Moon size="1.5rem" />}
          <VisuallyHidden>Toggle dark / light mode</VisuallyHidden>
        </button>
      </div>
    </header>
  );
}

export default Header;
