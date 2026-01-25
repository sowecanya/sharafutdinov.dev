import styles from "../components/menu.module.css";
import { ThemeChanger } from "./theme";
import { LanguageChanger } from "./LanguageChanger";
import NavLink from "./navLink";
import Contact from "./contact";
import TypewriterLogo from "./TypewriterLogo";
import { useTranslation } from "../lib/i18n";

export default function Menu() {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <div className={styles.upper}>
        <TypewriterLogo />

        <nav className={styles.nav}>
          <NavLink svg="recents" href="/" label={t("nav.home")} shortcut="1" />
          <NavLink
            svg="about"
            href="/about"
            label={t("nav.about")}
            shortcut="2"
          />
          <NavLink
            svg="projects"
            href="/projects"
            label={t("nav.projects")}
            shortcut="3"
          />
          <NavLink
            svg="skills"
            href="/skills"
            label={t("nav.skills")}
            shortcut="4"
          />
          <p className={styles.divider}>{t("nav.stayInTouch")}</p>
          <Contact svg="chat" label={t("nav.contact")} shortcut="/" />
        </nav>
      </div>
      <div>
        <ThemeChanger />
        <LanguageChanger />
      </div>
    </div>
  );
}
