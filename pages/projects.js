import Head from "next/head";
import React, { useEffect } from "react";
import util from "../styles/util.module.css";
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

  return (
    <>
      <Head>
        <title>
          {localize(profile.name)} · {t("projects.title")}
        </title>
        <meta name="description" content={t("projects.description")} />
        <link rel="icon" href="/favicon.gif" />
        <meta property="og:image" content="/og/index.png" />
      </Head>

      <main id="projectsPage" className={util.page}>
        <div className={util.pageColumn}>
          <h1 className={util.header}>{t("projects.title")}</h1>
          <p className={util.description}>{t("projects.description")}</p>
          <ul className={util.list}>
            {projectsData.items.map((project) => (
              <ProjectTile
                key={project.id}
                image={project.image}
                title={localize(project.title)}
                content={localize(project.description)}
                type={localize(project.type)}
                date={project.date}
                url={project.url}
                internal={project.internal ? "true" : undefined}
              />
            ))}
          </ul>
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
