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

  // Skip if user already has locale preference
  const localeCookie = request.cookies.get("locale");
  if (localeCookie?.value) {
    return response;
  }

  // Get country from Vercel header
  const country = request.headers.get("x-vercel-ip-country") || "";
  const detectedLocale = ruCountries.includes(country) ? "ru" : "en";

  // Set cookie for future visits
  response.cookies.set("locale", detectedLocale, {
    maxAge: 60 * 60 * 24 * 365, // 1 year
    path: "/",
    sameSite: "lax",
  });

  return response;
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
};
