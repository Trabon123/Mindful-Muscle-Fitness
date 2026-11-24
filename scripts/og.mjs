// Regenerates public/og.png from scripts/og.html.
// Usage: npm run build && npm run og   (needs Playwright + Chromium available)
import { createRequire } from 'node:module';
import { copyFileSync, rmSync } from 'node:fs';
import { spawn } from 'node:child_process';

// Use a local Playwright if installed, otherwise a global one (via NODE_PATH).
const { chromium } = await import('playwright').catch(() => createRequire(import.meta.url)('playwright'));

copyFileSync('scripts/og.html', 'public/__og.html');
copyFileSync('node_modules/@fontsource/anton/files/anton-latin-400-normal.woff2', 'public/fonts/__anton.woff2');
const server = spawn('npx', ['astro', 'dev', '--port', '4399'], { stdio: 'ignore' });
await new Promise((r) => setTimeout(r, 4000));
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.goto('http://localhost:4399/__og.html', { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: 'public/og.png' });
await browser.close();
server.kill();
rmSync('public/__og.html');
rmSync('public/fonts/__anton.woff2');
console.log('public/og.png written');
