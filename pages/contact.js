import Head from "next/head";
import React, { useEffect } from "react";
import util from "../styles/util.module.css";
import ContactContent from "../components/contactContent";
import profile from "../content/data/profile.json";
import { useTranslation } from "../lib/i18n";

export default function Contact() {
  const { t, localize } = useTranslation();

  useEffect(() => {
    let thisPage = document.querySelector("#contactPage");
    let top = sessionStorage.getItem("contact-scroll");
    if (top !== null) {
      thisPage.scrollTop = top;
    }
    const handleScroll = () => {
      sessionStorage.setItem("contact-scroll", thisPage.scrollTop);
    };
    thisPage.addEventListener("scroll", handleScroll);
    return () => thisPage.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Head>
        <title>
          {localize(profile.name)} · {t("contact.title")}
        </title>
        <meta name="description" content={t("contact.pageDescription")} />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta property="og:image" content="/og/index.png" />
      </Head>
      <main className={util.page} id="contactPage">
        <div className={util.pageColumn}>
          <h1 className={util.header}>{t("contact.title")}</h1>
          <p className={util.description}>{t("contact.pageSubtitle")}</p>
          <div className={util.inset}>
            <ContactContent />
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
