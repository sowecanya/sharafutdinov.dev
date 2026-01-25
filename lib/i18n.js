import React, { createContext, useContext, useState, useEffect } from "react";
import en from "../locales/en.json";
import ru from "../locales/ru.json";

const translations = { en, ru };

const LanguageContext = createContext({
  locale: "en",
  setLocale: () => {},
  t: (key) => key,
});

export function LanguageProvider({ children, initialLocale = "en" }) {
  const [locale, setLocaleState] = useState(initialLocale);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem("locale");
      if (saved && (saved === "en" || saved === "ru")) {
        setLocaleState(saved);
      }
    } catch {
      // localStorage not available
    }
  }, []);

  const setLocale = (newLocale) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem("locale", newLocale);
    } catch {
      // localStorage not available
    }
  };

  const t = (key, params = {}) => {
    const keys = key.split(".");
    let value = translations[locale];
    for (const k of keys) {
      value = value?.[k];
    }
    if (typeof value === "string") {
      return value.replace(/\{(\w+)\}/g, (_, name) => params[name] || "");
    }
    // Fallback to English
    let fallback = translations.en;
    for (const k of keys) {
      fallback = fallback?.[k];
    }
    if (typeof fallback === "string") {
      return fallback.replace(/\{(\w+)\}/g, (_, name) => params[name] || "");
    }
    return key;
  };

  // Helper for localized content (bio, description with {en, ru} structure)
  const localize = (obj) => {
    if (!obj) return "";
    if (typeof obj === "string") return obj;
    return obj[locale] || obj.en || "";
  };

  return (
    <LanguageContext.Provider
      value={{ locale, setLocale, t, localize, mounted }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  return useContext(LanguageContext);
}

// Countries that should default to Russian
const ruCountries = [
  "RU",
  "BY",
  "KZ",
  "UA",
  "KG",
  "UZ",
  "TJ",
  "AM",
  "AZ",
  "MD",
];

export function getDefaultLocale(country) {
  return ruCountries.includes(country) ? "ru" : "en";
}
