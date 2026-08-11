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
      sidebar.setAttribute('aria-hidden', String(!open));
      openButton.setAttribute('aria-expanded', String(open));
    };

    const close = () => setOpen(false);

    const activate = feature => {
      list.querySelectorAll('.feature-item').forEach(item => item.classList.remove('active'));
      list.querySelector(`[data-feature="${feature}"]`)?.classList.add('active');

      if (feature === 'theme') {
        toggleTheme();
        close();
        return;
      }

      if (feature === 'clear') {
        document.querySelector('[data-action="clear-all"]')?.click();
        close();
        return;
      }

      if (feature === 'history') {
        $('historyToggle')?.click();
        close();
      }
    };

    openButton.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
      setOpen(true);
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

  $('themeToggle')?.addEventListener('click', toggleTheme);
  applyTheme();
  setupSidebar();
  window.matchMedia?.('(prefers-color-scheme: light)').addEventListener?.('change', () => {
    if (theme === 'system') applyTheme();
  });
})();
