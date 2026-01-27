import React, { createContext, useContext, useState, useEffect } from "react";
import en from "../locales/en.json";
import ru from "../locales/ru.json";

const translations = { en, ru };

const LanguageContext = createContext({
  locale: "en",
  setLocale: () => {},
  t: (key) => key,
});

// Helper to read cookie value
function getCookie(name) {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
}

// Helper to set cookie
function setCookie(name, value, days = 365) {
  if (typeof document === "undefined") return;
  const expires = new Date(
    Date.now() + days * 24 * 60 * 60 * 1000,
  ).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax`;
}

export function LanguageProvider({ children, initialLocale = "en" }) {
  const [locale, setLocaleState] = useState(initialLocale);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Priority: localStorage > cookie > initialLocale
    try {
      const savedLocal = localStorage.getItem("locale");
      if (savedLocal && (savedLocal === "en" || savedLocal === "ru")) {
        setLocaleState(savedLocal);
        // Sync cookie with localStorage
        setCookie("locale", savedLocal);
        return;
      }
    } catch {
      // localStorage not available
    }

    // Check cookie (set by middleware based on geo)
    const savedCookie = getCookie("locale");
    if (savedCookie && (savedCookie === "en" || savedCookie === "ru")) {
      setLocaleState(savedCookie);
      // Also save to localStorage for consistency
      try {
        localStorage.setItem("locale", savedCookie);
      } catch {
        // ignore
      }
    }
  }, []);

  const setLocale = (newLocale) => {
    setLocaleState(newLocale);
    // Save to both localStorage and cookie
    try {
      localStorage.setItem("locale", newLocale);
    } catch {
      // localStorage not available
    }
    setCookie("locale", newLocale);
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
