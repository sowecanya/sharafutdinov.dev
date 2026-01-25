import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import util from "../styles/util.module.css";
import styles from "../pages/index.module.css";
import profile from "../content/data/profile.json";
import skillsHomeData from "../content/data/skills-home.json";
import projectsData from "../content/data/projects.json";
import { useTranslation } from "../lib/i18n";

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
    <motion.span
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
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
        aria-hidden="true"
      >
        |
      </motion.span>
    </motion.span>
  );
}

export default function Home() {
  const { t, localize, locale } = useTranslation();

  // Get 3 most recent projects
  const recentProjects = useMemo(() => {
    return [...projectsData.items]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 3);
  }, []);

  // Format date for display
  const formatProjectDate = (dateStr) => {
    const date = new Date(dateStr);
    const month = date.getMonth() + 1;
    const year = date.getFullYear().toString().slice(-2);
    const monthName = t(`months.${month}`);
    return `${monthName} ${year}`;
  };

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
            <p className={styles.heroRole}>{localize(profile.title)}</p>
          </section>

          {/* SKILLS SECTION */}
          <section className={styles.skillsSection}>
            <h2 className={styles.sectionTitle}>{t("home.skills")}</h2>
            <div className={styles.skillsGrid}>
              {skillsHomeData.categories.map((category) => (
                <div key={category.id} className={styles.skillCategory}>
                  <h3 className={styles.skillCategoryTitle}>
                    {localize(category.title)}
                  </h3>
                  <div className={styles.skillChips}>
                    {category.skills.map((skill) => (
                      <span key={skill} className={styles.skillChip}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* RECENT PROJECTS SECTION */}
          <section className={styles.recentProjectsSection}>
            <h2 className={styles.sectionTitle}>{t("home.recentProjects")}</h2>
            <ul className={styles.recentProjectsList}>
              {recentProjects.map((project) => {
                const Wrapper = project.url ? "a" : "div";
                const wrapperProps = project.url
                  ? {
                      href: project.url,
                      target: "_blank",
                      rel: "noopener noreferrer",
                      "aria-label": `${localize(project.title)} (${t("common.opensNewTab")})`,
                    }
                  : {};

                return (
                  <li key={project.id} className={styles.recentProjectItem}>
                    <Wrapper
                      className={styles.recentProjectLink}
                      {...wrapperProps}
                    >
                      <span className={styles.recentProjectTitle}>
                        {localize(project.title)}
                        {project.url && (
                          <span className={styles.externalIcon}>↗</span>
                        )}
                      </span>
                      <span className={styles.recentProjectMeta}>
                        <span className={styles.recentProjectType}>
                          {localize(project.type)}
                        </span>
                        <span className={styles.recentProjectDate}>
                          {formatProjectDate(project.date)}
                        </span>
                      </span>
                    </Wrapper>
                  </li>
                );
              })}
            </ul>
            <Link href="/projects">
              <a className={styles.viewAllLink}>
                {t("home.viewAllProjects")} →
              </a>
            </Link>
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
