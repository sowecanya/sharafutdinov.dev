import "../styles/globals.css";
import Head from "next/head";
import { ThemeProvider } from "next-themes";
import Background from "../components/background";
import Menu from "../components/menu";
import { Toaster } from "react-hot-toast";
import React from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { LanguageProvider } from "../lib/i18n";
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

// Read locale cookie on server for initial render
MyApp.getInitialProps = async ({ ctx }) => {
  const cookies = parseCookies(ctx.req?.headers?.cookie || "");
  const initialLocale = cookies.locale || "en";
  return { initialLocale };
};

export default MyApp;
