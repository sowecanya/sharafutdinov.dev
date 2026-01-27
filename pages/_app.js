import "../styles/globals.css";
import Head from "next/head";
import { ThemeProvider } from "next-themes";
import Background from "../components/background";
import Menu from "../components/menu";
import { Toaster } from "react-hot-toast";
import React from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { LanguageProvider, getDefaultLocale } from "../lib/i18n";
import { personSchema, websiteSchema } from "../components/SEO";

// Helper to parse cookies from string
function parseCookies(cookieString) {
  const cookies = {};
  if (!cookieString) return cookies;
  cookieString.split(";").forEach((cookie) => {
    const [name, value] = cookie.split("=").map((c) => c.trim());
    if (name && value) cookies[name] = value;
  });
  return cookies;
}

// Detect locale with priority: Cookie > Accept-Language > IP Country > Default
function detectLocale(req) {
  if (!req) return "en";

  // 1. Cookie (user's explicit choice) - HIGHEST PRIORITY
  const cookies = parseCookies(req.headers?.cookie || "");
  if (cookies.locale === "ru" || cookies.locale === "en") {
    return cookies.locale;
  }

  // 2. Accept-Language (browser preference) - BETTER than IP
  const acceptLang = req.headers?.["accept-language"] || "";
  if (acceptLang.toLowerCase().startsWith("ru")) {
    return "ru";
  }

  // 3. IP Country (Vercel geo header) - FALLBACK
  const country = req.headers?.["x-vercel-ip-country"] || "";
  return getDefaultLocale(country);
}

function MyApp({ Component, pageProps, initialLocale }) {
  // Use initialLocale from getInitialProps (SSR) or fallback to 'en'
  const locale = initialLocale || "en";

  return (
    <LanguageProvider initialLocale={locale}>
      <ThemeProvider attribute="class" value={{ dark: "dark-theme" }}>
        <Head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify([personSchema, websiteSchema]),
            }}
          />
        </Head>
        <Toaster
          toastOptions={{
            duration: 1500,
            style: {
              padding: "3px",
              borderRadius: "6px",
              fontSize: "14px",
            },
          }}
        />
        <div className="base"></div>
        <Background />
        <Menu />
        <Component {...pageProps} />
        <Analytics />
        <SpeedInsights />
      </ThemeProvider>
    </LanguageProvider>
  );
}

// Detect locale on server with Accept-Language + IP fallback
MyApp.getInitialProps = async ({ ctx }) => {
  const initialLocale = detectLocale(ctx.req);
  return { initialLocale };
};

export default MyApp;
