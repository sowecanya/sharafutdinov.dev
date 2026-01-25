import React from "react";
import styles from "./LanguageChanger.module.css";
import { useTranslation } from "../lib/i18n";

export function LanguageChanger() {
  const { locale, setLocale, mounted } = useTranslation();

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className={styles.tabs}>
        <div className={styles.tab}>RU</div>
        <div className={styles.tab}>EN</div>
        <span className={styles.glider}></span>
      </div>
    );
  }

  const isRuChecked = locale === "ru" ? "checked" : null;
  const isEnChecked = locale === "en" ? "checked" : null;

  return (
    <div className={styles.tabs}>
      <input
        className={styles.input}
        type="radio"
        id="lang-ru"
        name="lang"
        onChange={() => setLocale("ru")}
        checked={isRuChecked}
      />
      <label className={styles.tab} htmlFor="lang-ru">
        RU
      </label>
      <input
        className={styles.input}
        type="radio"
        id="lang-en"
        name="lang"
        onChange={() => setLocale("en")}
        checked={isEnChecked}
      />
      <label className={styles.tab} htmlFor="lang-en">
        EN
      </label>
      <span className={styles.glider}></span>
    </div>
  );
}
