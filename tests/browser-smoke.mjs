import { spawn } from 'node:child_process';
import { once } from 'node:events';
import process from 'node:process';
import { chromium } from 'playwright';

const port = 4173;
const server = spawn('python', ['-m', 'http.server', String(port), '--bind', '127.0.0.1'], {
  stdio: 'ignore',
});

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

try {
  await sleep(1000);
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error));
  page.on('console', message => {
    if (message.type() === 'error') errors.push(new Error(message.text()));
  });

  await page.goto(`http://127.0.0.1:${port}/index.html`, { waitUntil: 'networkidle' });

  const display = page.locator('#displayPrimary');
  await page.getByRole('button', { name: '2' }).click();
  await page.getByRole('button', { name: '+' }).click();
  await page.getByRole('button', { name: '3' }).click();
  await page.getByRole('button', { name: '=' }).click();
  if ((await display.textContent()) !== '5') throw new Error('Basic calculator flow failed: expected 5.');

  await page.getByRole('button', { name: 'Open calculator controls' }).click();
  if (await page.locator('#featureSidebar').getAttribute('aria-hidden') !== 'false') {
    throw new Error('Sidebar did not open.');
  }

  await page.getByRole('button', { name: 'History' }).click();
  if (await page.locator('#historyPanel').getAttribute('aria-hidden') !== 'false') {
    throw new Error('History did not open.');
  }
  if (!(await page.locator('.history-item').count())) throw new Error('Calculation history was not recorded.');

  const beforeTheme = await page.locator('html').getAttribute('data-theme');
  await page.getByRole('button', { name: 'Open calculator controls' }).click();
  await page.getByRole('button', { name: 'Theme' }).click();
  const afterTheme = await page.locator('html').getAttribute('data-theme');
  if (beforeTheme === afterTheme) throw new Error('Theme control did not change the theme.');

  if (errors.length) throw new Error(`Browser console errors: ${errors.map(error => error.message).join(' | ')}`);

  await browser.close();
  console.log('Browser smoke tests passed.');
} finally {
  server.kill('SIGTERM');
  await Promise.race([once(server, 'exit'), sleep(1000)]);
}
