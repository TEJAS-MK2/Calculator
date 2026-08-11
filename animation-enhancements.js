(() => {
  const boot = () => {
    if (!window.Calculator) return;
    const C = window.Calculator.prototype;
    C.canAnimate = function () {
      return typeof anime === 'function' && !this.reduceMotion && document.visibilityState !== 'hidden';
    };
    C.animateButton = function (button) {
      if (!this.canAnimate() || !button) return;
      anime.remove(button);
      anime({ targets: button, scale: [1, 0.965, 1], duration: 150, easing: 'easeOutQuad' });
    };
    C.animateDisplay = function () {
      if (!this.canAnimate() || !this.primary) return;
      anime.remove(this.primary);
      anime({ targets: this.primary, opacity: [0.82, 1], translateY: [2, 0], duration: 105, easing: 'easeOutQuad' });
    };
    C.animateResult = function () {
      if (!this.canAnimate() || !this.primary) return;
      anime.remove(this.primary);
      anime({ targets: this.primary, opacity: [0.72, 1], scale: [0.975, 1], duration: 190, easing: 'easeOutCubic' });
    };
    C.animateEntrance = function () {
      if (!this.canAnimate()) return;
      const targets = document.querySelectorAll('.calculator-header,.calculator,.calculator-footer,.button-grid .btn');
      anime.remove(targets);
      anime.timeline({ easing: 'easeOutCubic' })
        .add({ targets: '.calculator-header', opacity: [0, 1], translateY: [-10, 0], duration: 300 })
        .add({ targets: '.calculator', opacity: [0, 1], translateY: [10, 0], duration: 380, offset: '-=170' })
        .add({ targets: '.button-grid .btn', opacity: [0, 1], translateY: [5, 0], duration: 190, delay: anime.stagger(14), offset: '-=150' })
        .add({ targets: '.calculator-footer', opacity: [0, 1], duration: 160, offset: '-=90' });
    };
    C.animateHistoryPanel = function () {
      if (!this.canAnimate() || !this.historyList) return;
      const items = this.historyList.querySelectorAll('.history-item,.history-empty');
      if (!items.length) return;
      anime.remove(items);
      anime({ targets: items, opacity: [0, 1], translateY: [5, 0], duration: 160, delay: anime.stagger(18), easing: 'easeOutQuad' });
    };
    C.animateHistoryItem = function () {
      if (!this.canAnimate() || !this.historyList) return;
      const item = this.historyList.querySelector('.history-item');
      if (!item) return;
      anime.remove(item);
      anime({ targets: item, opacity: [0, 1], translateY: [5, 0], duration: 180, easing: 'easeOutQuad' });
    };
    C.animateScientificPanel = function () {
      if (!this.canAnimate() || !this.scientificPanel) return;
      const items = this.scientificPanel.querySelectorAll('.btn');
      if (!items.length) return;
      anime.remove(items);
      anime({ targets: items, opacity: [0, 1], translateY: [4, 0], duration: 170, delay: anime.stagger(15), easing: 'easeOutQuad' });
    };
    C.animateMemoryAction = function (action) {
      if (!this.canAnimate()) return;
      const panel = document.querySelector('.memory-panel');
      if (panel) {
        anime.remove(panel);
        anime({ targets: panel, scale: [1, 0.99, 1], duration: 170, easing: 'easeOutQuad' });
      }
      if (action === 'memory-recall') this.animateResult();
    };
    C.animateThemeChange = function () {
      if (!this.canAnimate() || !this.themeToggle) return;
      anime.remove(this.themeToggle);
      anime({ targets: this.themeToggle, rotate: [0, 180], duration: 210, easing: 'easeOutCubic' });
    };
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
  else boot();
})();
