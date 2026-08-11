(() => {
  const init = () => {
    const item = document.querySelector('.feature-item[data-feature="clear"]');
    const clearButton = document.querySelector('.button-grid .btn[data-action="clear-all"]');
    if (!item || !clearButton || item.dataset.bound === 'true') return;
    item.dataset.bound = 'true';
    item.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
      clearButton.click();
      item.classList.remove('active');
    });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
