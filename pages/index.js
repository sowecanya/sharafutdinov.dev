import Head from "next/head";
import React, { useEffect } from "react";
import util from "../styles/util.module.css";
import Link from "next/link";
import styles from "../pages/index.module.css";
import profile from "../content/data/profile.json";
import projects from "../content/data/projects.json";
import { useTranslation } from "../lib/i18n";

// Extract year from date string (e.g., "2025-11-01" → "2025")
function getYear(dateStr) {
  if (!dateStr) return "";
  return dateStr.split("-")[0];
}

export default function Home() {
  const { t, localize } = useTranslation();

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

  // Sort projects by date (newest first)
  const sortedProjects = [...projects.items].sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

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
          {/* HERO SECTION */}
          <section className={styles.heroSection}>
            <h1 className={styles.heroName}>{profile.name}</h1>
            <p className={styles.heroRole}>{localize(profile.title)}</p>
            <p className={styles.heroValueProp}>{t("home.valueProp")}</p>
            <p className={styles.heroTags}>{t("home.tags")}</p>
            <div className={styles.heroCta}>
              <Link href="/projects">
                <a className={styles.ctaPrimary}>{t("home.viewProjects")}</a>
              </Link>
              <Link href="/about">
                <a className={styles.ctaSecondary}>{t("home.getInTouch")}</a>
              </Link>
            </div>
          </section>

          {/* PHILOSOPHY SECTION (Manifesto Quote) */}
          <section className={styles.philosophySection}>
            <blockquote className={styles.philosophyQuote}>
              <span>{t("home.philosophy.line1")}</span>
              <span>{t("home.philosophy.line2")}</span>
              <span>{t("home.philosophy.line3")}</span>
            </blockquote>
            <p className={styles.philosophyCaption}>
              {t("home.philosophy.caption")}
            </p>
          </section>

          {/* LATEST WORK SECTION (Timeline) */}
          <section className={styles.latestWorkSection}>
            <h2 className={styles.sectionTitle}>{t("home.latestWork")}</h2>
            <ul className={styles.timeline}>
              {sortedProjects.map((project) => (
                <li key={project.id} className={styles.timelineItem}>
                  <div className={styles.timelineContent}>
                    <h3 className={styles.timelineTitle}>
                      {localize(project.title)}
                    </h3>
                    <p className={styles.timelineDescription}>
                      {localize(project.description)}
                    </p>
                  </div>
                  <span className={styles.timelineYear}>
                    {getYear(project.date)}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* BIO SECTION */}
          <section className={styles.bioSection}>
            <h2 className={styles.sectionTitle}>{t("home.bio")}</h2>
            <p className={styles.bioText}>{localize(profile.bio)}</p>
          </section>
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
