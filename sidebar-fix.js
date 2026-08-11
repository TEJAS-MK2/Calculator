(() => {
  const init = () => {
    const sidebar = document.getElementById('featureSidebar');
    const open = document.getElementById('sidebarOpen');
    const close = document.getElementById('sidebarClose');
    const backdrop = document.getElementById('sidebarBackdrop');
    const list = sidebar?.querySelector('.feature-list');
    const calculator = document.querySelector('.calculator');
    const buttonGrid = document.querySelector('.button-grid');
    if (!sidebar || !open || !close || !list || !calculator || !buttonGrid) return;

    const oldContent = sidebar.querySelector('.sidebar-feature-content');
    oldContent?.remove();

    // The feature panels belong to the main calculator. Never move them into the sidebar.
    const featureIds = ['historyToggle', 'clearHistory', 'historyPanel', 'scientificToggle', 'scientificPanel', 'graphToggle', 'graphPanel', 'statisticsToggle', 'statisticsPanel'];
    const memoryPanel = calculator.querySelector('.memory-panel');
    const featureNodes = {
      history: ['historyToggle', 'clearHistory', 'historyPanel'],
      memory: ['memory-panel'],
      scientific: ['scientificToggle', 'scientificPanel'],
      graph: ['graphToggle', 'graphPanel'],
      statistics: ['statisticsToggle', 'statisticsPanel']
    };

    // Restore anything previously moved by the legacy sidebar code.
    const restoreNode = node => {
      if (!node || node.parentElement !== sidebar) return;
      calculator.insertBefore(node, buttonGrid);
    };
    featureIds.forEach(id => restoreNode(document.getElementById(id)));
    restoreNode(memoryPanel);

    // Main-calculator feature layout.
    if (!document.getElementById('sidebar-main-layout-style')) {
      const style = document.createElement('style');
      style.id = 'sidebar-main-layout-style';
      style.textContent = `
        .calculator .sidebar-main-feature-hidden { display:none !important; }
        .calculator .sidebar-main-feature-visible { display:block !important; }
        .calculator .sidebar-main-feature-visible.history-panel { display:block !important; }
        .calculator .sidebar-main-feature-visible.scientific-panel { display:grid !important; }
        .calculator .sidebar-main-feature-visible.graph-panel,
        .calculator .sidebar-main-feature-visible.statistics-panel { display:block !important; }
      `;
      document.head.appendChild(style);
    }

    const canAnimate = () => typeof window.anime === 'function' && !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const allFeatureNodes = Object.values(featureNodes).flat().map(id => id === 'memory-panel' ? memoryPanel : document.getElementById(id)).filter(Boolean);

    const setPanelVisibility = (visibleFeature = 'basic') => {
      allFeatureNodes.forEach(node => {
        const active = visibleFeature !== 'basic' && featureNodes[visibleFeature]?.includes(node.id || (node.classList.contains('memory-panel') ? 'memory-panel' : ''));
        node.classList.toggle('sidebar-main-feature-visible', active);
        node.classList.toggle('sidebar-main-feature-hidden', !active);
        node.setAttribute('aria-hidden', String(!active));
      });
    };

    const resetFeatureControls = () => {
      ['historyToggle', 'scientificToggle', 'graphToggle', 'statisticsToggle'].forEach(id => {
        document.getElementById(id)?.setAttribute('aria-expanded', 'false');
      });
    };

    const closeSidebar = () => {
      if (canAnimate()) {
        anime.remove(sidebar);
        anime({ targets: sidebar, translateX: ['0%', '-105%'], duration: 280, easing: 'easeInCubic', complete: () => {
          sidebar.classList.remove('is-open');
          sidebar.style.removeProperty('transform');
        }});
      } else {
        sidebar.classList.remove('is-open');
      }
      backdrop?.classList.remove('is-open');
      sidebar.setAttribute('aria-hidden', 'true');
      open.setAttribute('aria-expanded', 'false');
    };

    const openSidebar = () => {
      if (canAnimate()) {
        anime.remove(sidebar);
        sidebar.classList.add('is-open');
        sidebar.style.transform = 'translateX(-105%)';
        anime({ targets: sidebar, translateX: ['-105%', '0%'], duration: 340, easing: 'easeOutCubic', complete: () => sidebar.style.removeProperty('transform') });
      } else sidebar.classList.add('is-open');
      backdrop?.classList.add('is-open');
      sidebar.setAttribute('aria-hidden', 'false');
      open.setAttribute('aria-expanded', 'true');
    };

    const showFeatureInMain = feature => {
      if (feature === 'theme') {
        document.getElementById('themeToggle')?.click();
        return;
      }
      if (feature === 'basic') {
        resetFeatureControls();
        setPanelVisibility('basic');
        closeSidebar();
        return;
      }
      if (!featureNodes[feature]) return;

      resetFeatureControls();
      setPanelVisibility(feature);
      sidebar.querySelectorAll('.feature-item').forEach(item => item.classList.toggle('active', item.dataset.feature === feature));
      closeSidebar();

      const nodes = featureNodes[feature].map(id => id === 'memory-panel' ? memoryPanel : document.getElementById(id)).filter(Boolean);
      if (feature === 'history') document.getElementById('historyToggle')?.setAttribute('aria-expanded', 'true');
      if (feature === 'scientific') document.getElementById('scientificToggle')?.setAttribute('aria-expanded', 'true');
      if (feature === 'graph') document.getElementById('graphToggle')?.setAttribute('aria-expanded', 'true');
      if (feature === 'statistics') document.getElementById('statisticsToggle')?.setAttribute('aria-expanded', 'true');

      if (canAnimate()) {
        anime.remove(nodes);
        anime({ targets: nodes, opacity: [0, 1], translateY: [12, 0], duration: 320, delay: anime.stagger(45), easing: 'easeOutCubic' });
      }
    };

    open.addEventListener('click', openSidebar);
    close.addEventListener('click', closeSidebar);
    backdrop?.addEventListener('click', closeSidebar);

    sidebar.querySelectorAll('.feature-item').forEach(item => {
      item.addEventListener('click', () => {
        if (canAnimate()) {
          anime.remove(item);
          anime({ targets: item, scale: [1, .97, 1], duration: 180, easing: 'easeOutCubic' });
        }
        showFeatureInMain(item.dataset.feature);
      });
    });

    document.addEventListener('keydown', event => {
      if (event.key !== 'Escape' || !sidebar.classList.contains('is-open')) return;
      closeSidebar();
    });

    // Start with the basic calculator visible in the main area.
    setPanelVisibility('basic');
    sidebar.classList.remove('is-open');
    sidebar.style.removeProperty('transform');
    sidebar.setAttribute('aria-hidden', 'true');
    open.setAttribute('aria-expanded', 'false');
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
