(() => {
  const $ = id => document.getElementById(id);
  const readStorage = (key, fallback = null) => { try { return localStorage.getItem(key) ?? fallback; } catch { return fallback; } };
  const writeStorage = (key, value) => { try { localStorage.setItem(key, value); } catch {} };
  let theme = readStorage('calculatorTheme', 'dark');
  if (!['dark', 'light', 'system'].includes(theme)) theme = 'dark';
  const reduceMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const animate = (targets, options) => {
    if (reduceMotion() || typeof window.anime !== 'function') return;
    window.anime.remove(targets);
    window.anime({ targets, ...options });
  };
  const resolvedTheme = () => theme === 'system' ? (window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark') : theme;
  function applyTheme() {
    const resolved = resolvedTheme();
    document.documentElement.dataset.theme = resolved;
    $('themeColor')?.setAttribute('content', resolved === 'light' ? '#f4f4f4' : '#090b10');
  }
  function toggleTheme() { theme = { dark: 'light', light: 'system', system: 'dark' }[theme]; writeStorage('calculatorTheme', theme); applyTheme(); animate('.calculator', { opacity: [0.82, 1], scale: [0.985, 1], duration: 260, easing: 'easeOutQuad' }); }
  function toggleHistory() {
    const panel = $('historyPanel'); if (!panel) return;
    const open = !panel.classList.contains('is-open');
    panel.classList.toggle('is-open', open); panel.setAttribute('aria-hidden', String(!open));
    if (open) { window.renderCalculatorHistory?.(); animate(panel, { opacity: [0, 1], translateY: [-8, 0], duration: 240, easing: 'easeOutCubic' }); }
  }
  function clearCalculator() { window.clearCalculator?.(); animate(['.display-container', '.btn-function'], { scale: [0.97, 1], duration: 220, easing: 'easeOutQuad' }); }
  function setupSidebar() {
    const sidebar = $('featureSidebar'), openButton = $('sidebarOpen'), closeButton = $('sidebarClose'), backdrop = $('sidebarBackdrop'), list = sidebar?.querySelector('.feature-list');
    if (!sidebar || !openButton || !closeButton || !list) return;
    const setOpen = open => {
      sidebar.classList.toggle('is-open', open); backdrop?.classList.toggle('is-open', open); document.body.classList.toggle('sidebar-visible', open);
      sidebar.setAttribute('aria-hidden', String(!open)); openButton.setAttribute('aria-expanded', String(open));
      if (open) {
        animate(sidebar, { translateX: ['-105%', '0%'], duration: 280, easing: 'easeOutCubic' });
        animate(list.querySelectorAll('.feature-item'), { opacity: [0, 1], translateX: [-14, 0], delay: window.anime?.stagger(45), duration: 220, easing: 'easeOutCubic' });
      }
    };
    const close = () => { if (!sidebar.classList.contains('is-open')) return; animate(sidebar, { translateX: ['0%', '-105%'], duration: 190, easing: 'easeInCubic', complete: () => { sidebar.classList.remove('is-open'); backdrop?.classList.remove('is-open'); document.body.classList.remove('sidebar-visible'); sidebar.setAttribute('aria-hidden', 'true'); openButton.setAttribute('aria-expanded', 'false'); sidebar.style.removeProperty('transform'); } }); if (reduceMotion() || typeof window.anime !== 'function') { sidebar.classList.remove('is-open'); backdrop?.classList.remove('is-open'); document.body.classList.remove('sidebar-visible'); sidebar.setAttribute('aria-hidden', 'true'); openButton.setAttribute('aria-expanded', 'false'); } };
    const activate = feature => {
      list.querySelectorAll('.feature-item').forEach(item => item.classList.remove('active'));
      list.querySelector(`[data-feature="${feature}"]`)?.classList.add('active');
      if (feature === 'theme') { toggleTheme(); close(); return; }
      if (feature === 'clear') { clearCalculator(); close(); return; }
      if (feature === 'history') { toggleHistory(); close(); }
    };
    openButton.addEventListener('click', event => { event.preventDefault(); event.stopPropagation(); setOpen(true); });
    closeButton.addEventListener('click', event => { event.preventDefault(); event.stopPropagation(); close(); });
    backdrop?.addEventListener('click', close);
    list.addEventListener('click', event => { const item = event.target.closest('.feature-item'); if (!item || !list.contains(item)) return; event.preventDefault(); event.stopPropagation(); activate(item.dataset.feature); });
    document.addEventListener('keydown', event => { if (event.key === 'Escape' && sidebar.classList.contains('is-open')) { event.preventDefault(); close(); } });
    setOpen(false);
  }
  applyTheme(); setupSidebar();
  window.matchMedia?.('(prefers-color-scheme: light)').addEventListener?.('change', () => { if (theme === 'system') applyTheme(); });
  window.addEventListener('load', () => {
    animate('.calculator', { opacity: [0, 1], translateY: [14, 0], scale: [0.98, 1], duration: 420, easing: 'easeOutCubic' });
    animate('.btn', { opacity: [0, 1], translateY: [8, 0], delay: window.anime?.stagger(28, { start: 80 }), duration: 260, easing: 'easeOutCubic' });
    animate('.sidebar-open', { opacity: [0, 1], scale: [0.7, 1], duration: 300, easing: 'easeOutBack' });
  }, { once: true });
})();
