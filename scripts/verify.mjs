import { spawn } from 'node:child_process';
import { setTimeout as sleep } from 'node:timers/promises';
import { chromium } from 'playwright-core';

const EXTERNAL = process.env.BASE_URL;
const BASE = EXTERNAL ?? 'http://localhost:5199';
const root = new URL('..', import.meta.url).pathname;

let server;
try {
  await fetch(BASE, { signal: AbortSignal.timeout(700) });
} catch {
  if (EXTERNAL) throw new Error(`no server at ${BASE}`);
  server = spawn('npx', ['vite', '--port', '5199', '--strictPort'], {
    cwd: root,
    stdio: 'ignore',
    detached: true,
  });
  let up = false;
  for (let i = 0; i < 40; i += 1) {
    try {
      const response = await fetch(BASE, { signal: AbortSignal.timeout(500) });
      if (response.ok) {
        up = true;
        break;
      }
    } catch {
      /* server still starting */
    }
    await sleep(250);
  }
  if (!up) throw new Error('dev server did not start on port 5199');
}

const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH ?? '/usr/bin/chromium',
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
});

const results = [];
const check = (name, ok, detail = '') => {
  results.push({ name, ok, detail });
  console.log(`${ok ? '✓' : '✗'} ${name}${detail ? ` — ${detail}` : ''}`);
};

const errors = [];
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
page.on('console', (message) => {
  if (message.type() === 'error') errors.push(message.text());
});
page.on('pageerror', (error) => errors.push(String(error)));

await page.goto(BASE, { waitUntil: 'networkidle' });
await page.waitForTimeout(900);

check('234 graph nodes render', (await page.locator('svg .node').count()) === 234);
check('intro panel is visible', await page.locator('.intro-panel h1').isVisible());
check('no ghost era labels', (await page.locator('svg .ghost').count()) === 0);

const kant = page.locator('svg .node[data-id="kant"]');
await kant.click({ force: true });
await page.waitForTimeout(600);
check('clicking a node opens its page', (await page.locator('.panel h1').first().textContent())?.trim() === '康德');
const panelText = await page.locator('.panel').first().innerText();
check('relation sentence names both thinkers', panelText.includes('康德') && panelText.includes('莱布尼茨'));
check('relation reason is visible', panelText.includes('莱布尼茨预定和谐'));

await page.locator('.panel-scroll').evaluate((element) => (element.scrollTop = 360));
await page.locator('.relations .row', { hasText: '卢梭' }).click();
await page.waitForTimeout(350);
check('a relation opens the other thinker', (await page.locator('.panel h1').first().textContent())?.trim() === '卢梭');
check(
  'panel scroll resets on navigation',
  (await page.locator('.panel-scroll').evaluate((element) => element.scrollTop)) === 0,
);

await page.screenshot({ path: '/tmp/opencode/verify-detail.png' });

await page.evaluate(() => (location.hash = ''));
await page.waitForTimeout(300);
check('clearing the hash returns to the guide', await page.locator('.intro-panel h1').isVisible());

await page.keyboard.press('Control+k');
await page.waitForTimeout(200);
check('⌘K opens search', await page.locator('.dialog input').isVisible());
await page.locator('.dialog input').fill('王阳明');
await page.waitForTimeout(150);
await page.locator('.dialog input').press('Enter');
await page.locator('.dialog').waitFor({ state: 'detached' });
await page.waitForTimeout(300);
check('search opens the chosen thinker', (await page.locator('.panel h1').first().textContent())?.trim() === '王阳明');

const analysis = page.locator('.chip', { hasText: '分析' });
await analysis.click();
await page.locator('.chip.off').waitFor({ state: 'visible' });
const dimmed = await page.locator('svg .node[data-era="分析哲学"]').evaluateAll((nodes) =>
  nodes.every((node) => Number(node.getAttribute('opacity')) < 0.1),
);
check('era filter dims that era', dimmed);
check('era filter marks the chip off', (await page.locator('.chip.off').count()) === 1);
await page.locator('.era-filter .reset').click();
await page.waitForFunction(() => document.querySelectorAll('.chip.off').length === 0);
check('reset restores every era', (await page.locator('.chip.off').count()) === 0);
await page.locator('.legend .item', { hasText: '受影响' }).click();
await page.waitForFunction(() => document.querySelectorAll('.legend .item.off').length === 1);
check('relation-kind filter can hide influences', (await page.locator('.legend .item.off').count()) === 1);
await page.locator('.era-filter .reset').click();
await page.waitForFunction(() => document.querySelectorAll('.legend .item.off').length === 0);

const lightBg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
check('default theme is light (#fcfbf8)', lightBg === 'rgb(252, 251, 248)', lightBg);
await page.locator('[data-testid="theme-toggle"]').click();
await page.waitForTimeout(200);
const darkBg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
check('theme toggle switches to dark (#0c0c0e)', darkBg === 'rgb(12, 12, 14)', darkBg);
await page.screenshot({ path: '/tmp/opencode/verify-dark.png' });

await page.locator('.chip', { hasText: '分析' }).click();
await page.locator('.chip.off').waitFor({ state: 'visible' });
const activeId = await page.evaluate(() => location.hash.replace(/^#\/?/, ''));
const wangTransformBefore = await page
  .locator(`svg .node[data-id="${activeId}"]`)
  .getAttribute('transform');
await page.locator('[data-testid="lang-toggle"]').click();
await page.waitForTimeout(250);
check(
  'language toggle switches UI and graph to English',
  (await page.locator('.panel h1').first().textContent())?.trim() === 'Wang Yangming',
);
check(
  'era filter survives language switch',
  (await page.locator('.chip.off').count()) === 1,
);
const wangTransformAfter = await page
  .locator(`svg .node[data-id="${activeId}"]`)
  .getAttribute('transform');
check(
  'node position stays identical across language switch',
  wangTransformBefore !== null && wangTransformBefore === wangTransformAfter,
  `${wangTransformBefore} vs ${wangTransformAfter}`,
);
await page.screenshot({ path: '/tmp/opencode/verify-en-dark.png' });
await page.locator('[data-testid="lang-toggle"]').click();
await page.locator('[data-testid="theme-toggle"]').click();
await page.locator('.era-filter .reset').click();
await page.waitForTimeout(200);

await page.locator('.legend .item', { hasText: '受影响' }).click();
await page.locator('.era-filter [role="switch"]').click();
await page.waitForTimeout(150);
check('era master switch hides all 14 eras', (await page.locator('.chip.off').count()) === 14);
check(
  'era master switch preserves relation-kind filter',
  (await page.locator('.legend .item.off').count()) === 1,
);
await page.locator('.era-filter [role="switch"]').click();
await page.waitForTimeout(150);
check('era master switch restores all 14 eras', (await page.locator('.chip.off').count()) === 0);
await page.locator('.era-filter .reset').click();

await page.locator('button[aria-label="全屏图谱"]').click();
await page.waitForTimeout(250);
check('fullscreen hides masthead and panel', (await page.locator('.masthead').count()) === 0 && (await page.locator('.panel').count()) === 0);
await page.keyboard.press('Escape');
await page.waitForTimeout(250);
check('Escape exits fullscreen', (await page.locator('.masthead').count()) === 1);

await page.goto(`${BASE}/#/kant`, { waitUntil: 'networkidle' });
await page.waitForTimeout(300);
const kantText = await page.locator('.panel').first().innerText();
check(
  'Kant archive renders multiple selected works',
  kantText.includes('纯粹理性批判') && kantText.includes('实践理性批判'),
);
await page.goto(`${BASE}/#/socrates`, { waitUntil: 'networkidle' });
await page.waitForTimeout(300);
check(
  'Socrates archive renders no-works fallback',
  (await page.locator('.panel').first().innerText()).includes('无完整著作传世'),
);

await page.goto(BASE, { waitUntil: 'networkidle' });
await page.waitForTimeout(500);
await page.locator('.masthead button[aria-label="追溯世系"]').click();
await page.waitForTimeout(300);
check('trace panel opens', await page.locator('.trace-panel').isVisible());
await page.locator('.trace-panel input').fill('泰勒斯');
await page.waitForTimeout(200);
await page.locator('.picker .result', { hasText: '泰勒斯' }).click();
await page.waitForTimeout(300);
await page.locator('.trace-panel input').fill('康德');
await page.waitForTimeout(200);
await page.locator('.picker .result', { hasText: '康德' }).click();
await page.waitForTimeout(500);
check('a lineage path is found', (await page.locator('.path li').count()) > 0);
const pathText = await page.locator('.path').innerText();
check('lineage starts at Thales', pathText.includes('泰勒斯'));
check('lineage ends at Kant', pathText.includes('康德'));
await page.screenshot({ path: '/tmp/opencode/verify-trace.png' });

await page.goto(BASE, { waitUntil: 'networkidle' });
await page.waitForTimeout(400);
for (const label of ['预设前提', '批判', '综合', '受影响']) {
  await page.locator('.legend .item', { hasText: label }).click();
}
await page.locator('.masthead button[aria-label="追溯世系"]').click();
await page.locator('.trace-panel input').fill('泰勒斯');
await page.locator('.picker .result', { hasText: '泰勒斯' }).click();
await page.locator('.trace-panel input').fill('康德');
await page.locator('.picker .result', { hasText: '康德' }).click();
await page.waitForTimeout(300);
check('a filtered-out link shows an honest dead end', await page.locator('.dead-end').isVisible());

const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
mobile.on('console', (message) => {
  if (message.type() === 'error') errors.push(message.text());
});
mobile.on('pageerror', (error) => errors.push(String(error)));
await mobile.goto(BASE, { waitUntil: 'networkidle' });
await mobile.waitForTimeout(900);
check('mobile intro sheet is visible', await mobile.locator('.intro-panel h1').isVisible());
check(
  'mobile has no horizontal overflow',
  await mobile.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1),
);
await mobile.screenshot({ path: '/tmp/opencode/verify-mobile.png' });

await mobile.locator('.masthead button[aria-label="搜索思想家"]').click();
await mobile.waitForTimeout(200);
check('mobile search has a visible close control', await mobile.locator('.search-close').isVisible());
await mobile.locator('.dialog input').fill('老子');
await mobile.waitForTimeout(200);
await mobile.locator('.dialog input').press('Enter');
await mobile.waitForTimeout(500);
check('mobile detail sheet opens', (await mobile.locator('.panel h1').first().textContent())?.trim() === '老子');
await mobile.screenshot({ path: '/tmp/opencode/verify-mobile-detail.png' });

check('no browser console errors', errors.length === 0, errors.join(' | '));

await browser.close();
if (server) process.kill(-server.pid, 'SIGTERM');

const failed = results.filter((result) => !result.ok);
console.log(`\n${results.length - failed.length}/${results.length} checks passed`);
if (failed.length) {
  console.error(`Failed: ${failed.map((result) => result.name).join(', ')}`);
  process.exit(1);
}
