// Stable minimal sidebar controller: History, Clear, Theme only.
(() => {
  const init = () => {
    const sidebar = document.getElementById('featureSidebar');
    const list = sidebar?.querySelector('.feature-list');
    if (!sidebar || !list) return;

    const make = (feature, icon, label) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'feature-item';
      button.dataset.feature = feature;
      button.innerHTML = `<i class="fas ${icon}" aria-hidden="true"></i><span>${label}</span>`;
      return button;
    };

    list.replaceChildren(
      make('history', 'fa-clock-rotate-left', 'History'),
      make('clear', 'fa-eraser', 'Clear'),
      make('theme', 'fa-circle-half-stroke', 'Change Theme')
    );

    const style = document.getElementById('minimal-sidebar-fix-style') || document.createElement('style');
    style.id = 'minimal-sidebar-fix-style';
    style.textContent = '.calculator .history-panel.sidebar-feature-visible,.calculator .history-panel.is-open{display:block!important}.calculator .history-panel.sidebar-feature-visible[aria-hidden="true"]{display:none!important}';
    if (!style.parentNode) document.head.appendChild(style);

    // This listener is installed in capture phase so the legacy sidebar handler
    // cannot also process the same feature click.
    list.addEventListener('click', event => {
      const item = event.target.closest('.feature-item');
      if (!item || !list.contains(item)) return;
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();

      const calculator = window.calculator;
      if (!calculator) return;
      list.querySelectorAll('.feature-item').forEach(button => button.classList.remove('active'));
      item.classList.add('active');

      if (item.dataset.feature === 'history') {
        calculator.historyPanel?.classList.add('sidebar-feature-visible', 'is-open');
        calculator.historyPanel?.setAttribute('aria-hidden', 'false');
        calculator.historyToggle?.setAttribute('aria-expanded', 'true');
        calculator.animateHistoryPanel?.();
      } else if (item.dataset.feature === 'clear') {
        calculator.clearAll?.();
      } else if (item.dataset.feature === 'theme') {
        calculator.toggleTheme?.();
      }

      document.getElementById('sidebarClose')?.click();
    }, true);
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
