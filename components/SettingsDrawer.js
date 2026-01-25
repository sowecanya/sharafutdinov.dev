import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ThemeChanger } from "./theme";
import { LanguageChanger } from "./LanguageChanger";
import styles from "./SettingsDrawer.module.css";
import { useTranslation } from "../lib/i18n";

export function SettingsDrawer({ open, onOpenChange }) {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();

  const transition = prefersReducedMotion
    ? { duration: 0.01 }
    : { type: "spring", damping: 25, stiffness: 300 };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                className={styles.overlay}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={
                  prefersReducedMotion ? { duration: 0.01 } : undefined
                }
              />
            </Dialog.Overlay>
            <Dialog.Content asChild>
              <motion.div
                className={styles.content}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={transition}
              >
                <Dialog.Title className={styles.srOnly}>
                  {t("nav.settings")}
                </Dialog.Title>
                <Dialog.Description className={styles.srOnly}>
                  {t("settings.description")}
                </Dialog.Description>

                <div className={styles.handle} aria-hidden="true" />

                <div className={styles.sectionsRow}>
                  <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>{t("settings.theme")}</h2>
                    <ThemeChanger idSuffix="-drawer" />
                  </div>

                  <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>
                      {t("settings.language")}
                    </h2>
                    <LanguageChanger idSuffix="-drawer" />
                  </div>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
