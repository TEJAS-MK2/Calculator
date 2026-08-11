// Single sidebar owner. This overrides Calculator.bindSidebar BEFORE the Calculator
// constructor runs, so feature panels never get moved out of the main calculator.
(() => {
  const install = () => {
    if (typeof Calculator !== 'function') return;
    if (Calculator.prototype.__mainSidebarController) return;
    Calculator.prototype.__mainSidebarController = true;
    Calculator.prototype.bindSidebar = function () {
      const sidebar = document.getElementById('featureSidebar');
      const open = document.getElementById('sidebarOpen');
      const close = document.getElementById('sidebarClose');
      const backdrop = document.getElementById('sidebarBackdrop');
      const list = sidebar?.querySelector('.feature-list');
      if (!sidebar || !open || !close || !list) return;
      const panelMap = {history:[this.historyToggle,this.clearHistoryButton,this.historyPanel],memory:[document.querySelector('.memory-panel')],scientific:[this.scientificToggle,this.scientificPanel],graph:[document.getElementById('graphToggle'),document.getElementById('graphPanel')],statistics:[document.getElementById('statisticsToggle'),document.getElementById('statisticsPanel')]};
      const panels=[...new Set(Object.values(panelMap).flat().filter(Boolean))];
      const style=document.getElementById('main-sidebar-theme-style')||document.createElement('style');style.id='main-sidebar-theme-style';style.textContent=`
        .calculator .sidebar-feature-visible{display:block!important}
        .calculator .sidebar-feature-visible.calculator-tools{display:flex!important}
        .calculator .sidebar-feature-visible.scientific-panel{display:grid!important}
        .calculator .sidebar-feature-visible.history-panel,.calculator .sidebar-feature-visible.graph-panel,.calculator .sidebar-feature-visible.statistics-panel{display:block!important}
        .calculator .sidebar-feature-visible.memory-panel,.calculator .sidebar-feature-visible.scientific-toggle,.calculator .sidebar-feature-visible.graph-toggle,.calculator .sidebar-feature-visible.statistics-toggle{display:block!important}
        .calculator .sidebar-feature-visible{color:var(--text-primary);background:var(--surface);border-color:var(--border)}
        .calculator .sidebar-feature-visible button{color:var(--text-primary);border-color:var(--border)}
        .feature-sidebar{background:var(--bg-secondary);color:var(--text-primary);border-color:var(--border)}
        .feature-sidebar .feature-item{background:var(--surface);color:var(--text-primary);border-color:var(--border)}
        .feature-sidebar .feature-item:hover,.feature-sidebar .feature-item.active{background:var(--surface-2);border-color:var(--border-strong)}
        .feature-sidebar .feature-list{gap:8px}.feature-sidebar .feature-item[data-feature="theme"]{margin-top:6px}
      `;if(!style.parentNode)document.head.appendChild(style);
      const reduced=()=>this.reduceMotion||window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
      const animate=(targets,options)=>{if(typeof anime!=='function'||reduced())return;anime.remove(targets);anime({targets,...options});};
      const setOpen=value=>{sidebar.classList.toggle('is-open',value);backdrop?.classList.toggle('is-open',value);sidebar.setAttribute('aria-hidden',String(!value));open.setAttribute('aria-expanded',String(value));};
      const closeSidebar=()=>{if(typeof anime==='function'&&!reduced()){anime.remove(sidebar);anime({targets:sidebar,translateX:['0%','-105%'],duration:190,easing:'easeInCubic',complete:()=>sidebar.style.removeProperty('transform')});}else sidebar.style.removeProperty('transform');setOpen(false);};
      const openSidebar=()=>{setOpen(true);if(typeof anime==='function'&&!reduced()){anime.remove(sidebar);sidebar.style.transform='translateX(-105%)';anime({targets:sidebar,translateX:['-105%','0%'],duration:240,easing:'easeOutCubic',complete:()=>sidebar.style.removeProperty('transform')});}};
      const reset=()=>{panels.forEach(panel=>{panel.classList.remove('sidebar-feature-visible');panel.setAttribute('aria-hidden','true');});['historyToggle','scientificToggle','graphToggle','statisticsToggle'].forEach(id=>document.getElementById(id)?.setAttribute('aria-expanded','false'));list.querySelectorAll('.feature-item').forEach(item=>item.classList.remove('active'));};
      const activate=feature=>{reset();list.querySelector(`[data-feature="${feature}"]`)?.classList.add('active');if(feature==='theme'){this.toggleTheme();closeSidebar();return;}if(feature==='basic'){closeSidebar();return;}const selected=(panelMap[feature]||[]).filter(Boolean);if(!selected.length){closeSidebar();return;}selected.forEach(panel=>{panel.classList.add('sidebar-feature-visible');panel.setAttribute('aria-hidden','false');});if(feature==='history')this.historyToggle?.setAttribute('aria-expanded','true');if(feature==='scientific')this.scientificToggle?.setAttribute('aria-expanded','true');closeSidebar();requestAnimationFrame(()=>{if(feature==='graph')window.dispatchEvent(new Event('resize'));animate(selected,{opacity:[0,1],translateY:[8,0],duration:220,delay:typeof anime==='function'?anime.stagger(18):0,easing:'easeOutCubic'});});};
      open.addEventListener('click',e=>{e.preventDefault();openSidebar();});close.addEventListener('click',e=>{e.preventDefault();closeSidebar();});backdrop?.addEventListener('click',closeSidebar);list.addEventListener('click',e=>{const item=e.target.closest('.feature-item');if(!item||!list.contains(item))return;e.preventDefault();e.stopPropagation();activate(item.dataset.feature);});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&sidebar.classList.contains('is-open')){e.preventDefault();closeSidebar();}});reset();setOpen(false);sidebar.style.removeProperty('transform');
    };
  };
  install();
})();
