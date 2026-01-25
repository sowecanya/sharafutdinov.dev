import Head from "next/head";
import React, { useEffect } from "react";
import util from "../styles/util.module.css";
import ContactContent from "../components/contactContent";
import ExpTile from "../components/tiles/expTile";
import profile from "../content/data/profile.json";
import experienceData from "../content/data/experience.json";
import educationData from "../content/data/education.json";
import storyData from "../content/data/story.json";
import { useTranslation } from "../lib/i18n";
import styles from "../styles/story.module.css";

// Format date range and calculate duration
function formatDateRange(startDate, endDate, locale) {
  const months = {
    en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    ru: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"]
  };
  
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();
  
  const startStr = `${months[locale][start.getMonth()]} ${start.getFullYear()}`;
  const endStr = endDate 
    ? `${months[locale][end.getMonth()]} ${end.getFullYear()}`
    : (locale === "ru" ? "настоящее время" : "Present");
  
  // Calculate duration
  let totalMonths = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  if (end.getDate() >= start.getDate()) totalMonths += 1;
  
  const years = Math.floor(totalMonths / 12);
  const remainingMonths = totalMonths % 12;
  
  let duration = "";
  if (locale === "ru") {
    if (years > 0) {
      const yearWord = years === 1 ? "год" : (years < 5 ? "года" : "лет");
      duration += `${years} ${yearWord}`;
    }
    if (remainingMonths > 0) {
      if (years > 0) duration += " ";
      const monthWord = remainingMonths === 1 ? "мес" : "мес";
      duration += `${remainingMonths} ${monthWord}`;
    }
  } else {
    if (years > 0) {
      duration += `${years} yr${years > 1 ? "s" : ""}`;
    }
    if (remainingMonths > 0) {
      if (years > 0) duration += " ";
      duration += `${remainingMonths} mo`;
    }
  }
  
  return `${startStr} – ${endStr} · ${duration}`;
}

export default function About() {
  const { t, localize, locale } = useTranslation();
  const tabKeys = ["career", "education", "story"];
  const [activeTab, setActiveTab] = React.useState(tabKeys[0]);

  useEffect(() => {
    let thisPage = document.querySelector("#aboutPage");
    let top = sessionStorage.getItem("about-scroll");
    if (top !== null) {
      thisPage.scrollTop = top;
    }
    const handleScroll = () => {
      sessionStorage.setItem("about-scroll", thisPage.scrollTop);
    };
    thisPage.addEventListener("scroll", handleScroll);
    return () => thisPage.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Head>
        <title>
          {localize(profile.name)} · {t("about.title")}
        </title>
        <meta name="description" content={localize(profile.bio)} />
        <link rel="icon" href="/favicon.gif" />
        <meta property="og:image" content="/og/index.png" />
      </Head>
      <main className={util.page} id="aboutPage">
        <div className={util.pageColumn}>
          <h1 className={util.header}>{t("about.title")}</h1>
          <div className={util.inset}>
            <div className={util.read}>
              <p>{localize(profile.bio)}</p>
            </div>
            <div className={util.inset} style={{ marginBottom: "4rem" }}>
              <ContactContent />
            </div>
            <div className={util.read}>
              <h2 style={{ margin: "4rem 0rem 0.25rem 0rem" }}>
                {t("about.moreAboutMe")}
              </h2>
            </div>
            <div className={util.tabBar} id="about-update">
              <div className={util.tabRow}>
                {tabKeys.map((tabKey) => (
                  <button
                    key={tabKey}
                    onClick={() => setActiveTab(tabKey)}
                    className={util.tab}
                    role="tab"
                    aria-selected={tabKey === activeTab ? true : null}
                  >
                    {t(`about.tabs.${tabKey}`)}
                  </button>
                ))}
              </div>
            </div>
            {activeTab === "career" && (
              <div>
                {experienceData.items.map((item) => (
                  <ExpTile
                    key={item.id}
                    date={formatDateRange(item.startDate, item.endDate, locale)}
                    title={`${localize(item.role)} @ ${localize(item.company)}`}
                    url={item.url}
                    content={localize(item.description)}
                  />
                ))}
              </div>
            )}
            {activeTab === "education" && (
              <div>
                <div style={{ marginBottom: "2rem" }}>
                  <h3
                    className={util.tileTitle}
                    style={{ marginBottom: "0.5rem" }}
                  >
                    {t("education.degree")}
                  </h3>
                  <ExpTile
                    date={educationData.degree.years}
                    title={localize(educationData.degree.institution)}
                    content={`${localize(educationData.degree.degree)} · ${t("education.gpa")}: ${educationData.degree.gpa}`}
                  />
                </div>
                <div>
                  <h3
                    className={util.tileTitle}
                    style={{ marginBottom: "0.5rem" }}
                  >
                    {t("education.certifications")}
                  </h3>
                  {educationData.certifications.map((cert) => (
                    <ExpTile
                      key={cert.id}
                      date={cert.year}
                      title={localize(cert.title)}
                      content={cert.issuer}
                    />
                  ))}
                </div>
              </div>
            )}
            {activeTab === "story" && (
              <div className={styles.storyContainer}>
                {storyData.blocks.map((block, index) => (
                  <section key={index} className={styles.block}>
                    <h3 className={styles.blockTitle}>
                      {localize(block.title)}
                    </h3>
                    <div className={styles.blockContent}>
                      {localize(block.content).split('\n\n').map((paragraph, pIndex) => (
                        <p key={pIndex}>{paragraph}</p>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            )}
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
