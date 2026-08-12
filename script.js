(() => {
  const $ = id => document.getElementById(id);
  const readStorage = (key, fallback = null) => { try { return localStorage.getItem(key) ?? fallback; } catch { return fallback; } };
  const writeStorage = (key, value) => { try { localStorage.setItem(key, value); } catch {} };
  let theme = readStorage('calculatorTheme', 'dark');
  if (!['dark', 'light', 'system'].includes(theme)) theme = 'dark';

  const reduceMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const animate = (targets, options) => {
    if (reduceMotion() || typeof window.anime !== 'function') return false;
    window.anime.remove(targets);
    window.anime({ targets, ...options });
    return true;
  };
  const resolvedTheme = () => theme === 'system'
    ? (window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark')
    : theme;

  function installThemeOverrides() {
    let style = $('calculatorThemeOverrides');
    if (!style) {
      style = document.createElement('style');
      style.id = 'calculatorThemeOverrides';
      document.head.appendChild(style);
    }
    style.textContent = `
      .calculator.has-feature .calculator-feature-panel { margin-top: 0; margin-bottom: 16px; max-height: min(52vh, 390px); overflow: auto; }
      .calculator-feature-panel { width: 100%; box-shadow: inset 0 1px 0 rgba(255,255,255,.04); }
      .calculator-feature-panel .engine-panel-head { position: sticky; top: -12px; z-index: 3; padding-bottom: 8px; background: inherit; }
      html[data-theme="dark"] .calculator-feature-panel, html[data-theme="dark"] .about-panel { color-scheme: dark; }
      html[data-theme="light"] .calculator-feature-panel, html[data-theme="light"] .about-panel { color-scheme: light; }
      html[data-theme="dark"] .calculator-feature-panel, html[data-theme="dark"] .about-panel { background: #242424; border-color: rgba(255,255,255,.14); color: #f5f5f5; }
      html[data-theme="light"] .calculator-feature-panel, html[data-theme="light"] .about-panel { background: #f7f7f7; border-color: rgba(0,0,0,.14); color: #111; }
      html[data-theme="dark"] .calculator-feature-panel .engine-status, html[data-theme="dark"] .calculator-feature-panel .engine-output, html[data-theme="dark"] .calculator-feature-panel textarea, html[data-theme="dark"] .calculator-feature-panel input, html[data-theme="dark"] .calculator-feature-panel .engine-chips button, html[data-theme="dark"] .calculator-feature-panel .engine-actions button, html[data-theme="dark"] .calculator-feature-panel .segmented button, html[data-theme="dark"] .calculator-feature-panel .engine-panel-head button { background: #202020; color: #f5f5f5; border-color: rgba(255,255,255,.14); }
      html[data-theme="light"] .calculator-feature-panel .engine-status, html[data-theme="light"] .calculator-feature-panel .engine-output, html[data-theme="light"] .calculator-feature-panel textarea, html[data-theme="light"] .calculator-feature-panel input, html[data-theme="light"] .calculator-feature-panel .engine-chips button, html[data-theme="light"] .calculator-feature-panel .engine-actions button, html[data-theme="light"] .calculator-feature-panel .segmented button, html[data-theme="light"] .calculator-feature-panel .engine-panel-head button { background: #fff; color: #111; border-color: rgba(0,0,0,.14); }
      html[data-theme="dark"] .calculator-feature-panel .segmented button.active, html[data-theme="dark"] .calculator-feature-panel .engine-primary, html[data-theme="dark"] .calculator-feature-panel .engine-chips button:hover, html[data-theme="dark"] .calculator-feature-panel .engine-actions button:hover { background: #f7f7f7; color: #111; }
      html[data-theme="light"] .calculator-feature-panel .segmented button.active, html[data-theme="light"] .calculator-feature-panel .engine-primary, html[data-theme="light"] .calculator-feature-panel .engine-chips button:hover, html[data-theme="light"] .calculator-feature-panel .engine-actions button:hover { background: #111; color: #fff; }
      html[data-theme="dark"] .calculator-feature-panel .engine-help, html[data-theme="dark"] .calculator-feature-panel .engine-about p { color: #b9b9b9; }
      html[data-theme="light"] .calculator-feature-panel .engine-help, html[data-theme="light"] .calculator-feature-panel .engine-about p { color: #555; }
      html[data-theme="dark"] .btn-equals { background: #000; color: #fff; border-color: #000; }
      html[data-theme="light"] .btn-equals { background: #111; color: #fff; border-color: #111; }
      html[data-theme="dark"] .sidebar-open, html[data-theme="dark"] .sidebar-close { background: #202020; color: #f5f5f5; }
      html[data-theme="light"] .sidebar-open, html[data-theme="light"] .sidebar-close { background: #fff; color: #111; }
    `;
  }

  function applyTheme() {
    const resolved = resolvedTheme();
    document.documentElement.dataset.theme = resolved;
    document.documentElement.dataset.themePreference = theme;
    $('themeColor')?.setAttribute('content', resolved === 'light' ? '#f4f4f4' : '#171717');
    installThemeOverrides();
  }

  function toggleTheme() {
    theme = { dark: 'light', light: 'system', system: 'dark' }[theme];
    writeStorage('calculatorTheme', theme);
    applyTheme();
    animate('.calculator', { opacity: [0.82, 1], scale: [0.985, 1], duration: 260, easing: 'easeOutQuad' });
  }

  function calculator() { return document.querySelector('.calculator'); }

  function mountFeaturePanel(panel) {
    const root = calculator();
    if (!panel || !root) return false;
    const keypad = root.querySelector('.button-grid');
    if (keypad) root.insertBefore(panel, keypad);
    else root.appendChild(panel);
    panel.classList.add('calculator-feature-panel');
    return true;
  }

  function setCalculatorFeatureMode(open) { calculator()?.classList.toggle('has-feature', open); }

  function closeSidebarAfterFeature() { closeSidebar(); }

  function resetFeaturePanels() {
    const engine = $('enginePanel');
    const about = $('aboutPanel');
    if (engine) engine.hidden = true;
    if (about) about.hidden = true;
    document.querySelectorAll('.feature-item').forEach(item => {
      item.classList.remove('active');
      if (item.dataset.feature === 'about') item.setAttribute('aria-expanded', 'false');
    });
    setCalculatorFeatureMode(false);
  }

  function toggleHistory() {
    const panel = $('historyPanel');
    if (!panel) return;
    const open = !panel.classList.contains('is-open');
    panel.classList.toggle('is-open', open);
    panel.setAttribute('aria-hidden', String(!open));
    if (open) {
      window.renderCalculatorHistory?.();
      animate(panel, { opacity: [0, 1], translateY: [-8, 0], duration: 240, easing: 'easeOutCubic' });
    }
  }

  function clearCalculator() {
    resetFeaturePanels();
    window.clearCalculator?.();
    animate(['.display-container', '.btn-function'], { scale: [0.97, 1], duration: 220, easing: 'easeOutQuad' });
  }

  function toggleAbout() {
    const panel = $('aboutPanel');
    const button = document.querySelector('.feature-item[data-feature="about"]');
    if (!panel || !button) return;
    const open = panel.hidden;
    resetFeaturePanels();
    if (!open) return;
    mountFeaturePanel(panel);
    panel.hidden = false;
    button.classList.add('active');
    button.setAttribute('aria-expanded', 'true');
    setCalculatorFeatureMode(true);
    closeSidebarAfterFeature();
    animate(panel, { opacity: [0, 1], translateY: [12, 0], scale: [0.985, 1], duration: 260, easing: 'easeOutCubic' });
  }

  function toggleEngine(feature = 'advanced') {
    const panel = $('enginePanel');
    if (!panel) return;
    mountFeaturePanel(panel);
    panel.hidden = false;
    const title = { advanced: 'Advanced Engine', scientific: 'Scientific', statistics: 'Statistics', matrix: 'Matrix', exact: 'Exact Arithmetic' }[feature] || 'Advanced Engine';
    const titleNode = $('engineTitle');
    if (titleNode) titleNode.textContent = title;
    panel.querySelectorAll('[data-engine-section]').forEach(section => {
      section.hidden = !(['advanced'].includes(feature)
        ? section.dataset.engineSection === 'advanced'
        : section.dataset.engineSection === feature || section.dataset.engineSection === 'advanced');
    });
    window.CalculatorCoreUI?.setExactMode(feature === 'exact');
    document.querySelectorAll('.feature-item').forEach(item => item.classList.toggle('active', item.dataset.feature === feature));
    setCalculatorFeatureMode(true);
    closeSidebarAfterFeature();
    animate(panel, { opacity: [0, 1], translateY: [12, 0], scale: [0.985, 1], duration: 260, easing: 'easeOutCubic' });
  }

  function closeEngine() { resetFeaturePanels(); }
  function closeAbout() { resetFeaturePanels(); }

  function closeSidebar() {
    const sidebar = $('featureSidebar');
    const backdrop = $('sidebarBackdrop');
    const openButton = $('sidebarOpen');
    if (!sidebar) return;

    sidebar.classList.remove('is-open');
    backdrop?.classList.remove('is-open');
    document.body.classList.remove('sidebar-visible');
    sidebar.setAttribute('aria-hidden', 'true');
    openButton?.setAttribute('aria-expanded', 'false');

    if (typeof window.anime === 'function') window.anime.remove(sidebar);
    if (!animate(sidebar, {
      translateX: ['0%', '-105%'],
      duration: 190,
      easing: 'easeInCubic',
      complete: () => sidebar.style.removeProperty('transform')
    })) sidebar.style.removeProperty('transform');
  }

  function setupSidebar() {
    const sidebar = $('featureSidebar');
    const openButton = $('sidebarOpen');
    const closeButton = $('sidebarClose');
    const backdrop = $('sidebarBackdrop');
    const list = sidebar?.querySelector('.feature-list');
    if (!sidebar || !openButton || !closeButton || !list) return;

    const setOpen = open => {
      if (typeof window.anime === 'function') window.anime.remove(sidebar);
      if (!open) {
        sidebar.classList.remove('is-open');
        backdrop?.classList.remove('is-open');
        document.body.classList.remove('sidebar-visible');
        sidebar.setAttribute('aria-hidden', 'true');
        openButton.setAttribute('aria-expanded', 'false');
        sidebar.style.removeProperty('transform');
        return;
      }

      sidebar.classList.add('is-open');
      backdrop?.classList.add('is-open');
      document.body.classList.add('sidebar-visible');
      sidebar.setAttribute('aria-hidden', 'false');
      openButton.setAttribute('aria-expanded', 'true');

      sidebar.style.transform = 'translateX(-105%)';
      if (!animate(sidebar, {
        translateX: ['-105%', '0%'],
        duration: 280,
        easing: 'easeOutCubic',
        complete: () => sidebar.style.removeProperty('transform')
      })) sidebar.style.removeProperty('transform');

      animate(list.querySelectorAll('.feature-item'), {
        opacity: [0, 1],
        translateX: [-14, 0],
        delay: window.anime?.stagger(35),
        duration: 220,
        easing: 'easeOutCubic'
      });
    };

    const activate = feature => {
      // Close the drawer before running feature code. This makes the logical
      // sidebar state deterministic even if a feature renderer throws or takes
      // time to initialize. The panel then opens independently inside the app.
      closeSidebar();
      if (['advanced', 'scientific', 'statistics', 'matrix', 'exact'].includes(feature)) { toggleEngine(feature); return; }
      if (feature !== 'about') list.querySelectorAll('.feature-item').forEach(item => item.classList.remove('active'));
      if (feature === 'theme') { toggleTheme(); return; }
      if (feature === 'clear') { clearCalculator(); return; }
      if (feature === 'history') { resetFeaturePanels(); toggleHistory(); return; }
      if (feature === 'about') toggleAbout();
    };

    openButton.addEventListener('click', event => { event.preventDefault(); event.stopPropagation(); setOpen(true); });
    closeButton.addEventListener('click', event => { event.preventDefault(); event.stopPropagation(); closeSidebar(); });
    $('engineClose')?.addEventListener('click', closeEngine);
    backdrop?.addEventListener('click', closeSidebar);
    list.addEventListener('click', event => {
      const item = event.target.closest('.feature-item');
      if (!item || !list.contains(item)) return;
      event.preventDefault();
      event.stopPropagation();
      activate(item.dataset.feature);
    });
    document.addEventListener('keydown', event => {
      if (event.key !== 'Escape') return;
      if (sidebar.getAttribute('aria-hidden') === 'false') { event.preventDefault(); closeSidebar(); return; }
      if (!$('enginePanel')?.hidden || !$('aboutPanel')?.hidden) { closeEngine(); return; }
      if ($('historyPanel')?.classList.contains('is-open')) toggleHistory();
    });
    setOpen(false);
  }

  applyTheme();
  setupSidebar();
  window.matchMedia?.('(prefers-color-scheme: light)').addEventListener?.('change', () => { if (theme === 'system') applyTheme(); });
  window.addEventListener('load', () => {
    animate('.calculator', { opacity: [0, 1], translateY: [14, 0], scale: [0.98, 1], duration: 420, easing: 'easeOutCubic' });
    animate('.btn', { opacity: [0, 1], translateY: [8, 0], delay: window.anime?.stagger(28, { start: 80 }), duration: 260, easing: 'easeOutCubic' });
    animate('.sidebar-open', { opacity: [0, 1], scale: [0.7, 1], duration: 300, easing: 'easeOutBack' });
  }, { once: true });
})();
