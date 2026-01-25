import Head from "next/head";
import React, { useEffect } from "react";
import util from "../styles/util.module.css";
import Link from "next/link";
import styles from "../pages/index.module.css";
import profile from "../content/data/profile.json";
import { useTranslation } from "../lib/i18n";

export default function Home() {
  const { t, localize } = useTranslation();
  const [userTime, setUserTime] = React.useState(null);

  useEffect(() => {
    let thisPage = document.querySelector("#recentsPage");
    let top = sessionStorage.getItem("recents-scroll");
    if (top !== null) {
      thisPage.scrollTop = top;
    }
    const handleScroll = () => {
      sessionStorage.setItem("recents-scroll", thisPage.scrollTop);
    };
    thisPage.addEventListener("scroll", handleScroll);
    return () => thisPage.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const hour = new Date().getHours();
    var greetingKey =
      hour > 17
        ? "evening"
        : hour > 11
          ? "afternoon"
          : hour > 4
            ? "morning"
            : hour > 2
              ? "late"
              : "default";
    setUserTime(greetingKey);
  }, []);

  const greeting = userTime
    ? t(`home.greeting.${userTime}`)
    : t("home.greeting.default");

  return (
    <>
      <Head>
        <title>
          {profile.name} · {t("nav.home")}
        </title>
        <meta name="description" content={localize(profile.description)} />
        <link rel="icon" href="/favicon.gif" type="image/gif" />
        <meta property="og:image" content="/og/index.png" />
      </Head>
      <main className={util.page} id="recentsPage">
        <div className={styles.homeColumn}>
          <h1 className={styles.homeGreetingTitle}>{greeting}</h1>
          <span className={styles.tinyText}>
            {t("home.welcome", { name: profile.name.split(" ")[0] })}
          </span>

          <div className={util.read} style={{ marginTop: "2rem" }}>
            <p>{localize(profile.bio)}</p>
          </div>

          <div
            className={styles.homeSectionContainer}
            style={{ marginTop: "3rem" }}
          >
            <h2 className={styles.homeSectionTitle}>{t("home.quickLinks")}</h2>
          </div>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link href="/about">
              <a className={styles.homeLinkButton}>{t("home.aboutMe")}</a>
            </Link>
            <Link href="/projects">
              <a className={styles.homeLinkButton}>{t("nav.projects")}</a>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {},
  };
}
