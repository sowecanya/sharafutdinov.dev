import Head from "next/head";
import React, { useEffect } from "react";
import util from "../styles/util.module.css";
import ProjectTile from "../components/tiles/projectTile";
import Script from "next/script";
import profile from "../content/data/profile.json";
import projectsData from "../content/data/projects.json";

export default function Projects() {
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

  const description = "A collection of my projects and work.";

  return (
    <>
      <Head>
        <title>{profile.name} · Projects</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.gif" />
        <meta property="og:image" content="/og/index.png" />
      </Head>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-T2CWC86NTK"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-T2CWC86NTK');
        `}
      </Script>

      <main id="projectsPage" className={util.page}>
        <div className={util.pageColumn}>
          <h1 className={util.header}>Projects</h1>
          <p className={util.description}>{description}</p>
          <ul className={util.list}>
            {projectsData.items.map((project) => (
              <ProjectTile
                key={project.id}
                image={project.image}
                title={project.title}
                content={project.description}
                type={project.type}
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
              Projects coming soon...
            </p>
          )}
        </div>
      </main>
    </>
  );
}
