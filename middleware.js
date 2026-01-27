import { NextResponse } from "next/server";

// Countries that should default to Russian
const ruCountries = [
  "RU",
  "BY",
  "KZ",
  "UA",
  "KG",
  "UZ",
  "TJ",
  "AM",
  "AZ",
  "MD",
];

export function middleware(request) {
  const response = NextResponse.next();

  // Skip if user already has locale preference (Next.js 12 returns string directly)
  const localeCookie = request.cookies.get("locale");
  if (localeCookie) {
    return response;
  }

  // Get country from Vercel header
  const country = request.headers.get("x-vercel-ip-country") || "";
  const detectedLocale = ruCountries.includes(country) ? "ru" : "en";

  // Set cookie using Set-Cookie header (Next.js 12 compatible)
  response.headers.set(
    "Set-Cookie",
    `locale=${detectedLocale}; Path=/; Max-Age=31536000; SameSite=Lax`,
  );

  return response;
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
};
