import styles from "../components/menu.module.css";
import { ThemeChanger } from "./theme";
import Link from "next/link";
import NavLink from "./navLink";
import Contact from "./contact";
import util from "../styles/util.module.css";
import Image from "next/image";

export default function Menu() {
  return (
    <div className={styles.container}>
      <div className={styles.upper}>
        <Link href="/" passHref>
          <a>
            <Image
              className={
                util.hiddenOnMobile + " " + util.pointer + " logoInvert"
              }
              src="/logo.png"
              alt="site logo"
              width={32}
              height={32}
            />
          </a>
        </Link>

        <nav className={styles.nav}>
          <NavLink svg="recents" href="/" label="Home" shortcut="1" />
          <NavLink svg="about" href="/about" label="About" shortcut="2" />
          <NavLink
            svg="projects"
            href="/projects"
            label="Projects"
            shortcut="3"
          />
          <p className={styles.divider}>Stay in touch</p>
          <Contact svg="chat" label="Contact" shortcut="/" />
        </nav>
      </div>
      <ThemeChanger />
    </div>
  );
}
