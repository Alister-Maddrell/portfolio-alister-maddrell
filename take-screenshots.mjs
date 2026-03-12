import { chromium } from 'playwright';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const thumbDir = join(__dirname, 'public', 'thumbnails');

const sites = [
  { name: 'hartley', url: 'https://demo-hartley-plumbing.vercel.app' },
  { name: 'cafe', url: 'https://demo-kin-grain-cafe.vercel.app' },
  { name: 'fitness', url: 'https://demo-apex-fitness.vercel.app' },
  { name: 'accounting', url: 'https://demo-whitfield-accounting.vercel.app' },
  { name: 'hair', url: 'https://demo-luma-hair-beauty.vercel.app' },
];

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });

  for (const site of sites) {
    console.log(`Capturing ${site.name}...`);
    const page = await context.newPage();
    await page.goto(site.url, { waitUntil: 'networkidle', timeout: 30000 });
    // Wait a bit for animations to settle
    await page.waitForTimeout(2000);
    // Dismiss any banners/popups by clicking away
    await page.mouse.click(10, 10).catch(() => {});
    await page.waitForTimeout(500);

    const pngPath = join(thumbDir, `${site.name}.png`);
    await page.screenshot({ path: pngPath, type: 'png' });
    console.log(`  -> ${pngPath}`);

    await page.close();
  }

  await browser.close();
  console.log('Done!');
})();
