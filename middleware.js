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
  // Skip if user already has locale preference
  const localeCookie = request.cookies.get("locale");
  if (localeCookie) {
    return NextResponse.next();
  }

  // Get country from Vercel header
  const country = request.headers.get("x-vercel-ip-country") || "";
  const detectedLocale = ruCountries.includes(country) ? "ru" : "en";

  // Use rewrite to same URL to ensure headers are applied
  const response = NextResponse.rewrite(request.nextUrl);

  // Set cookie
  response.headers.set(
    "Set-Cookie",
    `locale=${detectedLocale}; Path=/; Max-Age=31536000; SameSite=Lax`,
  );

  // Add debug header to verify middleware runs
  response.headers.set("X-Detected-Country", country || "unknown");
  response.headers.set("X-Detected-Locale", detectedLocale);

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - api routes
     * - static files
     * - image optimization
     * - favicon
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
