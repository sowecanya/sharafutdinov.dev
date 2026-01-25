import Head from "next/head";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import util from "../styles/util.module.css";
import styles from "../pages/index.module.css";
import profile from "../content/data/profile.json";
import projects from "../content/data/projects.json";
import { useTranslation } from "../lib/i18n";

// Extract year from date string (e.g., "2025-11-01" → "2025")
function getYear(dateStr) {
  if (!dateStr) return "";
  return dateStr.split("-")[0];
}

// Typewriter effect component
const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
};

const letterVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.03 } },
};

function TypewriterText({ text }) {
  return (
    <motion.span variants={containerVariants} initial="hidden" animate="visible">
      {text.split("").map((char, i) => (
        <motion.span key={i} variants={letterVariants}>
          {char}
        </motion.span>
      ))}
      <motion.span
        className={styles.cursor}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: text.length * 0.05 + 0.2 }}
      >
        |
      </motion.span>
    </motion.span>
  );
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
          {localize(profile.name)} · {t("nav.home")}
        </title>
        <meta name="description" content={localize(profile.description)} />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta property="og:image" content="/og/index.png" />
      </Head>
      <main className={util.page} id="recentsPage">
        <div className={styles.homeColumn}>
          {/* HERO SECTION */}
          <section className={styles.heroSection}>
            <h1 className={styles.heroName}>
              <TypewriterText text={localize(profile.name)} />
            </h1>
            <p className={styles.heroRole}>
              {localize(profile.title)}
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
