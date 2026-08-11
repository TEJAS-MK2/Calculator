import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { chromium } from 'playwright';

const port = 4173;
const server = spawn('python', ['-m', 'http.server', String(port), '--bind', '127.0.0.1'], { stdio: 'ignore' });
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

try {
  await sleep(1000);
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error));
  page.on('console', message => {
    if (message.type() !== 'error') return;
    if (/Failed to load resource/i.test(message.text())) return;
    errors.push(new Error(message.text()));
  });

  await page.goto(`http://127.0.0.1:${port}/index.html`, { waitUntil: 'networkidle' });
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });

  const display = page.locator('#displayPrimary');
  const sidebar = page.locator('#featureSidebar');
  const openControls = page.getByRole('button', { name: 'Open calculator controls' });
  const number = value => page.locator(`.calculator .btn-number[data-number="${value}"]`);
  const operator = value => page.locator(`.calculator .btn-operator[data-action="${value}"]`);
  const openSidebar = async () => { if (await sidebar.getAttribute('aria-hidden') !== 'false') await openControls.click(); };
  const closeSidebar = async () => { if (await sidebar.getAttribute('aria-hidden') === 'false') await page.getByRole('button', { name: 'Close controls', exact: true }).click(); await sidebar.waitFor({ state: 'attached' }); await page.waitForFunction(() => document.getElementById('featureSidebar')?.getAttribute('aria-hidden') === 'true'); };

  await number('2').click(); await operator('add').click(); await number('3').click(); await page.locator('.calculator .btn-equals').click();
  if ((await display.textContent()) !== '5') throw new Error('Basic calculator flow failed: expected 5.');

  await openSidebar();
  await page.getByRole('button', { name: 'History', exact: true }).click();
  if (await page.locator('#historyPanel').getAttribute('aria-hidden') !== 'false') throw new Error('History did not open.');
  if (!(await page.locator('.history-item').count())) throw new Error('Calculation history was not recorded.');

  await openSidebar();
  await page.getByRole('button', { name: 'About', exact: true }).click();
  if (!(await page.locator('#aboutPanel').isVisible())) throw new Error('About panel did not open.');
  await closeSidebar();

  await number('8').click(); await number('9').click(); await page.getByRole('button', { name: 'Backspace', exact: true }).click();
  if ((await display.textContent()) !== '8') throw new Error('Backspace failed.');
  await page.getByRole('button', { name: '.', exact: true }).click(); await number('2').click();
  if ((await display.textContent()) !== '8.2') throw new Error('Decimal input failed.');

  await openSidebar(); await page.getByRole('button', { name: 'Clear', exact: true }).click();
  await page.waitForFunction(() => document.getElementById('featureSidebar')?.getAttribute('aria-hidden') === 'true');
  if ((await display.textContent()) !== '0') throw new Error('Sidebar clear failed.');

  // Scientific engine: DEG + sin(30) must evaluate through the shared core engine.
  await openSidebar();
  await page.getByRole('button', { name: 'Scientific', exact: true }).click();
  if (!(await page.locator('#enginePanel').isVisible())) throw new Error('Scientific engine panel did not open.');
  await page.getByRole('button', { name: 'DEG', exact: true }).click();
  await page.getByRole('button', { name: 'sin(', exact: true }).click();
  // The calculator is intentionally modal while the feature sidebar is open.
  // Close it before using the main keypad; keyboard input remains valid as well.
  await closeSidebar();
  await page.keyboard.type('30)');
  await page.locator('.calculator .btn-equals').click();
  const scientificResult = Number(await display.textContent());
  if (Math.abs(scientificResult - 0.5) > 1e-10) throw new Error(`Scientific DEG calculation failed: ${scientificResult}`);

  // Statistics panel.
  await openSidebar(); await page.getByRole('button', { name: 'Statistics', exact: true }).click();
  await page.locator('#statsInput').fill('1,2,3,4,5');
  await page.getByRole('button', { name: 'Mean', exact: true }).click();
  if (!(await page.locator('#statsOutput').textContent()).includes('3')) throw new Error('Statistics mean failed.');

  // Matrix panel.
  await openSidebar(); await page.getByRole('button', { name: 'Matrix', exact: true }).click();
  await page.getByRole('button', { name: 'Determinant', exact: true }).click();
  if (!(await page.locator('#matrixOutput').textContent()).includes('-2')) throw new Error('Matrix determinant failed.');

  // Exact arithmetic panel.
  await openSidebar(); await page.getByRole('button', { name: 'Exact Arithmetic', exact: true }).click();
  await page.getByRole('button', { name: 'Evaluate current expression exactly', exact: true }).click();
  if (!(await page.locator('#exactOutput').textContent()).includes('1/2')) throw new Error('Exact arithmetic failed.');

  // Clear and keyboard interaction after engine use.
  await page.keyboard.press('Escape');
  await page.locator('.calculator .btn[data-action="clear-all"]').click();
  await page.keyboard.type('12'); await page.keyboard.press('+'); await page.keyboard.type('7'); await page.keyboard.press('Enter');
  if ((await display.textContent()) !== '19') throw new Error('Keyboard calculation failed: expected 19.');

  // Theme control must change the resolved theme.
  const beforeTheme = await page.locator('html').getAttribute('data-theme');
  await openSidebar(); await page.getByRole('button', { name: 'Theme', exact: true }).click();
  await page.waitForFunction(() => document.getElementById('featureSidebar')?.getAttribute('aria-hidden') === 'true');
  const afterTheme = await page.locator('html').getAttribute('data-theme');
  if (beforeTheme === afterTheme) throw new Error('Theme control did not change the theme.');

  // Animation sanity: Anime.js must be loaded and no stale transform transition may fight it.
  const animationState = await page.evaluate(() => ({ anime: typeof window.anime, sidebarTransition: getComputedStyle(document.getElementById('featureSidebar')).transitionProperty }));
  if (animationState.anime !== 'function') throw new Error('Anime.js is unavailable.');
  if (animationState.sidebarTransition.includes('transform')) throw new Error('Sidebar CSS transform transition still conflicts with Anime.js.');

  if (errors.length) throw new Error(`Browser console errors: ${errors.map(error => error.message).join(' | ')}`);
  await browser.close();
  console.log('Browser smoke tests passed.');
} finally {
  server.kill('SIGTERM');
  await Promise.race([once(server, 'exit'), sleep(1000)]);
}
