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

export default function About() {
  const { t, localize } = useTranslation();
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
          {profile.name} · {t("about.title")}
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
                    date={localize(item.date)}
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
                <section className={styles.section}>
                  <h3 className={styles.sectionTitle}>
                    {localize(storyData.background.title)}
                  </h3>
                  <p className={styles.sectionContent}>
                    {localize(storyData.background.content)}
                  </p>
                </section>

                <section className={styles.section}>
                  <h3 className={styles.sectionTitle}>
                    {localize(storyData.drives.title)}
                  </h3>
                  <ul className={styles.list}>
                    {localize(storyData.drives.items).map((item, index) => (
                      <li key={index} className={styles.listItem}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>

                <section className={styles.section}>
                  <h3 className={styles.sectionTitle}>
                    {localize(storyData.goals.title)}
                  </h3>
                  <div className={styles.goalsGrid}>
                    <div className={styles.goalColumn}>
                      <h4 className={styles.goalPeriod}>
                        {t("story.shortTerm")} (
                        {storyData.goals.shortTerm.period})
                      </h4>
                      <ul className={styles.goalList}>
                        {localize(storyData.goals.shortTerm.items).map(
                          (item, index) => (
                            <li key={index}>{item}</li>
                          ),
                        )}
                      </ul>
                    </div>
                    <div className={styles.goalColumn}>
                      <h4 className={styles.goalPeriod}>
                        {t("story.longTerm")}
                      </h4>
                      <ul className={styles.goalList}>
                        {localize(storyData.goals.longTerm.items).map(
                          (item, index) => (
                            <li key={index}>{item}</li>
                          ),
                        )}
                      </ul>
                    </div>
                  </div>
                </section>

                <div className={styles.highlight}>
                  {localize(storyData.uniquePositioning)}
                </div>

                <blockquote className={styles.quote}>
                  {localize(storyData.quote.text)}
                </blockquote>
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
