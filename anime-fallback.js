/*
 * Minimal animation fallback.
 * Anime.js remains the primary animation engine; this only keeps the UI
 * functional when the external CDN is unavailable (for example in CI).
 */
(() => {
  if (typeof window.anime === 'function') return;

  const active = new WeakMap();
  const targets = value => {
    if (typeof value === 'string') return [...document.querySelectorAll(value)];
    if (value instanceof Element) return [value];
    if (value && typeof value.length === 'number') return [...value].filter(Boolean);
    return [];
  };
  const valueAt = (value, end = false) => Array.isArray(value) ? value[end ? value.length - 1 : 0] : value;
  const cssValue = (property, value) => {
    if (property === 'scale') return `scale(${value})`;
    if (property === 'translateX' || property === 'translateY') return value;
    return value;
  };
  const apply = (element, options, end = false) => {
    const transforms = [];
    for (const property of ['translateX', 'translateY', 'scale']) {
      if (property in options) {
        let value = valueAt(options[property], end);
        if (property === 'translateX' || property === 'translateY') value = typeof value === 'number' ? `${value}px` : value;
        if (property === 'scale') transforms.push(cssValue(property, value));
        else transforms.push(`${property}(${value})`);
      }
    }
    if (transforms.length) element.style.transform = transforms.join(' ');
    for (const property of ['opacity']) if (property in options) element.style[property] = String(valueAt(options[property], end));
  };

  function anime(options = {}) {
    const list = targets(options.targets);
    const duration = Math.max(0, Number(options.duration) || 0);
    const baseDelay = options.delay;
    const animation = { cancel: () => {} };
    list.forEach((element, index) => {
      active.get(element)?.cancel?.();
      const delay = typeof baseDelay === 'function' ? Number(baseDelay(index, list.length)) || 0 : Number(baseDelay) || 0;
      let cancelled = false;
      const timer = setTimeout(() => {
        if (cancelled) return;
        apply(element, options, false);
        element.style.transition = ['opacity', 'transform'].filter(property => property in options || (property === 'transform' && ['translateX', 'translateY', 'scale'].some(key => key in options))).map(property => `${property} ${duration}ms cubic-bezier(.22,1,.36,1)`).join(', ');
        requestAnimationFrame(() => {
          if (cancelled) return;
          apply(element, options, true);
        });
        setTimeout(() => {
          if (cancelled) return;
          element.style.removeProperty('transition');
          if (options.complete) options.complete();
          active.delete(element);
        }, duration + 20);
      }, delay);
      animation.cancel = () => { cancelled = true; clearTimeout(timer); element.style.removeProperty('transition'); };
      active.set(element, animation);
    });
    return animation;
  }

  anime.remove = value => targets(value).forEach(element => {
    active.get(element)?.cancel?.();
    active.delete(element);
  });
  anime.stagger = (step = 0, settings = {}) => index => (Number(settings.start) || 0) + index * Number(step);
  window.anime = anime;
  window.__calculatorAnimationBackend = 'fallback';
})();
