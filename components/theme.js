import { useTheme } from "next-themes";
import React from "react";
import styles from "../components/theme.module.css";
import { trackThemeChange } from "../lib/analytics";

export const ThemeChanger = ({ idSuffix = "" }) => {
  const { theme, setTheme } = useTheme();
  let isLightChecked = theme == "light" ? "checked" : null;
  let isDarkChecked = theme == "dark" ? "checked" : null;
  let isAutoChecked = theme == "system" ? "checked" : null;

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    trackThemeChange(newTheme);
  };

  const radioName = `tabs${idSuffix}`;

  return (
    <div>
      <div className={styles.tabs}>
        <input
          className={styles.input}
          type="radio"
          id={`radio-1${idSuffix}`}
          name={radioName}
          onChange={() => handleThemeChange("light")}
          checked={isLightChecked}
        />
        <label className={styles.tab} htmlFor={`radio-1${idSuffix}`}>
          Light
        </label>
        <input
          className={styles.input}
          type="radio"
          id={`radio-2${idSuffix}`}
          name={radioName}
          onChange={() => handleThemeChange("dark")}
          checked={isDarkChecked}
        />
        <label className={styles.tab} htmlFor={`radio-2${idSuffix}`}>
          Dark
        </label>
        <input
          className={styles.input}
          type="radio"
          id={`radio-3${idSuffix}`}
          name={radioName}
          onChange={() => handleThemeChange("system")}
          checked={isAutoChecked}
        />
        <label className={styles.tab} htmlFor={`radio-3${idSuffix}`}>
          Auto
        </label>
        <span className={styles.glider}></span>
      </div>
    </div>
  );
};
