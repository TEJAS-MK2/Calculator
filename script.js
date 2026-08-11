(() => {
  const $ = id => document.getElementById(id);
  const readStorage = (key, fallback = null) => {
    try { return localStorage.getItem(key) ?? fallback; } catch { return fallback; }
  };
  const writeStorage = (key, value) => {
    try { localStorage.setItem(key, value); } catch {}
  };

  let theme = readStorage('calculatorTheme', 'dark');
  if (!['dark', 'light', 'system'].includes(theme)) theme = 'dark';

  const resolvedTheme = () => theme === 'system'
    ? (window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark')
    : theme;

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

  function toggleHistoryPanel() {
    const panel = $('historyPanel');
    if (!panel) return;
    const open = !panel.classList.contains('is-open');
    panel.classList.toggle('is-open', open);
    panel.setAttribute('aria-hidden', String(!open));
    if (open) window.dispatchEvent(new CustomEvent('calculator:history-open'));
  }

  function clearCalculator() {
    document.querySelector('[data-action="clear-all"]')?.click();
  }

  function setupSidebar() {
    const sidebar = $('featureSidebar');
    const openButton = $('sidebarOpen');
    const closeButton = $('sidebarClose');
    const backdrop = $('sidebarBackdrop');
    const list = sidebar?.querySelector('.feature-list');
    if (!sidebar || !openButton || !closeButton || !list) return;

    const setOpen = open => {
      sidebar.classList.toggle('is-open', open);
      backdrop?.classList.toggle('is-open', open);
      document.body.classList.toggle('sidebar-visible', open);
      sidebar.setAttribute('aria-hidden', String(!open));
      openButton.setAttribute('aria-expanded', String(open));
      openButton.setAttribute('aria-label', open ? 'Close calculator controls' : 'Open calculator controls');
    };

    const close = () => setOpen(false);

    const activate = feature => {
      list.querySelectorAll('.feature-item').forEach(item => item.classList.remove('active'));
      list.querySelector(`[data-feature="${feature}"]`)?.classList.add('active');

      if (feature === 'theme') {
        toggleTheme();
        return;
      }
      if (feature === 'clear') {
        clearCalculator();
        close();
        return;
      }
      if (feature === 'history') {
        toggleHistoryPanel();
        close();
      }
    };

    openButton.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
      setOpen(!sidebar.classList.contains('is-open'));
    });

    closeButton.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
      close();
    });

    backdrop?.addEventListener('click', close);

    list.addEventListener('click', event => {
      const item = event.target.closest('.feature-item');
      if (!item || !list.contains(item)) return;
      event.preventDefault();
      event.stopPropagation();
      activate(item.dataset.feature);
    });

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && sidebar.classList.contains('is-open')) {
        event.preventDefault();
        close();
      }
    });

    setOpen(false);
  }

  applyTheme();
  setupSidebar();
  window.matchMedia?.('(prefers-color-scheme: light)').addEventListener?.('change', () => {
    if (theme === 'system') applyTheme();
  });
})();
