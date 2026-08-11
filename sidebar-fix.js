// Stable sidebar controller for the three active calculator features.
(() => {
  const init = () => {
    const sidebar = document.getElementById('featureSidebar');
    const list = sidebar?.querySelector('.feature-list');
    if (!sidebar || !list) return;

    const freshList = list.cloneNode(false);
    const make = (feature, label, icon, handler) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'feature-item';
      button.dataset.feature = feature;
      button.setAttribute('aria-label', label);
      button.innerHTML = `<i class="fas ${icon}" aria-hidden="true"></i><span>${label}</span>`;
      button.addEventListener('click', event => {
        event.preventDefault();
        event.stopPropagation();
        freshList.querySelectorAll('.feature-item').forEach(item => item.classList.remove('active'));
        button.classList.add('active');
        handler();
        close();
      });
      return button;
    };

    freshList.append(
      make('history', 'History', 'fa-clock-rotate-left', () => document.getElementById('historyToggle')?.click()),
      make('clear', 'Clear', 'fa-eraser', () => document.querySelector('[data-action="clear-all"]')?.click()),
      make('theme', 'Change Theme', 'fa-circle-half-stroke', () => document.getElementById('themeToggle')?.click())
    );
    list.replaceWith(freshList);

    const originalOpen = document.getElementById('sidebarOpen');
    const originalClose = document.getElementById('sidebarClose');
    const originalBackdrop = document.getElementById('sidebarBackdrop');
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    for (const node of [originalOpen, originalClose, originalBackdrop]) {
      if (!node) continue;
      node.replaceWith(node.cloneNode(true));
    }

    const openButton = document.getElementById('sidebarOpen');
    const closeButton = document.getElementById('sidebarClose');
    const backdrop = document.getElementById('sidebarBackdrop');

    const close = () => {
      sidebar.classList.remove('is-open');
      backdrop?.classList.remove('is-open');
      sidebar.setAttribute('aria-hidden', 'true');
      openButton?.setAttribute('aria-expanded', 'false');
      if (typeof anime === 'function') anime.remove(sidebar);
      sidebar.style.removeProperty('transform');
    };

    const open = () => {
      sidebar.classList.add('is-open');
      backdrop?.classList.add('is-open');
      sidebar.setAttribute('aria-hidden', 'false');
      openButton?.setAttribute('aria-expanded', 'true');
      if (typeof anime === 'function' && !reduceMotion) {
        anime.remove(sidebar);
        sidebar.style.transform = 'translateX(-105%)';
        anime({ targets: sidebar, translateX: ['-105%', '0%'], duration: 210, easing: 'easeOutCubic', complete: () => sidebar.style.removeProperty('transform') });
      }
    };

    openButton?.addEventListener('click', event => { event.preventDefault(); event.stopPropagation(); open(); });
    closeButton?.addEventListener('click', event => { event.preventDefault(); event.stopPropagation(); close(); });
    backdrop?.addEventListener('click', close);
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && sidebar.classList.contains('is-open')) close();
    });
    close();
  };

  if (document.readyState === 'complete') init();
  else window.addEventListener('load', init, { once: true });
})();
