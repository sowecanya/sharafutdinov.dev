import React from "react";
import styles from "./LanguageChanger.module.css";
import { useTranslation } from "../lib/i18n";
import { trackLanguageChange } from "../lib/analytics";

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

  const handleLocaleChange = (newLocale) => {
    setLocale(newLocale);
    trackLanguageChange(newLocale);
  };

  const isRuChecked = locale === "ru" ? "checked" : null;
  const isEnChecked = locale === "en" ? "checked" : null;

  return (
    <div className={styles.tabs}>
      <input
        className={styles.input}
        type="radio"
        id="lang-ru"
        name="lang"
        onChange={() => handleLocaleChange("ru")}
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
        onChange={() => handleLocaleChange("en")}
        checked={isEnChecked}
      />
      <label className={styles.tab} htmlFor="lang-en">
        EN
      </label>
      <span className={styles.glider}></span>
    </div>
  );
}
