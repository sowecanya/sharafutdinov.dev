import styles from "./projectTile.module.css";
import Image from "next/image";
import util from "../../styles/util.module.css";
import { trackProjectClick } from "../../lib/analytics";

export default function ProjectTile({
  image,
  title,
  content,
  type,
  date,
  stack,
  stackLabel,
  url,
  status,
  statusLabel,
}) {
  const Wrapper = url ? "a" : "div";
  const wrapperProps = url
    ? {
        href: url,
        target: "_blank",
        rel: "noopener noreferrer",
        onClick: () => trackProjectClick(title),
      }
    : {};

  return (
    <li className={styles.outer}>
      <span className={styles.dateLabel}>{date}</span>
      <Wrapper className={styles.container} {...wrapperProps}>
        {image && (
          <div className={styles.imageWrapper}>
            <Image
              className={styles.image}
              src={"/projects/" + image + ".png"}
              width={400}
              height={220}
              alt={title}
              style={{ objectFit: "cover", width: "100%", height: "auto" }}
            />
          </div>
        )}

        <div className={styles.content}>
          <div className={styles.row}>
            <h3 className={util.tileTitle}>{title}</h3>
            {url && <span className={styles.externalIcon}>↗</span>}
            {status && (
              <span className={styles.statusWrapper}>
                <span
                  className={`${styles.statusDot} ${
                    status === "active"
                      ? styles.statusActive
                      : status === "paused"
                        ? styles.statusPaused
                        : styles.statusCompleted
                  }`}
                />
                <span className={styles.statusLabel}>{statusLabel}</span>
              </span>
            )}
          </div>

          <p className={util.tileContent}>{content}</p>
          <p className={styles.type}>{type}</p>

          {stack && stack.length > 0 && (
            <div className={styles.stackSection}>
              <span className={styles.stackLabel}>{stackLabel}</span>
              <div className={styles.stackList}>
                {stack.map((tech) => (
                  <span key={tech} className={styles.stackChip}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </Wrapper>
    </li>
  );
}
