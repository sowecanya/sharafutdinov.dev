import sharp from 'sharp';
import pngToIco from 'png-to-ico';
import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');

// SVG content for favicon
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="6" fill="#171717"/>
  <text x="16" y="22" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="600" fill="#fafafa" text-anchor="middle">DS</text>
</svg>`;

async function generateFavicons() {
  const svgBuffer = Buffer.from(svgContent);

  // Generate PNG sizes
  const sizes = [16, 32, 180, 192, 512];

  for (const size of sizes) {
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(join(publicDir, `favicon-${size}.png`));
    console.log(`Generated favicon-${size}.png`);
  }

  // Copy 180px as apple-touch-icon
  await sharp(svgBuffer)
    .resize(180, 180)
    .png()
    .toFile(join(publicDir, 'apple-touch-icon.png'));
  console.log('Generated apple-touch-icon.png');

  // Generate ICO (contains 16x16 and 32x32)
  const png16 = await sharp(svgBuffer).resize(16, 16).png().toBuffer();
  const png32 = await sharp(svgBuffer).resize(32, 32).png().toBuffer();

  const ico = await pngToIco([png16, png32]);
  writeFileSync(join(publicDir, 'favicon.ico'), ico);
  console.log('Generated favicon.ico');

  console.log('\nAll favicons generated successfully!');
}

generateFavicons().catch(console.error);
