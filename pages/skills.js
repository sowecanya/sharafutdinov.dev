import Head from "next/head";
import React, { useEffect } from "react";
import util from "../styles/util.module.css";
import SkillCategory from "../components/tiles/skillCategory";
import profile from "../content/data/profile.json";
import skillsData from "../content/data/skills.json";
import { useTranslation } from "../lib/i18n";

export default function Skills() {
  const { t, localize } = useTranslation();

  useEffect(() => {
    let thisPage = document.querySelector("#skillsPage");
    let top = sessionStorage.getItem("skills-scroll");
    if (top !== null) {
      thisPage.scrollTop = top;
    }
    const handleScroll = () => {
      sessionStorage.setItem("skills-scroll", thisPage.scrollTop);
    };
    thisPage.addEventListener("scroll", handleScroll);
    return () => thisPage.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Head>
        <title>
          {profile.name} · {t("skills.title")}
        </title>
        <meta name="description" content={t("skills.description")} />
        <link rel="icon" href="/favicon.gif" />
        <meta property="og:image" content="/og/index.png" />
      </Head>

      <main id="skillsPage" className={util.page}>
        <div className={util.pageColumn}>
          <h1 className={util.header}>{t("skills.title")}</h1>
          <p className={util.description}>{t("skills.description")}</p>
          <div className={util.inset}>
            {skillsData.categories.map((category) => (
              <SkillCategory
                key={category.id}
                title={localize(category.title)}
                items={category.items}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
