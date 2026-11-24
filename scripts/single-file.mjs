// Builds a single, self-contained HTML file of the site for sharing
// (email it, AirDrop it, double-click to open; no server or hosting needed).
//
//   npm run single
//   → preview/mindful-muscle-fitness.html
//
// Everything is inlined: CSS, fonts, scripts (GSAP + Lenis bundled in), and
// images. Only the optional "Load map" button needs an internet connection.
import { build as viteBuild } from 'vite';
import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { extname, join } from 'node:path';

const DIST = 'dist';
const OUT_DIR = 'preview';
const OUT = join(OUT_DIR, 'mindful-muscle-fitness.html');

const mime = {
  '.woff2': 'font/woff2',
  '.avif': 'image/avif',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
};
const dataUri = (file) => `data:${mime[extname(file)]};base64,${readFileSync(file).toString('base64')}`;
const fromDist = (url) => join(DIST, url.replace(/^\//, ''));

// 1. Fresh site build
if (!process.argv.includes('--no-build')) execSync('npx astro build', { stdio: 'inherit' });
let html = readFileSync(join(DIST, 'index.html'), 'utf8');

// 2. Bundle the motion script with GSAP, ScrollTrigger, MorphSVG and Lenis inlined
const result = await viteBuild({
  configFile: false,
  logLevel: 'warn',
  build: {
    write: false,
    minify: true,
    target: 'es2020',
    lib: { entry: 'src/scripts/motion.ts', formats: ['es'], fileName: 'motion' },
    rollupOptions: { output: { inlineDynamicImports: true } },
  },
});
const motion = (Array.isArray(result) ? result : [result])
  .flatMap((r) => r.output)
  .find((c) => c.type === 'chunk').code;
if (/\bimport\(/.test(motion)) throw new Error('motion bundle still has dynamic imports');
html = html.replace(
  /<script type="module" src="\/_astro\/[^"]+\.js"><\/script>/,
  () => `<script type="module">${motion.replace(/<\/script/gi, '<\\/script')}</script>`,
);
if (/<script[^>]+src="\/_astro/.test(html)) throw new Error('an external script was left behind');

// 3. Images: keep one good variant per <picture> (WebP at full width) instead of every size
html = html.replace(/<picture([^>]*)>([\s\S]*?)<\/picture>/g, (_, attrs, inner) => {
  const webp = [...inner.matchAll(/(\/_astro\/[^\s"]+\.webp) (\d+)w/g)].sort((a, b) => b[2] - a[2])[0];
  const img = inner.match(/<img[^>]*>/)[0];
  const src = webp ? webp[1] : img.match(/src="([^"]+)"/)[1];
  return `<picture${attrs}>${img.replace(/\s(srcset|sizes)="[^"]*"/g, '').replace(/src="[^"]+"/, `src="${dataUri(fromDist(src))}"`)}</picture>`;
});

// 4. Fonts, blur-up placeholders and any other local asset referenced from CSS
html = html.replace(/url\((\/(?:fonts|_astro)\/[^)]+)\)/g, (_, u) => `url(${dataUri(fromDist(u))})`);

// 5. Head: drop font preloads (fonts are inline now), inline the favicon
html = html.replace(/<link rel="preload"[^>]*>/g, '');
html = html.replace(/<link rel="icon" href="\/favicon\.svg"[^>]*>/, `<link rel="icon" href="${dataUri(join(DIST, 'favicon.svg'))}">`);

// 6. Sanity check: nothing local left to fetch
const leftovers = html.match(/(?:src|href)="\/(?!\/)[^"#]+"|url\(\/[^)]+\)/g) ?? [];
if (leftovers.length) throw new Error(`unresolved local references:\n${leftovers.join('\n')}`);

if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR);
writeFileSync(OUT, html);
console.log(`\n✓ ${OUT}  (${(Buffer.byteLength(html) / 1024).toFixed(0)} KB)`);
