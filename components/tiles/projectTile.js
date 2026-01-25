import styles from ".//projectTile.module.css";
import Image from "next/image";
import util from "../../styles/util.module.css";
import { trackProjectClick } from "../../lib/analytics";

export default function ProjectTile({ image, title, content, type, url }) {
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

        <div className={styles.stack}>
          <div className={styles.row}>
            <h3 className={util.tileTitle}>{title}</h3>
            {url && <span className={styles.externalIcon}>↗</span>}
          </div>

          <p className={util.tileContent}>{content}</p>
          <p className={styles.type}>{type}</p>
        </div>
      </Wrapper>
    </li>
  );
}
