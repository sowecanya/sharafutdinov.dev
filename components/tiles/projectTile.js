import styles from ".//projectTile.module.css";
import Image from "next/image";
import util from "../../styles/util.module.css";

export default function ProjectTile({
  image,
  title,
  content,
  type,
  date = null,
  url,
}) {
  return (
    <div className={styles.outer}>
      <p className={styles.date}>
        {date &&
          new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
          })}
      </p>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.container}
      >
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
      </a>
    </div>
  );
}
