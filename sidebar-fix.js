// Single compatibility controller for the legacy sidebar in script.js.
// It restores feature panels to the main calculator and replaces legacy sidebar
// controls so only this controller owns sidebar navigation.
(() => {
  const init = () => {
    let sidebar = document.getElementById('featureSidebar');
    const calculator = document.querySelector('.calculator');
    if (!sidebar || !calculator) return;

    const openButton = document.getElementById('sidebarOpen');
    const closeButton = document.getElementById('sidebarClose');
    const backdrop = document.getElementById('sidebarBackdrop');
    const list = sidebar.querySelector('.feature-list');
    if (!openButton || !closeButton || !list) return;

    // Capture panels after Calculator.bindSidebar() has run, then restore them.
    const featureNodes = {
      history: [
        calculator.querySelector('.calculator-tools'),
        document.getElementById('historyPanel')
      ],
      memory: [calculator.querySelector('.memory-panel')],
      scientific: [document.getElementById('scientificPanel')],
      graph: [document.getElementById('graphPanel')],
      statistics: [document.getElementById('statisticsPanel')]
    };
    const allPanels = [...new Set(Object.values(featureNodes).flat().filter(Boolean))];
    const grid = calculator.querySelector('.button-grid');
    allPanels.forEach(panel => {
      if (panel.parentElement !== calculator) calculator.insertBefore(panel, grid);
    });

    // Cloning removes the listeners installed by the old Calculator.bindSidebar().
    const replace = node => node?.parentNode?.replaceChild(node.cloneNode(true), node);
    replace(openButton);
    replace(closeButton);
    if (backdrop) replace(backdrop);
    replace(sidebar);

    sidebar = document.getElementById('featureSidebar');
    const open = document.getElementById('sidebarOpen');
    const close = document.getElementById('sidebarClose');
    const shade = document.getElementById('sidebarBackdrop');
    const featureList = sidebar?.querySelector('.feature-list');
    if (!sidebar || !open || !close || !featureList) return;

    const style = document.getElementById('sidebar-main-layout-style') || document.createElement('style');
    style.id = 'sidebar-main-layout-style';
    style.textContent = `
      .calculator .sidebar-feature-visible { display:block!important; }
      .calculator .sidebar-feature-visible.calculator-tools { display:flex!important; }
      .calculator .sidebar-feature-visible.scientific-panel { display:grid!important; }
      .calculator .sidebar-feature-visible.graph-panel,
      .calculator .sidebar-feature-visible.statistics-panel,
      .calculator .sidebar-feature-visible.history-panel { display:block!important; }
      .feature-sidebar .feature-list { gap:8px; }
      .feature-sidebar .feature-item[data-feature="theme"] { margin-top:6px; }
    `;
    if (!style.parentNode) document.head.appendChild(style);

    const reducedMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const animate = (targets, options) => {
      if (typeof anime !== 'function' || reducedMotion()) return;
      anime.remove(targets);
      anime({ targets, ...options });
    };

    const setOpen = value => {
      sidebar.classList.toggle('is-open', value);
      shade?.classList.toggle('is-open', value);
      sidebar.setAttribute('aria-hidden', String(!value));
      open.setAttribute('aria-expanded', String(value));
    };

    const closeSidebar = () => {
      if (typeof anime === 'function' && !reducedMotion()) {
        anime.remove(sidebar);
        anime({
          targets: sidebar,
          translateX: ['0%', '-105%'],
          duration: 190,
          easing: 'easeInCubic',
          complete: () => sidebar.style.removeProperty('transform')
        });
      } else {
        sidebar.style.removeProperty('transform');
      }
      setOpen(false);
    };

    const openSidebar = () => {
      setOpen(true);
      if (typeof anime === 'function' && !reducedMotion()) {
        anime.remove(sidebar);
        sidebar.style.transform = 'translateX(-105%)';
        anime({
          targets: sidebar,
          translateX: ['-105%', '0%'],
          duration: 240,
          easing: 'easeOutCubic',
          complete: () => sidebar.style.removeProperty('transform')
        });
      }
    };

    const resetFeatures = () => {
      allPanels.forEach(panel => {
        panel.classList.remove('sidebar-feature-visible', 'is-open');
        panel.setAttribute('aria-hidden', 'true');
      });
      ['historyToggle', 'scientificToggle', 'graphToggle', 'statisticsToggle'].forEach(id => {
        document.getElementById(id)?.setAttribute('aria-expanded', 'false');
      });
      featureList.querySelectorAll('.feature-item').forEach(item => item.classList.remove('active'));
    };

    const activate = feature => {
      resetFeatures();
      featureList.querySelector(`[data-feature="${feature}"]`)?.classList.add('active');

      if (feature === 'theme') {
        document.getElementById('themeToggle')?.click();
        closeSidebar();
        return;
      }
      if (feature === 'basic') {
        closeSidebar();
        return;
      }

      const panels = (featureNodes[feature] || []).filter(Boolean);
      if (!panels.length) {
        closeSidebar();
        return;
      }

      panels.forEach(panel => {
        panel.classList.add('sidebar-feature-visible', 'is-open');
        panel.setAttribute('aria-hidden', 'false');
      });
      if (feature === 'history') {
        document.getElementById('historyToggle')?.setAttribute('aria-expanded', 'true');
      }
      if (feature === 'scientific') {
        document.getElementById('scientificToggle')?.setAttribute('aria-expanded', 'true');
      }
      closeSidebar();
      requestAnimationFrame(() => {
        if (feature === 'graph') window.dispatchEvent(new Event('resize'));
        animate(panels, {
          opacity: [0, 1],
          translateY: [8, 0],
          duration: 220,
          delay: typeof anime === 'function' ? anime.stagger(20) : 0,
          easing: 'easeOutCubic'
        });
      });
    };

    open.addEventListener('click', event => { event.preventDefault(); openSidebar(); });
    close.addEventListener('click', event => { event.preventDefault(); closeSidebar(); });
    shade?.addEventListener('click', closeSidebar);
    featureList.addEventListener('click', event => {
      const item = event.target.closest('.feature-item');
      if (!item || !featureList.contains(item)) return;
      event.preventDefault();
      event.stopPropagation();
      activate(item.dataset.feature);
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && sidebar.classList.contains('is-open')) {
        event.preventDefault();
        closeSidebar();
      }
    });

    resetFeatures();
    setOpen(false);
    sidebar.style.removeProperty('transform');
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
