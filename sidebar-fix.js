// Sidebar controller is implemented by script.js.
// This file intentionally contains only a safe compatibility layer so it does not
// register a second set of listeners or move calculator panels between containers.
(() => {
  const init = () => {
    const sidebar = document.getElementById('featureSidebar');
    const list = sidebar?.querySelector('.feature-list');
    if (!sidebar || !list) return;

    // Keep feature spacing consistent without interfering with script.js state.
    list.style.gap = '8px';
    const theme = list.querySelector('[data-feature="theme"]');
    if (theme) theme.style.marginTop = '6px';
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
