(() => {
  const init = () => {
    const oldSidebar = document.getElementById('featureSidebar');
    const oldOpen = document.getElementById('sidebarOpen');
    const oldClose = document.getElementById('sidebarClose');
    const oldBackdrop = document.getElementById('sidebarBackdrop');
    const calculator = document.querySelector('.calculator');
    const buttonGrid = calculator?.querySelector('.button-grid');
    if (!oldSidebar || !oldOpen || !oldClose || !calculator || !buttonGrid) return;

    // Replace the legacy sidebar DOM so the old script.js sidebar listeners cannot fire twice.
    const replace = node => node?.parentNode?.replaceChild(node.cloneNode(true), node);
    replace(oldOpen); replace(oldClose); replace(oldBackdrop); replace(oldSidebar);

    const sidebar = document.getElementById('featureSidebar');
    const open = document.getElementById('sidebarOpen');
    const close = document.getElementById('sidebarClose');
    const backdrop = document.getElementById('sidebarBackdrop');
    const list = sidebar?.querySelector('.feature-list');
    if (!sidebar || !open || !close || !list) return;

    const get = id => document.getElementById(id);
    const featureNodes = {
      history: [calculator.querySelector('.calculator-tools'), get('historyPanel')],
      memory: [calculator.querySelector('.memory-panel')],
      scientific: [get('scientificPanel')],
      graph: [get('graphPanel')],
      statistics: [get('statisticsPanel')]
    };

    // script.js temporarily moved these elements into the sidebar. Put every real
    // feature panel back into the calculator before wiring the navigation.
    const allNodes = Object.values(featureNodes).flat().filter(Boolean);
    allNodes.forEach(node => {
      if (node.parentElement !== calculator) calculator.insertBefore(node, buttonGrid);
    });

    const style = document.getElementById('sidebar-main-layout-style') || document.createElement('style');
    style.id = 'sidebar-main-layout-style';
    style.textContent = `
      .calculator .sidebar-feature-hidden{display:none!important}
      .calculator .sidebar-feature-visible{display:block!important}
      .calculator .sidebar-feature-visible.calculator-tools{display:grid!important}
      .calculator .sidebar-feature-visible.scientific-panel{display:grid!important}
      .calculator .sidebar-feature-visible.graph-panel,
      .calculator .sidebar-feature-visible.statistics-panel{display:block!important}
      .feature-sidebar{background:var(--bg-secondary);color:var(--text-primary);border-color:var(--border)}
      .feature-sidebar .feature-item{background:var(--surface);color:var(--text-primary);border-color:var(--border)}
      .feature-sidebar .feature-item:hover,.feature-sidebar .feature-item.active{background:var(--surface-2);border-color:var(--border-strong);color:var(--text-primary)}
      .feature-sidebar .feature-item i{color:var(--text-secondary)}
    `;
    if (!style.parentNode) document.head.appendChild(style);

    const canAnimate = () => typeof window.anime === 'function' && !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    const resetPanels = () => {
      allNodes.forEach(node => {
        node.classList.remove('sidebar-feature-visible','sidebar-feature-hidden','is-open');
        node.setAttribute('aria-hidden', 'true');
      });
      ['historyToggle','scientificToggle','graphToggle','statisticsToggle'].forEach(id => {
        get(id)?.setAttribute('aria-expanded', 'false');
      });
      const scientificToggle = get('scientificToggle');
      if (scientificToggle) scientificToggle.innerHTML = '<i class="fas fa-flask"></i> Scientific Mode';
    };

    const closeSidebar = () => {
      if (canAnimate()) {
        anime.remove(sidebar);
        anime({
          targets: sidebar,
          translateX: ['0%', '-105%'],
          duration: 240,
          easing: 'easeInCubic',
          complete: () => sidebar.style.removeProperty('transform')
        });
      }
      sidebar.classList.remove('is-open');
      backdrop?.classList.remove('is-open');
      sidebar.setAttribute('aria-hidden', 'true');
      open.setAttribute('aria-expanded', 'false');
    };

    const openSidebar = () => {
      sidebar.classList.add('is-open');
      backdrop?.classList.add('is-open');
      sidebar.setAttribute('aria-hidden', 'false');
      open.setAttribute('aria-expanded', 'true');
      if (canAnimate()) {
        anime.remove(sidebar);
        anime({
          targets: sidebar,
          translateX: ['-105%', '0%'],
          duration: 300,
          easing: 'easeOutCubic',
          complete: () => sidebar.style.removeProperty('transform')
        });
      }
    };

    const activateFeature = feature => {
      sidebar.querySelectorAll('.feature-item').forEach(item => {
        item.classList.toggle('active', item.dataset.feature === feature);
      });

      resetPanels();

      if (feature === 'theme') {
        get('themeToggle')?.click();
        closeSidebar();
        return;
      }

      if (feature === 'basic') {
        closeSidebar();
        return;
      }

      const nodes = (featureNodes[feature] || []).filter(Boolean);
      if (!nodes.length) return;

      nodes.forEach(node => {
        node.classList.remove('sidebar-feature-hidden');
        node.classList.add('sidebar-feature-visible');
        node.setAttribute('aria-hidden', 'false');
      });

      // Panels that use .is-open need it for their own module CSS.
      nodes.filter(node => /Panel$/.test(node.id)).forEach(node => node.classList.add('is-open'));
      if (feature === 'history') get('historyToggle')?.setAttribute('aria-expanded', 'true');

      closeSidebar();

      // Graph canvas sizing must happen after the panel has a real width.
      requestAnimationFrame(() => {
        if (feature === 'graph') {
          window.dispatchEvent(new Event('resize'));
          get('graphPlot')?.click();
        }
        if (canAnimate()) {
          anime.remove(nodes);
          anime({
            targets: nodes,
            opacity: [0, 1],
            translateY: [10, 0],
            duration: 280,
            delay: anime.stagger(25),
            easing: 'easeOutCubic'
          });
        }
      });
    };

    open.setAttribute('aria-expanded', 'false');
    close.addEventListener('click', closeSidebar);
    open.addEventListener('click', openSidebar);
    backdrop?.addEventListener('click', closeSidebar);
    sidebar.querySelectorAll('.feature-item').forEach(item => {
      item.addEventListener('click', () => activateFeature(item.dataset.feature));
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && sidebar.classList.contains('is-open')) closeSidebar();
    });

    // Keep sidebar and feature surfaces tied to the same theme variables.
    get('themeToggle')?.addEventListener('click', () => requestAnimationFrame(() => {
      sidebar.dataset.theme = document.documentElement.dataset.theme || 'dark';
    }));

    resetPanels();
    sidebar.classList.remove('is-open');
    sidebar.style.removeProperty('transform');
    sidebar.setAttribute('aria-hidden', 'true');
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
