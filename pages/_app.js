import "../styles/globals.css";
import Head from "next/head";
import { ThemeProvider } from "next-themes";
import Background from "../components/background";
import Menu from "../components/menu";
import { Toaster } from "react-hot-toast";
import React from "react";
import { Analytics } from "@vercel/analytics/react";
import { LanguageProvider } from "../lib/i18n";
import { personSchema, websiteSchema } from "../components/SEO";

function MyApp({ Component, pageProps }) {
  // Get initial locale from Vercel geo header (passed via pageProps) or default to 'en'
  const initialLocale = pageProps.initialLocale || "en";

  return (
    <LanguageProvider initialLocale={initialLocale}>
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
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default MyApp;
