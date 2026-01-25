import styles from "./skillCategory.module.css";
import util from "../../styles/util.module.css";

export default function SkillCategory({ title, items }) {
  return (
    <div className={styles.container}>
      <h2 className={styles.categoryTitle}>{title}</h2>
      <div className={styles.itemsGrid}>
        {items.map((item, index) => (
          <div key={index} className={styles.skillItem}>
            <h3 className={styles.skillName}>{item.name}</h3>
            <div className={styles.tags}>
              {item.tags.map((tag, tagIndex) => (
                <span key={tagIndex} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
