import Head from "next/head";
import Link from "next/link";
import React, { useEffect } from "react";
import util from "../styles/util.module.css";
import ContactContent from "../components/contactContent";
import ExpTile from "../components/tiles/expTile";
import Script from "next/script";
import profile from "../content/data/profile.json";
import experienceData from "../content/data/experience.json";

export default function About() {
  const tabs = ["Career", "About This Site"];
  const [activeTab, setActiveTab] = React.useState(tabs[0]);

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
        <title>{profile.name} · About</title>
        <meta name="description" content={profile.bio} />
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
      <main className={util.page} id="aboutPage">
        <div className={util.pageColumn}>
          <h1 className={util.header}>About</h1>
          <div className={util.inset}>
            <div className={util.read}>
              <p>{profile.bio}</p>
            </div>
            <div className={util.inset} style={{ marginBottom: "4rem" }}>
              <ContactContent />
            </div>
            <div className={util.read}>
              <h2 style={{ margin: "4rem 0rem 0.25rem 0rem" }}>
                More about me
              </h2>
            </div>
            <div className={util.tabBar} id="about-update">
              <div className={util.tabRow}>
                {tabs.map((tabName) => (
                  <button
                    key={tabName}
                    onClick={() => setActiveTab(tabName)}
                    className={util.tab}
                    role="tab"
                    aria-selected={tabName == activeTab ? true : null}
                  >
                    {tabName}
                  </button>
                ))}
              </div>
            </div>
            {activeTab == "Career" && (
              <div>
                {experienceData.items.map((item) => (
                  <ExpTile
                    key={item.id}
                    date={item.date}
                    title={`${item.role} @ ${item.company}`}
                    url={item.url}
                    content={item.description}
                  />
                ))}
              </div>
            )}
            {activeTab == "About This Site" && (
              <div className={util.read}>
                <p>
                  This site is built with{" "}
                  <a
                    href="https://nextjs.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={util.normalLink}
                  >
                    Next.js
                  </a>{" "}
                  and deployed on{" "}
                  <a
                    href="https://vercel.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={util.externalLink}
                  >
                    Vercel
                  </a>
                  . Content is managed through local JSON files.{" "}
                  <a
                    href="https://www.radix-ui.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={util.externalLink}
                  >
                    Radix UI
                  </a>{" "}
                  is used for front-end components.{" "}
                  <a
                    href="https://github.com/pacocoursey/next-themes"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={util.externalLink}
                  >
                    Next Themes
                  </a>{" "}
                  made light/dark-mode management easy.
                </p>
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
