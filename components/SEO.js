import Head from "next/head";

const SITE_URL = "https://sharafutdinov.online";

export default function SEO({
  title,
  description,
  url = "/",
  image = "/og/index.png",
  type = "website",
  locale = "ru",
}) {
  const fullUrl = `${SITE_URL}${url}`;
  const fullImage = image.startsWith("http") ? image : `${SITE_URL}${image}`;
  const ogLocale = locale === "ru" ? "ru_RU" : "en_US";
  const altLocale = locale === "ru" ? "en_US" : "ru_RU";

  return (
    <Head>
      {/* Basic */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:locale" content={ogLocale} />
      <meta property="og:locale:alternate" content={altLocale} />
      <meta property="og:site_name" content="Dinar Sharafutdinov" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />

      {/* Additional */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Dinar Sharafutdinov" />
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    </Head>
  );
}

// JSON-LD schemas for structured data
export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Dinar Sharafutdinov",
  alternateName: "Динар Шарафутдинов",
  url: SITE_URL,
  image: `${SITE_URL}/og/index.png`,
  jobTitle: "BIM Coordinator, AI Engineer, .NET Developer",
  worksFor: {
    "@type": "Organization",
    name: "R1",
  },
  sameAs: [
    "https://github.com/sowecanya",
    "https://t.me/sowecanya",
    "https://www.linkedin.com/in/sowecanya",
  ],
  knowsAbout: ["BIM", "Revit API", "C#", ".NET", "Python", "AI", "Claude Code"],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Dinar Sharafutdinov Portfolio",
  url: SITE_URL,
  description: "Personal portfolio – BIM, Development, AI",
  author: {
    "@type": "Person",
    name: "Dinar Sharafutdinov",
  },
};
