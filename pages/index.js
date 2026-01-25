import Head from "next/head";
import React, { useEffect } from "react";
import util from "../styles/util.module.css";
import Link from "next/link";
import styles from "../pages/index.module.css";
import Script from "next/script";
import profile from "../content/data/profile.json";

export default function Home() {
  const [userTime, setUserTime] = React.useState(null);

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

  useEffect(() => {
    const hour = new Date().getHours();
    var greeting =
      hour > 17
        ? "Good evening"
        : hour > 11
          ? "Good afternoon"
          : hour > 4
            ? "Good morning"
            : hour > 2
              ? "It's late, go to bed"
              : "Hello";
    setUserTime(greeting);
  }, []);

  return (
    <>
      <Head>
        <title>{profile.name} · Home</title>
        <meta name="description" content={profile.description} />
        <link rel="icon" href="/favicon.gif" type="image/gif" />
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
      <main className={util.page} id="recentsPage">
        <div className={styles.homeColumn}>
          <h1 className={styles.homeGreetingTitle}>
            {userTime ? userTime : profile.greeting}
          </h1>
          <span className={styles.tinyText}>
            My name is {profile.name.split(" ")[0]} — Welcome to my site.
          </span>

          <div className={util.read} style={{ marginTop: "2rem" }}>
            <p>{profile.bio}</p>
          </div>

          <div
            className={styles.homeSectionContainer}
            style={{ marginTop: "3rem" }}
          >
            <h2 className={styles.homeSectionTitle}>Quick Links</h2>
          </div>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link href="/about">
              <a className={styles.homeLinkButton}>About Me</a>
            </Link>
            <Link href="/projects">
              <a className={styles.homeLinkButton}>Projects</a>
            </Link>
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
