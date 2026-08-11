// Single sidebar owner. Loaded before script.js so it can override Calculator.bindSidebar before initialization.
(() => {
  const install=()=>{
    if(typeof Calculator!=='function')return false;
    if(Calculator.prototype.__mainSidebarController)return true;
    Calculator.prototype.__mainSidebarController=true;
    Calculator.prototype.bindSidebar=function(){
      const sidebar=document.getElementById('featureSidebar'),open=document.getElementById('sidebarOpen'),close=document.getElementById('sidebarClose'),backdrop=document.getElementById('sidebarBackdrop'),list=sidebar?.querySelector('.feature-list');
      if(!sidebar||!open||!close||!list)return;
      const panelMap={history:[this.historyToggle,this.clearHistoryButton,this.historyPanel],memory:[document.querySelector('.memory-panel')],scientific:[this.scientificToggle,this.scientificPanel],graph:[document.getElementById('graphToggle'),document.getElementById('graphPanel')],statistics:[document.getElementById('statisticsToggle'),document.getElementById('statisticsPanel')]};
      const panels=[...new Set(Object.values(panelMap).flat().filter(Boolean))];
      const style=document.getElementById('main-sidebar-theme-style')||document.createElement('style');style.id='main-sidebar-theme-style';style.textContent=`
        .calculator .sidebar-feature-visible{display:block!important;visibility:visible!important;opacity:1}
        .calculator .sidebar-feature-visible.calculator-tools{display:flex!important;gap:6px}
        .calculator .sidebar-feature-visible.scientific-panel{display:grid!important}
        .calculator .sidebar-feature-visible.history-panel,.calculator .sidebar-feature-visible.graph-panel,.calculator .sidebar-feature-visible.statistics-panel{display:block!important}
        .calculator .sidebar-feature-visible.memory-panel{display:block!important}
        .calculator .sidebar-feature-visible button{color:var(--text-primary);background:var(--surface-2);border-color:var(--border)}
        .calculator .sidebar-feature-visible,.calculator .sidebar-feature-visible .history-header,.calculator .sidebar-feature-visible .history-item,.calculator .sidebar-feature-visible .memory-status{color:var(--text-primary);background:var(--surface);border-color:var(--border)}
        .calculator .sidebar-feature-visible input,.calculator .sidebar-feature-visible select{color:var(--text-primary);background:var(--display);border-color:var(--border)}
        .calculator .calculator-tools{padding:.4rem;margin-bottom:.35rem;border:1px solid var(--border);border-radius:12px;background:var(--surface)}
        .calculator .tool-button{min-height:36px;flex:1;border:1px solid var(--border);border-radius:10px;background:var(--surface-2);color:var(--text-primary);font:600 .68rem Inter,sans-serif;cursor:pointer}
        .calculator .tool-button:hover{background:var(--display)}
        .calculator .history-panel,.calculator .memory-panel{margin-bottom:.35rem;padding:.55rem;border:1px solid var(--border);border-radius:12px;background:var(--surface);color:var(--text-primary)}
        .calculator .history-header{display:flex;justify-content:space-between;align-items:center;padding:.15rem .1rem .45rem;font:600 .68rem Inter,sans-serif;border-bottom:1px solid var(--border)}
        .calculator .history-count{min-width:22px;padding:2px 6px;border-radius:999px;background:var(--surface-2);text-align:center;color:var(--text-secondary);font-size:.58rem}
        .calculator .history-list{display:grid;gap:5px;max-height:170px;overflow:auto;padding-top:.45rem}
        .calculator .history-item{display:flex;justify-content:space-between;gap:8px;width:100%;padding:.45rem .5rem;border:1px solid var(--border);border-radius:9px;background:var(--surface-2);color:var(--text-primary);font:500 .62rem Inter,sans-serif;text-align:left;cursor:pointer}
        .calculator .history-item:hover{border-color:var(--border-strong);background:var(--display)}
        .calculator .history-result{font-weight:650}
        .calculator .history-empty{padding:.7rem;text-align:center;color:var(--text-secondary);font-size:.62rem}
        .calculator .memory-status{display:flex;align-items:center;gap:7px;padding:.35rem .1rem .45rem;border-bottom:1px solid var(--border);font:600 .66rem Inter,sans-serif}.calculator .memory-status strong{margin-left:auto;font-variant-numeric:tabular-nums}.calculator .memory-buttons{display:grid;grid-template-columns:repeat(5,1fr);gap:5px;padding-top:.45rem}.calculator .memory-button{min-height:32px;border:1px solid var(--border);border-radius:8px;background:var(--surface-2);color:var(--text-primary);font:650 .62rem Inter,sans-serif;cursor:pointer}.calculator .memory-button:hover{background:var(--display)}
        .feature-sidebar{background:var(--bg-secondary);color:var(--text-primary);border-color:var(--border)}
        .feature-sidebar .feature-item{background:var(--surface);color:var(--text-primary);border-color:var(--border)}
        .feature-sidebar .feature-item:hover,.feature-sidebar .feature-item.active{background:var(--surface-2);border-color:var(--border-strong)}
        .feature-sidebar .feature-list{gap:8px}.feature-sidebar .feature-item[data-feature="theme"]{margin-top:6px}
      `;if(!style.parentNode)document.head.appendChild(style);
      const reduced=()=>this.reduceMotion||window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
      const animate=(targets,options)=>{if(typeof anime!=='function'||reduced())return;anime.remove(targets);anime({targets,...options});};
      const setOpen=value=>{sidebar.classList.toggle('is-open',value);backdrop?.classList.toggle('is-open',value);sidebar.setAttribute('aria-hidden',String(!value));open.setAttribute('aria-expanded',String(value));};
      const closeSidebar=()=>{if(typeof anime==='function'&&!reduced()){anime.remove(sidebar);anime({targets:sidebar,translateX:['0%','-105%'],duration:190,easing:'easeInCubic',complete:()=>sidebar.style.removeProperty('transform')});}else sidebar.style.removeProperty('transform');setOpen(false);};
      const openSidebar=()=>{setOpen(true);if(typeof anime==='function'&&!reduced()){anime.remove(sidebar);sidebar.style.transform='translateX(-105%)';anime({targets:sidebar,translateX:['-105%','0%'],duration:240,easing:'easeOutCubic',complete:()=>sidebar.style.removeProperty('transform')});}else sidebar.style.removeProperty('transform');};
      const reset=()=>{panels.forEach(panel=>{panel.classList.remove('sidebar-feature-visible');panel.setAttribute('aria-hidden','true');});['historyToggle','scientificToggle','graphToggle','statisticsToggle'].forEach(id=>document.getElementById(id)?.setAttribute('aria-expanded','false'));list.querySelectorAll('.feature-item').forEach(item=>item.classList.remove('active'));};
      const activate=feature=>{reset();list.querySelector(`[data-feature="${feature}"]`)?.classList.add('active');if(feature==='theme'){this.toggleTheme();closeSidebar();return;}if(feature==='basic'){closeSidebar();return;}const selected=(panelMap[feature]||[]).filter(Boolean);if(!selected.length){closeSidebar();return;}selected.forEach(panel=>{panel.classList.add('sidebar-feature-visible');panel.setAttribute('aria-hidden','false');});if(feature==='history')this.historyToggle?.setAttribute('aria-expanded','true');if(feature==='scientific')this.scientificToggle?.setAttribute('aria-expanded','true');if(feature==='graph')document.getElementById('graphToggle')?.setAttribute('aria-expanded','true');if(feature==='statistics')document.getElementById('statisticsToggle')?.setAttribute('aria-expanded','true');closeSidebar();requestAnimationFrame(()=>{if(feature==='graph')window.dispatchEvent(new Event('resize'));animate(selected,{opacity:[0,1],translateY:[8,0],duration:220,delay:typeof anime==='function'?anime.stagger(18):0,easing:'easeOutCubic'});});};
      open.addEventListener('click',e=>{e.preventDefault();openSidebar();});close.addEventListener('click',e=>{e.preventDefault();closeSidebar();});backdrop?.addEventListener('click',closeSidebar);list.addEventListener('click',e=>{const item=e.target.closest('.feature-item');if(!item||!list.contains(item))return;e.preventDefault();e.stopPropagation();activate(item.dataset.feature);});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&sidebar.classList.contains('is-open')){e.preventDefault();closeSidebar();}});reset();setOpen(false);sidebar.style.removeProperty('transform');
    };
    return true;
  };
  if(!install()){const timer=setInterval(()=>{if(install())clearInterval(timer);},0);setTimeout(()=>clearInterval(timer),5000);}
})();
