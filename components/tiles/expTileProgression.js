import styles from "./expTileProgression.module.css";
import util from "../../styles/util.module.css";
import { useTranslation } from "../../lib/i18n";

function formatShortDate(dateStr, locale) {
  const months = {
    en: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    ru: [
      "Янв",
      "Фев",
      "Мар",
      "Апр",
      "Май",
      "Июн",
      "Июл",
      "Авг",
      "Сен",
      "Окт",
      "Ноя",
      "Дек",
    ],
  };
  const date = new Date(dateStr);
  return `${months[locale][date.getMonth()]} ${date.getFullYear()}`;
}

function calculateDuration(startDate, endDate, locale) {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();

  let totalMonths =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth());
  if (end.getDate() >= start.getDate()) totalMonths += 1;

  const years = Math.floor(totalMonths / 12);
  const remainingMonths = totalMonths % 12;

  let duration = "";
  if (locale === "ru") {
    if (years > 0) {
      const yearWord = years === 1 ? "год" : years < 5 ? "года" : "лет";
      duration += `${years} ${yearWord}`;
    }
    if (remainingMonths > 0) {
      if (years > 0) duration += " ";
      duration += `${remainingMonths} мес`;
    }
  } else {
    if (years > 0) {
      duration += `${years} yr${years > 1 ? "s" : ""}`;
    }
    if (remainingMonths > 0) {
      if (years > 0) duration += " ";
      duration += `${remainingMonths} mo`;
    }
  }
  return duration;
}

export default function ExpTileProgression({ item }) {
  const { localize, locale, t } = useTranslation();
  const company = localize(item.company);
  const totalDuration = calculateDuration(item.startDate, item.endDate, locale);
  const startStr = formatShortDate(item.startDate, locale);
  const endStr = item.endDate
    ? formatShortDate(item.endDate, locale)
    : locale === "ru"
      ? "настоящее время"
      : "Present";

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h3 className={util.tileTitle}>{company}</h3>
        <span className={styles.totalDate}>
          {startStr} – {endStr} · {totalDuration}
        </span>
      </div>

      {/* Progression Timeline */}
      <ol
        className={styles.timeline}
        aria-label={locale === "ru" ? "Карьерный рост" : "Career progression"}
      >
        <div className={styles.timelineLine} aria-hidden="true" />
        {item.progression.map((level, index) => {
          const levelDuration = calculateDuration(
            level.startDate,
            level.endDate,
            locale,
          );
          const levelStart = formatShortDate(level.startDate, locale);
          const levelEnd = formatShortDate(level.endDate, locale);

          return (
            <li key={index} className={styles.level}>
              <div className={styles.levelDot} aria-hidden="true" />
              <div className={styles.levelContent}>
                <h4 className={styles.levelRole}>{localize(level.role)}</h4>
                <span className={styles.levelDate}>
                  {levelStart} – {levelEnd} · {levelDuration}
                </span>
                <ul className={styles.responsibilities}>
                  {localize(level.responsibilities).map((resp, i) => (
                    <li key={i}>{resp}</li>
                  ))}
                </ul>
              </div>
            </li>
          );
        })}
      </ol>

      {/* Footer: Projects, Docs, Stack */}
      <div className={styles.footer}>
        {item.projects && (
          <div className={styles.footerRow}>
            <span className={styles.footerLabel}>
              {t("experience.projects")}:
            </span>
            <span className={styles.footerValue}>
              {localize(item.projects).join(", ")}
            </span>
          </div>
        )}
        {item.documentation && (
          <div className={styles.footerRow}>
            <span className={styles.footerLabel}>{t("experience.docs")}:</span>
            <span className={styles.footerValue}>
              {item.documentation.join(", ")}
            </span>
          </div>
        )}
        {item.stack && (
          <div className={styles.stackRow}>
            {item.stack.map((tech, i) => (
              <span key={i} className={styles.stackChip}>
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
