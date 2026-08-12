/*
 * Minimal animation fallback.
 * Anime.js remains the primary animation engine; this only keeps the UI
 * functional when the external CDN is unavailable (for example in CI).
 */
(() => {
  if (typeof window.anime === 'function') return;

  const active = new WeakMap();
  const isElement = value => value && typeof value === 'object' && value.nodeType === 1 && typeof value.style === 'object';
  const targets = value => {
    if (typeof value === 'string') return [...document.querySelectorAll(value)];
    if (isElement(value)) return [value];
    if (value && typeof value.length === 'number') return [...value].filter(isElement);
    return [];
  };
  const valueAt = (value, end = false) => Array.isArray(value) ? value[end ? value.length - 1 : 0] : value;
  const cssValue = (property, value) => {
    if (property === 'scale') return `scale(${value})`;
    return value;
  };
  const apply = (element, options, end = false) => {
    if (!isElement(element)) return;
    const transforms = [];
    for (const property of ['translateX', 'translateY', 'scale']) {
      if (property in options) {
        let value = valueAt(options[property], end);
        if (property === 'translateX' || property === 'translateY') value = typeof value === 'number' ? `${value}px` : value;
        transforms.push(property === 'scale' ? cssValue(property, value) : `${property}(${value})`);
      }
    }
    if (transforms.length) element.style.transform = transforms.join(' ');
    if ('opacity' in options) element.style.opacity = String(valueAt(options.opacity, end));
  };

  function anime(options = {}) {
    const list = targets(options.targets);
    const duration = Math.max(0, Number(options.duration) || 0);
    const baseDelay = options.delay;
    const animations = [];

    list.forEach((element, index) => {
      if (!isElement(element)) return;
      active.get(element)?.cancel?.();
      const delay = typeof baseDelay === 'function'
        ? Number(baseDelay(index, list.length)) || 0
        : Number(baseDelay) || 0;
      let cancelled = false;
      const animation = {
        cancel: () => {
          cancelled = true;
          clearTimeout(timer);
          if (isElement(element)) element.style.removeProperty('transition');
          active.delete(element);
        }
      };
      const timer = setTimeout(() => {
        if (cancelled || !isElement(element)) return;
        apply(element, options, false);
        const properties = [];
        if ('opacity' in options) properties.push('opacity');
        if (['translateX', 'translateY', 'scale'].some(key => key in options)) properties.push('transform');
        element.style.transition = properties
          .map(property => `${property} ${duration}ms cubic-bezier(.22,1,.36,1)`)
          .join(', ');
        requestAnimationFrame(() => {
          if (!cancelled && isElement(element)) apply(element, options, true);
        });
        setTimeout(() => {
          if (cancelled || !isElement(element)) return;
          element.style.removeProperty('transition');
          if (typeof options.complete === 'function') options.complete();
          active.delete(element);
        }, duration + 20);
      }, delay);
      active.set(element, animation);
      animations.push(animation);
    });

    return {
      cancel: () => animations.forEach(animation => animation.cancel())
    };
  }

  anime.remove = value => targets(value).forEach(element => {
    active.get(element)?.cancel?.();
    active.delete(element);
  });
  anime.stagger = (step = 0, settings = {}) => index => (Number(settings.start) || 0) + index * Number(step);
  window.anime = anime;
  window.__calculatorAnimationBackend = 'fallback';
})();
