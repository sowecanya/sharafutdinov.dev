import Head from "next/head";
import React, { useEffect } from "react";
import util from "../styles/util.module.css";
import Link from "next/link";
import styles from "../pages/index.module.css";
import profile from "../content/data/profile.json";
import { useTranslation } from "../lib/i18n";

export default function Home() {
  const { t, localize } = useTranslation();

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
          {profile.name} · {t("nav.home")}
        </title>
        <meta name="description" content={localize(profile.description)} />
        <link rel="icon" href="/favicon.gif" type="image/gif" />
        <meta property="og:image" content="/og/index.png" />
      </Head>
      <main className={util.page} id="recentsPage">
        <div className={styles.homeColumn}>
          <section className={styles.heroSection}>
            <h1 className={styles.heroName}>{profile.name}</h1>
            <p className={styles.heroRole}>{localize(profile.title)}</p>
            <p className={styles.heroValueProp}>{t("home.valueProp")}</p>
            <p className={styles.heroTags}>{t("home.tags")}</p>
            <div className={styles.heroCta}>
              <Link href="/projects">
                <a className={styles.ctaPrimary}>{t("home.viewProjects")}</a>
              </Link>
              <Link href="/about">
                <a className={styles.ctaSecondary}>{t("home.getInTouch")}</a>
              </Link>
            </div>
          </section>

          <div className={util.read} style={{ marginTop: "3rem" }}>
            <p>{localize(profile.bio)}</p>
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
