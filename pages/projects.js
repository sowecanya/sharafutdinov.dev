import Head from "next/head";
import React, { useEffect, useMemo } from "react";
import util from "../styles/util.module.css";
import styles from "./projects.module.css";
import ProjectTile from "../components/tiles/projectTile";
import profile from "../content/data/profile.json";
import projectsData from "../content/data/projects.json";
import { useTranslation } from "../lib/i18n";

export default function Projects() {
  const { t, localize } = useTranslation();

  useEffect(() => {
    let thisPage = document.querySelector("#projectsPage");
    let top = sessionStorage.getItem("projects-scroll");
    if (top !== null) {
      thisPage.scrollTop = top;
    }
    const handleScroll = () => {
      sessionStorage.setItem("projects-scroll", thisPage.scrollTop);
    };
    thisPage.addEventListener("scroll", handleScroll);
    return () => thisPage.removeEventListener("scroll", handleScroll);
  }, []);

  // Group projects by year, sorted descending
  const projectsByYear = useMemo(() => {
    const groups = {};
    projectsData.items.forEach((project) => {
      const year = new Date(project.date).getFullYear();
      if (!groups[year]) {
        groups[year] = [];
      }
      groups[year].push(project);
    });

    const sortedYears = Object.keys(groups)
      .map(Number)
      .sort((a, b) => b - a);

    return sortedYears.map((year) => ({
      year,
      projects: groups[year].sort(
        (a, b) => new Date(b.date) - new Date(a.date),
      ),
    }));
  }, []);

  return (
    <>
      <Head>
        <title>
          {localize(profile.name)} · {t("projects.title")}
        </title>
        <meta name="description" content={t("projects.description")} />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta property="og:image" content="/og/index.png" />
      </Head>

      <main id="projectsPage" className={util.page}>
        <div className={util.pageColumn}>
          <h1 className={util.header}>{t("projects.title")}</h1>
          <p className={util.description}>{t("projects.description")}</p>

          <div className={styles.timeline}>
            <div className={styles.timelineLine} aria-hidden="true" />

            {projectsByYear.map(({ year, projects }) => (
              <section key={year} className={styles.yearSection}>
                <h2 className={styles.yearTitle}>{year}</h2>
                <ul className={styles.projectList}>
                  {projects.map((project) => {
                    const date = new Date(project.date);
                    const month = date.getMonth() + 1;
                    const monthName = t(`months.${month}`);

                    return (
                      <ProjectTile
                        key={project.id}
                        image={project.image}
                        title={localize(project.title)}
                        content={localize(project.description)}
                        type={localize(project.type)}
                        date={`${monthName} ${year}`}
                        stack={project.stack}
                        stackLabel={t("projects.stack")}
                        url={project.url}
                        internal={project.internal ? "true" : undefined}
                        status={project.status}
                        statusLabel={
                          project.status
                            ? t(`projects.status.${project.status}`)
                            : undefined
                        }
                      />
                    );
                  })}
                </ul>
              </section>
            ))}
          </div>

          {projectsData.items.length === 0 && (
            <p
              className={util.description}
              style={{ textAlign: "center", marginTop: "2rem" }}
            >
              {t("projects.comingSoon")}
            </p>
          )}
        </div>
      </main>
    </>
  );
}
