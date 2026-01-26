import styles from "./expTileProgression.module.css";
import expTileStyles from "./expTile.module.css";
import util from "../../styles/util.module.css";
import { useTranslation } from "../../lib/i18n";

function formatFullDate(dateStr, endDate, locale) {
  const months = {
    en: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    ru: [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь",
    ],
  };
  const start = new Date(dateStr);
  const startStr = `${months[locale][start.getMonth()]} ${start.getFullYear()}`;

  let endStr;
  if (endDate) {
    const end = new Date(endDate);
    endStr = `${months[locale][end.getMonth()]} ${end.getFullYear()}`;
  } else {
    endStr = locale === "ru" ? "настоящее время" : "Present";
  }

  return `${startStr} – ${endStr}`;
}

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
  const { localize, locale } = useTranslation();
  const company = localize(item.company);
  const totalDuration = calculateDuration(item.startDate, item.endDate, locale);
  const dateRange = formatFullDate(item.startDate, item.endDate, locale);

  return (
    <div className={expTileStyles.container}>
      {/* Date column - same as ExpTile */}
      <div>
        <p className={expTileStyles.date}>
          {dateRange} · {totalDuration}
        </p>
      </div>

      {/* Content column */}
      <div className={expTileStyles.stack}>
        <h3 className={util.tileTitle + " " + expTileStyles.inline}>
          {company}
        </h3>

        {/* Progression - clean list without timeline visuals */}
        <div className={styles.progression}>
          {item.progression.map((level, index) => {
            const levelDuration = calculateDuration(
              level.startDate,
              level.endDate,
              locale,
            );
            const levelStart = formatShortDate(level.startDate, locale);
            const levelEnd = formatShortDate(level.endDate, locale);

            return (
              <div key={index} className={styles.level}>
                <h4 className={styles.levelRole}>{localize(level.role)}</h4>
                <p className={styles.levelDate}>
                  {levelStart} – {levelEnd} · {levelDuration}
                </p>
                <p className={styles.responsibilities}>
                  {localize(level.responsibilities).join(". ")}.
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
