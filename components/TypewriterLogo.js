import { motion } from "framer-motion";
import styles from "./TypewriterLogo.module.css";
import util from "../styles/util.module.css";
import Link from "next/link";

const text = "Sharafutdinov Dinar";

const container = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.3,
    },
  },
};

const letter = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.05,
    },
  },
};

export default function TypewriterLogo({ showOnMobile = false }) {
  return (
    <Link href="/" passHref>
      <a
        className={`${styles.container} ${!showOnMobile ? util.hiddenOnMobile : ""}`}
      >
        <motion.span
          className={styles.text}
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {text.split("").map((char, index) => (
            <motion.span key={index} variants={letter}>
              {char}
            </motion.span>
          ))}
        </motion.span>
        <motion.span
          className={styles.cursor}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: text.length * 0.08 + 0.4 }}
        >
          |
        </motion.span>
      </a>
    </Link>
  );
}
