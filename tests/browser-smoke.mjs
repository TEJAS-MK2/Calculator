import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { chromium } from 'playwright';

const port = 4173;
const basePath = process.env.TEST_SITE_ROOT || process.cwd();
const server = spawn('python', ['-m', 'http.server', String(port), '--bind', '127.0.0.1', '--directory', basePath], { stdio: 'ignore' });
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const optionalCdn = url => url.startsWith('https://cdnjs.cloudflare.com/');

try {
  await sleep(1000);
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error));
  page.on('console', message => {
    if (message.type() !== 'error') return;
    const text = message.text();
    if (text === 'Failed to load resource: net::ERR_FAILED') return;
    errors.push(new Error(text));
  });
  page.on('requestfailed', request => {
    if (optionalCdn(request.url())) return;
    errors.push(new Error(`Request failed: ${request.url()} — ${request.failure()?.errorText || 'unknown error'}`));
  });
  page.on('response', response => {
    if (response.status() >= 400 && response.url().startsWith(`http://127.0.0.1:${port}/`) && !response.url().includes('favicon.ico')) {
      errors.push(new Error(`HTTP ${response.status()}: ${response.url()}`));
    }
  });

  await page.goto(`http://127.0.0.1:${port}/index.html`, { waitUntil: 'networkidle' });
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });

  const display = page.locator('#displayPrimary');
  const calculator = page.locator('.calculator');
  const sidebar = page.locator('#featureSidebar');
  const openControls = page.getByRole('button', { name: 'Open calculator controls' });
  const number = value => page.locator(`.calculator .btn-number[data-number="${value}"]`);
  const operator = value => page.locator(`.calculator .btn-operator[data-action="${value}"]`);
  const openSidebar = async () => { if (await sidebar.getAttribute('aria-hidden') !== 'false') await openControls.click(); };
  const waitForSidebarClosed = async () => page.waitForFunction(() => document.getElementById('featureSidebar')?.getAttribute('aria-hidden') === 'true');
  const waitForSidebarAnimationIdle = async () => page.waitForFunction(() => {
    const style = getComputedStyle(document.getElementById('featureSidebar'));
    const properties = style.transitionProperty.split(',').map(property => property.trim());
    const durations = style.transitionDuration.split(',').map(duration => parseFloat(duration) || 0);
    return !properties.some((property, index) => property === 'transform' && (durations[index] ?? durations[durations.length - 1] ?? 0) > 0);
  });
  const closeFeature = async () => { await page.keyboard.press('Escape'); await page.waitForFunction(() => !document.querySelector('.calculator')?.classList.contains('has-feature')); };

  await number('2').click(); await operator('add').click(); await number('3').click(); await page.locator('.calculator .btn-equals').click();
  if ((await display.textContent()) !== '5') throw new Error('Basic calculator flow failed: expected 5.');

  await openSidebar(); await page.getByRole('button', { name: 'History', exact: true }).click(); await waitForSidebarClosed();
  if (await page.locator('#historyPanel').getAttribute('aria-hidden') !== 'false') throw new Error('History did not open.');
  if (!(await page.locator('.history-item').count())) throw new Error('Calculation history was not recorded.');

  await openSidebar(); await page.getByRole('button', { name: 'About', exact: true }).click(); await waitForSidebarClosed();
  if (!(await page.locator('#aboutPanel').isVisible())) throw new Error('About panel did not open.');
  if (!(await calculator.evaluate(el => el.classList.contains('has-feature')))) throw new Error('About did not transform the calculator.');
  await closeFeature();

  await number('8').click(); await number('9').click(); await page.getByRole('button', { name: 'Backspace', exact: true }).click();
  if ((await display.textContent()) !== '8') throw new Error('Backspace failed.');
  await page.getByRole('button', { name: '.', exact: true }).click(); await number('2').click();
  if ((await display.textContent()) !== '8.2') throw new Error('Decimal input failed.');

  await openSidebar(); await page.getByRole('button', { name: 'Clear', exact: true }).click(); await waitForSidebarClosed();
  if ((await display.textContent()) !== '0') throw new Error('Sidebar clear failed.');

  await openSidebar(); await page.getByRole('button', { name: 'Scientific', exact: true }).click(); await waitForSidebarClosed();
  await page.getByRole('button', { name: 'DEG', exact: true }).click(); await page.getByRole('button', { name: 'sin(', exact: true }).click(); await page.keyboard.type('30)'); await page.locator('.calculator .btn-equals').click();
  if (Math.abs(Number(await display.textContent()) - 0.5) > 1e-10) throw new Error('Scientific DEG calculation failed.');
  await closeFeature();

  await openSidebar(); await page.getByRole('button', { name: 'Statistics', exact: true }).click(); await waitForSidebarClosed();
  await page.locator('#statsInput').fill('1,2,3,4,5'); await page.getByRole('button', { name: 'Mean', exact: true }).click();
  if (!(await page.locator('#statsOutput').textContent()).includes('3')) throw new Error('Statistics mean failed.'); await closeFeature();

  await openSidebar(); await page.getByRole('button', { name: 'Matrix', exact: true }).click(); await waitForSidebarClosed(); await page.getByRole('button', { name: 'Determinant', exact: true }).click();
  if (!(await page.locator('#matrixOutput').textContent()).includes('-2')) throw new Error('Matrix determinant failed.'); await closeFeature();

  await openSidebar(); await page.getByRole('button', { name: 'Exact Arithmetic', exact: true }).click(); await waitForSidebarClosed(); await page.getByRole('button', { name: 'Evaluate current expression exactly', exact: true }).click();
  if (!(await page.locator('#exactOutput').textContent()).includes('1/2')) throw new Error('Exact arithmetic failed.'); await closeFeature();

  await page.locator('.calculator .btn[data-action="clear-all"]').click(); await page.keyboard.type('12'); await page.keyboard.press('+'); await page.keyboard.type('7'); await page.keyboard.press('Enter');
  if ((await display.textContent()) !== '19') throw new Error('Keyboard calculation failed: expected 19.');

  const exactLarge = await page.evaluate(async () => (await import('./packages/calculator-core/exact.js')).evaluateExact('9007199254740993 + 1').toString());
  if (exactLarge !== '9007199254740994') throw new Error(`BigInt exact arithmetic failed: ${exactLarge}`);

  const beforeTheme = await page.locator('html').getAttribute('data-theme'); await openSidebar(); await page.getByRole('button', { name: 'Theme', exact: true }).click(); await waitForSidebarClosed();
  if (beforeTheme === await page.locator('html').getAttribute('data-theme')) throw new Error('Theme control did not change the theme.');
  await waitForSidebarAnimationIdle();
  const equalContrast = await page.locator('.btn-equals').evaluate(el => ({ background: getComputedStyle(el).backgroundColor, color: getComputedStyle(el).color }));
  if (equalContrast.background === equalContrast.color) throw new Error('Theme mismatch: equals button has no readable contrast.');

  const animationState = await page.evaluate(() => {
    const style = getComputedStyle(document.getElementById('featureSidebar'));
    return {
      anime: typeof window.anime,
      backend: window.__calculatorAnimationBackend || 'anime-js',
      sidebarTransition: style.transitionProperty,
      sidebarTransitionDuration: style.transitionDuration,
    };
  });
  if (animationState.anime !== 'function') throw new Error('Anime.js is unavailable.');
  // The local fallback intentionally uses CSS transitions when the Anime.js CDN
  // is unavailable. Only the real Anime.js backend must be checked for the
  // CSS transform-transition conflict.
  if (animationState.backend !== 'fallback') {
    const hasTransformTransition = animationState.sidebarTransition.split(',').some(property => property.trim() === 'transform');
    const hasActiveTransformTransition = hasTransformTransition && animationState.sidebarTransitionDuration.split(',').some(duration => parseFloat(duration) > 0);
    if (hasActiveTransformTransition) throw new Error('Sidebar CSS transform transition still conflicts with Anime.js.');
  }
  if (errors.length) throw new Error(`Browser errors: ${errors.map(error => error.message).join(' | ')}`);
  await browser.close();
  console.log('Browser smoke tests passed.');
} finally {
  server.kill('SIGTERM');
  await Promise.race([once(server, 'exit'), sleep(1000)]);
}
