// pages/404.js
import Head from "next/head";
import util from "../styles/util.module.css";
import Link from "next/link";
import { useTranslation } from "../lib/i18n";

export default function Custom404() {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t("notFound.title")}</title>
        <meta name="description" content={t("notFound.message")} />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta property="og:image" content="/og/index.png" />
      </Head>
      <main className={util.page} id="recentsPage">
        <div className={util.center}>
          <h1 className={util.header} style={{ marginBottom: "0.25rem" }}>
            {t("notFound.title")}
          </h1>
          <p className={util.description}>{t("notFound.message")}</p>
          <Link href="/" passHref>
            <a>
              <button
                className={util.singleButton + " " + util.button}
                style={{ marginTop: "1.25rem" }}
              >
                <span className={util.buttonText}>
                  {t("notFound.backHome")}
                </span>
              </button>
            </a>
          </Link>
        </div>
      </main>
    </>
  );
}
