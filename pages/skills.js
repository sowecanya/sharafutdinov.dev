import React, { useEffect } from "react";
import util from "../styles/util.module.css";
import SkillCategory from "../components/tiles/skillCategory";
import profile from "../content/data/profile.json";
import skillsData from "../content/data/skills.json";
import { useTranslation } from "../lib/i18n";
import SEO from "../components/SEO";

export default function Skills() {
  const { t, localize, locale } = useTranslation();

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
      <SEO
        title={`${t("skills.title")} — ${localize(profile.name)}`}
        description={
          locale === "ru"
            ? "Технологии и инструменты: C#, Python, Revit API, Claude Code, Next.js."
            : "Technologies and tools: C#, Python, Revit API, Claude Code, Next.js."
        }
        url="/skills"
        locale={locale}
      />

      <main id="skillsPage" className={util.page}>
        <div className={util.pageColumn}>
          <h1 className={util.header}>{t("skills.title")}</h1>
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
