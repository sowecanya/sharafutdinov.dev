// pages/404.js
import util from "../styles/util.module.css";
import Link from "next/link";
import { useTranslation } from "../lib/i18n";
import SEO from "../components/SEO";

export default function Custom404() {
  const { t, locale } = useTranslation();

  return (
    <>
      <SEO
        title="404 — Page Not Found"
        description={t("notFound.message")}
        url="/404"
        locale={locale}
      />
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
