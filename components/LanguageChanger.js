import React from "react";
import styles from "./LanguageChanger.module.css";
import { useTranslation } from "../lib/i18n";
import { trackLanguageChange } from "../lib/analytics";

export function LanguageChanger({ idSuffix = "" }) {
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
  const radioName = `lang${idSuffix}`;

  return (
    <div className={styles.tabs}>
      <input
        className={styles.input}
        type="radio"
        id={`lang-ru${idSuffix}`}
        name={radioName}
        onChange={() => handleLocaleChange("ru")}
        checked={isRuChecked}
      />
      <label className={styles.tab} htmlFor={`lang-ru${idSuffix}`}>
        RU
      </label>
      <input
        className={styles.input}
        type="radio"
        id={`lang-en${idSuffix}`}
        name={radioName}
        onChange={() => handleLocaleChange("en")}
        checked={isEnChecked}
      />
      <label className={styles.tab} htmlFor={`lang-en${idSuffix}`}>
        EN
      </label>
      <span className={styles.glider}></span>
    </div>
  );
}
