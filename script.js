(() => {
  const $ = id => document.getElementById(id);
  const readStorage = (key, fallback = null) => { try { return localStorage.getItem(key) ?? fallback; } catch { return fallback; } };
  const writeStorage = (key, value) => { try { localStorage.setItem(key, value); } catch {} };

  let theme = readStorage('calculatorTheme', 'dark');
  if (!['dark', 'light', 'system'].includes(theme)) theme = 'dark';
  const resolvedTheme = () => theme === 'system' ? (window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark') : theme;

  function applyTheme() {
    document.documentElement.dataset.theme = resolvedTheme();
    const button = $('themeToggle');
    if (!button) return;
    const icons = { dark: 'fa-moon', light: 'fa-sun', system: 'fa-circle-half-stroke' };
    button.innerHTML = `<i class="fas ${icons[theme]}" aria-hidden="true"></i>`;
    button.setAttribute('aria-label', `Theme: ${theme}. Click to change`);
    button.title = `Theme: ${theme}`;
  }

  function toggleTheme() {
    theme = { dark: 'light', light: 'system', system: 'dark' }[theme];
    writeStorage('calculatorTheme', theme);
    applyTheme();
  }

  function setupSidebar() {
    const sidebar = $('featureSidebar'), openButton = $('sidebarOpen'), closeButton = $('sidebarClose'), backdrop = $('sidebarBackdrop'), list = sidebar?.querySelector('.feature-list');
    if (!sidebar || !openButton || !closeButton || !list) return;
    const getPanel = feature => feature === 'history' ? $('historyPanel') : feature === 'scientific' ? $('phase2ScientificPanel') : null;
    const setOpen = open => { sidebar.classList.toggle('is-open', open); backdrop?.classList.toggle('is-open', open); sidebar.setAttribute('aria-hidden', String(!open)); openButton.setAttribute('aria-expanded', String(open)); };
    const close = () => setOpen(false);
    const hidePanels = () => {
      [$('historyPanel'), $('phase2ScientificPanel')].forEach(panel => { if (!panel) return; panel.classList.remove('sidebar-feature-visible', 'is-open'); panel.setAttribute('aria-hidden', 'true'); if (panel.id === 'phase2ScientificPanel') panel.hidden = true; });
      $('historyToggle')?.setAttribute('aria-expanded', 'false'); $('phase2ScientificToggle')?.setAttribute('aria-expanded', 'false');
      list.querySelectorAll('.feature-item').forEach(item => item.classList.remove('active'));
    };
    const activate = feature => {
      hidePanels(); list.querySelector(`[data-feature="${feature}"]`)?.classList.add('active');
      if (feature === 'theme') { toggleTheme(); close(); return; }
      if (feature === 'clear') { document.querySelector('[data-action="clear-all"]')?.click(); close(); return; }
      const panel = getPanel(feature);
      if (!panel) { close(); return; }
      panel.hidden = false; panel.classList.add('sidebar-feature-visible', 'is-open'); panel.setAttribute('aria-hidden', 'false');
      if (feature === 'history') $('historyToggle')?.setAttribute('aria-expanded', 'true');
      if (feature === 'scientific') $('phase2ScientificToggle')?.setAttribute('aria-expanded', 'true');
      close();
    };
    openButton.addEventListener('click', e => { e.preventDefault(); e.stopPropagation(); setOpen(true); });
    closeButton.addEventListener('click', e => { e.preventDefault(); e.stopPropagation(); close(); });
    backdrop?.addEventListener('click', close);
    list.addEventListener('click', e => { const item = e.target.closest('.feature-item'); if (!item || !list.contains(item)) return; e.preventDefault(); e.stopPropagation(); activate(item.dataset.feature); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && sidebar.classList.contains('is-open')) { e.preventDefault(); close(); } });
    hidePanels(); setOpen(false);
  }

  applyTheme(); setupSidebar();
  window.matchMedia?.('(prefers-color-scheme: light)').addEventListener?.('change', () => { if (theme === 'system') applyTheme(); });
})();
