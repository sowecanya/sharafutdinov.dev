const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");
const { spawn } = require("child_process");
const http = require("http");

const PORT = 3000;
const BASE_URL = `http://localhost:${PORT}`;
const OUTPUT_DIR = path.join(__dirname, "..", "public", "screenshots");

const PAGES = [
  { name: "home", path: "/" },
  { name: "about", path: "/about" },
  { name: "projects", path: "/projects" },
  { name: "skills", path: "/skills" },
  { name: "contact", path: "/contact" },
];

const VIEWPORTS = {
  desktop: { width: 1440, height: 900 },
  mobile: { width: 390, height: 844, isMobile: true, hasTouch: true },
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function checkServer() {
  return new Promise((resolve) => {
    const req = http.get(BASE_URL, (res) => {
      resolve(res.statusCode === 200);
    });
    req.on("error", () => resolve(false));
    req.setTimeout(2000, () => {
      req.destroy();
      resolve(false);
    });
  });
}

async function waitForServer(maxAttempts = 30) {
  for (let i = 0; i < maxAttempts; i++) {
    if (await checkServer()) return true;
    await sleep(1000);
    process.stdout.write(".");
  }
  return false;
}

async function setTheme(page, theme) {
  await page.evaluate((t) => {
    localStorage.setItem("theme", t);
  }, theme);
  await page.reload({ waitUntil: "networkidle0" });
  await sleep(300);
}

async function takeScreenshot(page, name) {
  const filepath = path.join(OUTPUT_DIR, `${name}.png`);
  await page.screenshot({ path: filepath, fullPage: false });
  console.log(`  ${name}.png`);
}

async function main() {
  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Check if server is already running
  let serverProcess = null;
  const serverRunning = await checkServer();

  if (!serverRunning) {
    console.log("Starting dev server...");
    serverProcess = spawn("npm", ["run", "dev"], {
      cwd: path.join(__dirname, ".."),
      shell: true,
      stdio: "pipe",
    });

    process.stdout.write("Waiting for server");
    const ready = await waitForServer();
    console.log("");

    if (!ready) {
      console.error("Failed to start server!");
      serverProcess.kill();
      process.exit(1);
    }
    console.log("Server ready!\n");
  } else {
    console.log("Server already running.\n");
  }

  console.log("Launching browser...");
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  try {
    console.log("Taking screenshots...\n");

    // Desktop screenshots (dark theme)
    console.log("Desktop (dark):");
    await page.setViewport(VIEWPORTS.desktop);
    await page.goto(BASE_URL, { waitUntil: "networkidle0" });
    await setTheme(page, "dark");

    for (const { name, path: pagePath } of PAGES) {
      await page.goto(`${BASE_URL}${pagePath}`, { waitUntil: "networkidle0" });
      await sleep(600);
      await takeScreenshot(page, `desktop-${name}`);
    }

    // Mobile screenshots (dark theme)
    console.log("\nMobile (dark):");
    await page.setViewport(VIEWPORTS.mobile);

    for (const { name, path: pagePath } of PAGES) {
      await page.goto(`${BASE_URL}${pagePath}`, { waitUntil: "networkidle0" });
      await sleep(600);
      await takeScreenshot(page, `mobile-${name}`);
    }

    // Theme comparison
    console.log("\nThemes:");
    await page.setViewport(VIEWPORTS.desktop);
    await page.goto(BASE_URL, { waitUntil: "networkidle0" });

    await setTheme(page, "dark");
    await sleep(300);
    await takeScreenshot(page, "dark-mode");

    await setTheme(page, "light");
    await sleep(300);
    await takeScreenshot(page, "light-mode");

    console.log("\nDone! 12 screenshots saved to public/screenshots/");
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  } finally {
    await browser.close();
    if (serverProcess) {
      console.log("Stopping server...");
      serverProcess.kill();
    }
  }
}

main();
