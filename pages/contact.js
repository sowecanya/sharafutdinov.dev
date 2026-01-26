import React, { useEffect } from "react";
import util from "../styles/util.module.css";
import ContactContent from "../components/contactContent";
import profile from "../content/data/profile.json";
import { useTranslation } from "../lib/i18n";
import SEO from "../components/SEO";

export default function Contact() {
  const { t, localize, locale } = useTranslation();

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
      <SEO
        title={`${t("contact.title")} — ${localize(profile.name)}`}
        description={
          locale === "ru"
            ? "Связаться со мной: email, Telegram, LinkedIn. Открыт к проектам и коллаборациям."
            : "Contact me: email, Telegram, LinkedIn. Open to projects and collaborations."
        }
        url="/contact"
        locale={locale}
      />
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
