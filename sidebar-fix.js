(() => {
  const init = () => {
    const oldSidebar = document.getElementById('featureSidebar');
    const oldOpen = document.getElementById('sidebarOpen');
    const oldClose = document.getElementById('sidebarClose');
    const oldBackdrop = document.getElementById('sidebarBackdrop');
    const calculator = document.querySelector('.calculator');
    const buttonGrid = calculator?.querySelector('.button-grid');
    if (!oldSidebar || !oldOpen || !oldClose || !calculator || !buttonGrid) return;

    // Remove the legacy sidebar listeners by replacing only the sidebar DOM.
    const replace = node => node?.parentNode?.replaceChild(node.cloneNode(true), node);
    replace(oldOpen); replace(oldClose); replace(oldBackdrop); replace(oldSidebar);

    const sidebar = document.getElementById('featureSidebar');
    const open = document.getElementById('sidebarOpen');
    const close = document.getElementById('sidebarClose');
    const backdrop = document.getElementById('sidebarBackdrop');
    const list = sidebar?.querySelector('.feature-list');
    if (!sidebar || !open || !close || !list) return;

    const memoryPanel = calculator.querySelector('.memory-panel');
    const featureNodes = {
      history: ['historyToggle', 'clearHistory', 'historyPanel'],
      memory: ['memory-panel'],
      scientific: ['scientificToggle', 'scientificPanel'],
      graph: ['graphToggle', 'graphPanel'],
      statistics: ['statisticsToggle', 'statisticsPanel']
    };
    const getNode = id => id === 'memory-panel' ? memoryPanel : document.getElementById(id);
    const allNodes = Object.values(featureNodes).flat().map(getNode).filter(Boolean);

    // Restore every feature to the main calculator. Nothing is owned by the sidebar.
    allNodes.forEach(node => {
      if (node.parentElement !== calculator) calculator.insertBefore(node, buttonGrid);
    });

    const style = document.getElementById('sidebar-main-layout-style') || document.createElement('style');
    style.id = 'sidebar-main-layout-style';
    style.textContent = `
      .calculator .sidebar-main-feature-hidden{display:none!important}
      .calculator .sidebar-main-feature-visible{display:block!important}
      .calculator .sidebar-main-feature-visible.scientific-panel{display:grid!important}
      .calculator .sidebar-main-feature-visible.graph-panel,.calculator .sidebar-main-feature-visible.statistics-panel{display:block!important}
      .calculator .sidebar-main-feature-visible.memory-panel{display:block!important}
      .calculator .sidebar-main-feature-visible.calculator-tools{display:flex!important}
      .feature-sidebar .feature-item{background:var(--surface);color:var(--text-primary);border-color:var(--border);box-shadow:none}
      .feature-sidebar .feature-item:hover,.feature-sidebar .feature-item.active{background:var(--surface-2);border-color:var(--border-strong);color:var(--text-primary)}
      .feature-sidebar .feature-item i{color:var(--text-secondary)}
      .feature-sidebar .sidebar-open,.feature-sidebar .sidebar-close{background:var(--surface);color:var(--text-primary);border-color:var(--border-strong)}
      .feature-sidebar .sidebar-open:hover,.feature-sidebar .sidebar-close:hover{background:var(--surface-2)}
    `;
    if (!style.parentNode) document.head.appendChild(style);

    const canAnimate = () => typeof window.anime === 'function' && !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const resetFeatureState = () => {
      allNodes.forEach(node => {
        node.classList.remove('sidebar-main-feature-visible','sidebar-main-feature-hidden');
        node.classList.remove('is-open');
        node.setAttribute('aria-hidden','true');
      });
      ['historyToggle','scientificToggle','graphToggle','statisticsToggle'].forEach(id => {
        const control = document.getElementById(id);
        control?.setAttribute('aria-expanded','false');
        if (id === 'scientificToggle' && control) control.innerHTML='<i class="fas fa-flask"></i> Scientific Mode';
      });
    };
    const showNodes = feature => {
      resetFeatureState();
      const nodes = (featureNodes[feature] || []).map(getNode).filter(Boolean);
      nodes.forEach(node => {
        node.classList.remove('sidebar-main-feature-hidden');
        node.classList.add('sidebar-main-feature-visible');
        node.setAttribute('aria-hidden','false');
      });
      return nodes;
    };

    const closeSidebar = () => {
      if (canAnimate()) {
        anime.remove(sidebar);
        anime({targets:sidebar,translateX:['0%','-105%'],duration:240,easing:'easeInCubic',complete:()=>sidebar.style.removeProperty('transform')});
      }
      sidebar.classList.remove('is-open');
      sidebar.style.removeProperty('transform');
      backdrop?.classList.remove('is-open');
      sidebar.setAttribute('aria-hidden','true');
      open.setAttribute('aria-expanded','false');
    };
    const openSidebar = () => {
      sidebar.classList.add('is-open');
      backdrop?.classList.add('is-open');
      sidebar.setAttribute('aria-hidden','false');
      open.setAttribute('aria-expanded','true');
      if (canAnimate()) {
        anime.remove(sidebar);
        sidebar.style.transform='translateX(-105%)';
        anime({targets:sidebar,translateX:['-105%','0%'],duration:300,easing:'easeOutCubic',complete:()=>sidebar.style.removeProperty('transform')});
      }
    };

    const activateFeature = feature => {
      sidebar.querySelectorAll('.feature-item').forEach(item => item.classList.toggle('active', item.dataset.feature === feature));
      if (feature === 'theme') {
        document.getElementById('themeToggle')?.click();
        closeSidebar();
        return;
      }
      if (feature === 'basic') {
        resetFeatureState();
        closeSidebar();
        return;
      }
      if (!featureNodes[feature]) return;

      const nodes = showNodes(feature);
      // Trigger each module's own initialization logic after it becomes measurable.
      requestAnimationFrame(() => {
        const toggleId = {history:'historyToggle',scientific:'scientificToggle',graph:'graphToggle',statistics:'statisticsToggle'}[feature];
        const toggle = toggleId ? document.getElementById(toggleId) : null;
        if (toggle && !toggle.classList.contains('sidebar-activation-clicked')) {
          toggle.classList.add('sidebar-activation-clicked');
          toggle.click();
          toggle.classList.remove('sidebar-activation-clicked');
        }
        if (feature === 'memory') document.getElementById('memoryValue')?.closest('.memory-panel')?.classList.add('is-open');
        nodes.forEach(node => node.setAttribute('aria-hidden','false'));
        if (canAnimate()) {
          anime.remove(nodes);
          anime({targets:nodes,opacity:[0,1],translateY:[10,0],duration:280,delay:anime.stagger(25),easing:'easeOutCubic'});
        }
      });
      closeSidebar();
    };

    open.addEventListener('click',openSidebar);
    close.addEventListener('click',closeSidebar);
    backdrop?.addEventListener('click',closeSidebar);
    sidebar.querySelectorAll('.feature-item').forEach(item => item.addEventListener('click',()=>activateFeature(item.dataset.feature)));
    document.addEventListener('keydown',event=>{if(event.key==='Escape'&&sidebar.classList.contains('is-open'))closeSidebar();});

    // Keep feature controls and panels synchronized when the header theme changes.
    const syncTheme = () => {
      document.querySelectorAll('.feature-sidebar,.calculator,.graph-panel,.statistics-panel,.memory-panel,.history-panel,.scientific-panel').forEach(el=>el.style.removeProperty('color-scheme'));
      const theme = document.documentElement.dataset.theme || 'dark';
      document.documentElement.setAttribute('data-calculator-theme',theme);
    };
    document.getElementById('themeToggle')?.addEventListener('click',()=>requestAnimationFrame(syncTheme));
    syncTheme();

    resetFeatureState();
    sidebar.classList.remove('is-open');
    sidebar.style.removeProperty('transform');
    sidebar.setAttribute('aria-hidden','true');
    open.setAttribute('aria-expanded','false');
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
})();
