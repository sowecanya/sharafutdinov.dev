import styles from "../components/contact.module.css";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import util from "../styles/util.module.css";
import ContactContent from "./contactContent";
import * as Tooltip from "@radix-ui/react-tooltip";
import { useTranslation } from "../lib/i18n";
import { trackContactOpen } from "../lib/analytics";

export default function Contact({ svg, label, shortcut }) {
  const { t } = useTranslation();
  const timeRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(function () {
      timeRef.current++;
    }, 200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    function handleKeyPress(event) {
      if (event.key === shortcut && timeRef.current > 1) {
        document.getElementById("contactTrigger").click();
        timeRef.current = 0;
      }
    }
    document.addEventListener("keypress", handleKeyPress);
    return () => document.removeEventListener("keypress", handleKeyPress);
  }, [shortcut]);

  return (
    <Dialog.Root onOpenChange={(open) => open && trackContactOpen()}>
      <Dialog.Trigger asChild id="contactTrigger">
        <div className={styles.item}>
          <div className={styles.left}>
            <div className={util.icon}>
              <Image
                className={"iconInvert"}
                priority
                src={"/feather/" + svg + ".svg"}
                height={66}
                width={66}
                alt={label}
              />
            </div>

            <p className={styles.label}>{label}</p>
          </div>
          {shortcut ? (
            <Tooltip.Provider delayDuration={500}>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <div className={styles.shortcut}>
                    <span className={styles.shortcutText}>{shortcut}</span>
                  </div>
                </Tooltip.Trigger>

                <Tooltip.Content className={util.tooltip}>
                  <span style={{ marginRight: "4px" }}>
                    {t("tooltip.press")}
                  </span>
                  <div className={styles.shortcut}>
                    <span className={styles.shortcutText}>{shortcut}</span>
                  </div>
                  <Tooltip.Arrow className={styles.arrow} />
                </Tooltip.Content>
              </Tooltip.Root>
            </Tooltip.Provider>
          ) : null}
        </div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content
          className={styles.content}
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <Dialog.Title className={styles.title}>
            {t("contact.title")}
          </Dialog.Title>
          <ContactContent inModal="true" />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
