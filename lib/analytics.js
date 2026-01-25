import { track } from "@vercel/analytics";

// Track navigation clicks
export function trackNavigation(page) {
  track("nav_click", { page });
}

// Track external link clicks
export function trackExternalLink(url, label) {
  track("external_link", { url, label });
}

// Track theme changes
export function trackThemeChange(theme) {
  track("theme_change", { theme });
}

// Track language changes
export function trackLanguageChange(locale) {
  track("language_change", { locale });
}

// Track contact modal open
export function trackContactOpen() {
  track("contact_open");
}

// Track social link clicks
export function trackSocialClick(platform) {
  track("social_click", { platform });
}

// Track project clicks
export function trackProjectClick(projectTitle) {
  track("project_click", { project: projectTitle });
}

// Track scroll depth
export function trackScrollDepth(page, depth) {
  track("scroll_depth", { page, depth });
}

// Track time on page
export function trackTimeOnPage(page, seconds) {
  track("time_on_page", { page, seconds });
}
