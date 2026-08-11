// Minimal sidebar controller.
// The sidebar intentionally exposes only History, Clear, and Theme.
(() => {
  const init = () => {
    const sidebar = document.getElementById('featureSidebar');
    const list = sidebar?.querySelector('.feature-list');
    if (!sidebar || !list) return;

    // Replace the list after the calculator and advanced-feature modules have initialized.
    const freshList = list.cloneNode(false);
    const make = (label, icon, handler) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'feature-item';
      button.innerHTML = `<i class="fas ${icon}"></i><span>${label}</span>`;
      button.addEventListener('click', event => {
        event.preventDefault();
        event.stopPropagation();
        handler();
        document.getElementById('sidebarClose')?.click();
      });
      return button;
    };

    freshList.append(
      make('History', 'fa-clock-rotate-left', () => document.getElementById('historyToggle')?.click()),
      make('Clear', 'fa-eraser', () => document.querySelector('[data-action="clear-all"]')?.click()),
      make('Change Theme', 'fa-circle-half-stroke', () => document.getElementById('themeToggle')?.click())
    );
    list.replaceWith(freshList);

    // Remove every feature that is no longer part of the minimal calculator.
    [
      '#scientificToggle', '#scientificPanel', '.memory-panel',
      '#graphToggle', '#graphPanel', '#statisticsToggle', '#statisticsPanel',
      '#advancedFeaturesPanel'
    ].forEach(selector => document.querySelector(selector)?.remove());

    // Remove the old sidebar listeners by replacing its open/close controls.
    ['sidebarOpen', 'sidebarClose', 'sidebarBackdrop'].forEach(id => {
      const node = document.getElementById(id);
      if (node?.parentNode) node.replaceWith(node.cloneNode(true));
    });

    const openButton = document.getElementById('sidebarOpen');
    const closeButton = document.getElementById('sidebarClose');
    const backdrop = document.getElementById('sidebarBackdrop');
    const close = () => {
      sidebar.classList.remove('is-open');
      backdrop?.classList.remove('is-open');
      sidebar.setAttribute('aria-hidden', 'true');
      openButton?.setAttribute('aria-expanded', 'false');
      sidebar.style.removeProperty('transform');
      if (typeof anime === 'function') anime.remove(sidebar);
    };
    const open = () => {
      sidebar.classList.add('is-open');
      backdrop?.classList.add('is-open');
      sidebar.setAttribute('aria-hidden', 'false');
      openButton?.setAttribute('aria-expanded', 'true');
    };
    openButton?.addEventListener('click', event => { event.preventDefault(); open(); });
    closeButton?.addEventListener('click', event => { event.preventDefault(); close(); });
    backdrop?.addEventListener('click', close);
    document.addEventListener('keydown', event => { if (event.key === 'Escape') close(); });
    close();
  };

  const run = () => setTimeout(init, 0);
  if (document.readyState === 'complete') run();
  else window.addEventListener('load', run, { once: true });
})();
