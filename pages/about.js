import Head from "next/head";
import React, { useEffect } from "react";
import util from "../styles/util.module.css";
import ContactContent from "../components/contactContent";
import ExpTile from "../components/tiles/expTile";
import profile from "../content/data/profile.json";
import experienceData from "../content/data/experience.json";
import { useTranslation } from "../lib/i18n";

export default function About() {
  const { t, localize } = useTranslation();
  const tabKeys = ["career", "aboutSite"];
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
            {activeTab === "aboutSite" && (
              <div className={util.read}>
                <p>{t("about.siteDescription")}</p>
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
