(() => {
  const init = () => {
    const sidebar = document.getElementById('featureSidebar');
    const oldOpen = document.getElementById('sidebarOpen');
    const oldBackdrop = document.getElementById('sidebarBackdrop');
    if (!sidebar || !oldOpen) return;

    // Replace only controls so the existing graph/statistics/calculator panel instances
    // and their event listeners remain intact.
    const open = oldOpen.cloneNode(true);
    oldOpen.replaceWith(open);
    const oldClose = document.getElementById('sidebarClose');
    const close = oldClose ? oldClose.cloneNode(true) : null;
    if (oldClose && close) oldClose.replaceWith(close);
    const backdrop = oldBackdrop ? oldBackdrop.cloneNode(true) : null;
    if (oldBackdrop && backdrop) oldBackdrop.replaceWith(backdrop);

    const list = sidebar.querySelector('.feature-list');
    const content = sidebar.querySelector('.sidebar-feature-content');
    if (!list || !content) return;

    sidebar.style.transition = 'none';
    const canAnimate = () => typeof window.anime === 'function' && !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const getBack = () => content.querySelector('.sidebar-back');

    const resetView = () => {
      content.querySelectorAll('.sidebar-feature-active').forEach(node => {
        node.classList.remove('sidebar-feature-active', 'is-open');
        node.setAttribute('aria-hidden', 'true');
        node.style.removeProperty('opacity');
        node.style.removeProperty('transform');
      });
      sidebar.querySelectorAll('[aria-expanded="true"]').forEach(node => node.setAttribute('aria-expanded', 'false'));
      getBack()?.remove();
      sidebar.classList.remove('feature-view-open');
      list.style.removeProperty('display');
    };

    const closeSidebar = () => {
      if (canAnimate()) {
        anime.remove(sidebar);
        anime({
          targets: sidebar,
          translateX: ['0%', '-105%'],
          duration: 300,
          easing: 'easeInCubic',
          complete: () => {
            sidebar.classList.remove('is-open');
            sidebar.style.removeProperty('transform');
          }
        });
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
        anime({
          targets: sidebar,
          translateX: ['-105%', '0%'],
          duration: 360,
          easing: 'easeOutCubic',
          complete: () => sidebar.style.removeProperty('transform')
        });
      } else {
        sidebar.classList.add('is-open');
      }
      backdrop?.classList.add('is-open');
      sidebar.setAttribute('aria-hidden', 'false');
      open.setAttribute('aria-expanded', 'true');
    };

    const showFeature = feature => {
      if (feature === 'basic') {
        resetView();
        closeSidebar();
        return;
      }
      if (feature === 'theme') {
        document.getElementById('themeToggle')?.click();
        return;
      }

      resetView();
      const map = {
        history: ['historyToggle', 'clearHistory', 'historyPanel'],
        memory: ['memory-panel'],
        scientific: ['scientificPanel'],
        graph: ['graphPanel'],
        statistics: ['statisticsPanel']
      };
      const nodes = (map[feature] || []).map(id => id === 'memory-panel' ? document.querySelector('.memory-panel') : document.getElementById(id)).filter(Boolean);
      if (!nodes.length) return;

      sidebar.classList.add('feature-view-open');
      list.style.display = 'none';

      const back = document.createElement('button');
      back.type = 'button';
      back.className = 'sidebar-back';
      back.innerHTML = '<i class="fas fa-arrow-left" aria-hidden="true"></i><span>Back to Features</span>';
      content.prepend(back);

      nodes.forEach(node => {
        node.classList.add('sidebar-feature-active', 'is-open');
        node.setAttribute('aria-hidden', 'false');
      });
      if (feature === 'history') document.getElementById('historyToggle')?.setAttribute('aria-expanded', 'true');
      if (feature === 'scientific') document.getElementById('scientificToggle')?.setAttribute('aria-expanded', 'true');

      back.addEventListener('click', () => {
        if (!canAnimate()) return resetView();
        const targets = [back, ...nodes];
        anime.remove(targets);
        anime({ targets, opacity: [1, 0], translateX: [0, 10], duration: 160, delay: anime.stagger(15), easing: 'easeInQuad', complete: resetView });
      });

      if (canAnimate()) {
        const targets = [back, ...nodes];
        anime.remove(targets);
        anime({ targets, opacity: [0, 1], translateX: [14, 0], duration: 300, delay: anime.stagger(45), easing: 'easeOutCubic' });
      }
    };

    open.addEventListener('click', openSidebar);
    close?.addEventListener('click', closeSidebar);
    backdrop?.addEventListener('click', closeSidebar);

    sidebar.querySelectorAll('.feature-item').forEach(original => {
      const item = original.cloneNode(true);
      original.replaceWith(item);
      item.addEventListener('click', () => {
        if (canAnimate()) {
          anime.remove(item);
          anime({ targets: item, scale: [1, .97, 1], duration: 180, easing: 'easeOutCubic' });
        }
        showFeature(item.dataset.feature);
      });
    });

    document.addEventListener('keydown', event => {
      if (event.key !== 'Escape' || !sidebar.classList.contains('is-open')) return;
      if (!sidebar.classList.contains('feature-view-open')) return closeSidebar();
      const targets = [getBack(), ...content.querySelectorAll('.sidebar-feature-active')].filter(Boolean);
      if (!canAnimate()) return resetView();
      anime.remove(targets);
      anime({ targets, opacity: [1, 0], translateX: [0, 10], duration: 160, easing: 'easeInQuad', complete: resetView });
    });

    resetView();
    sidebar.classList.remove('is-open');
    sidebar.style.removeProperty('transform');
    sidebar.setAttribute('aria-hidden', 'true');
    open.setAttribute('aria-expanded', 'false');
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
