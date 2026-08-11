(() => {
  const init = () => {
    const calculator=document.querySelector('.calculator'), buttonGrid=calculator?.querySelector('.button-grid');
    const sourceSidebar=document.getElementById('featureSidebar'), sourceOpen=document.getElementById('sidebarOpen'), sourceClose=document.getElementById('sidebarClose'), sourceBackdrop=document.getElementById('sidebarBackdrop');
    if(!calculator||!buttonGrid||!sourceSidebar||!sourceOpen||!sourceClose)return;

    // Replace legacy nodes once so old listeners from script.js cannot fire alongside this controller.
    const cloneReplace=node=>{const clone=node.cloneNode(true);node.replaceWith(clone);return clone;};
    const sidebar=cloneReplace(sourceSidebar), open=cloneReplace(sourceOpen), close=cloneReplace(sourceClose), backdrop=sourceBackdrop?cloneReplace(sourceBackdrop):null;
    const list=sidebar.querySelector('.feature-list');
    if(!list)return;

    const get=id=>document.getElementById(id);
    const nodes={
      history:[calculator.querySelector('.calculator-tools'),get('historyPanel')],
      memory:[calculator.querySelector('.memory-panel')],
      scientific:[get('scientificToggle'),get('scientificPanel')],
      graph:[get('graphToggle'),get('graphPanel')],
      statistics:[get('statisticsToggle'),get('statisticsPanel')]
    };
    Object.values(nodes).flat().filter(Boolean).forEach(node=>{if(node.parentElement!==calculator)calculator.insertBefore(node,buttonGrid);});

    const style=document.getElementById('sidebar-main-layout-style')||document.createElement('style');style.id='sidebar-main-layout-style';style.textContent=`
      .calculator .sidebar-feature-hidden{display:none!important}.calculator .sidebar-feature-visible{display:block!important}.calculator .sidebar-feature-visible.calculator-tools{display:grid!important}.calculator .sidebar-feature-visible.scientific-panel{display:grid!important}.calculator .sidebar-feature-visible.graph-panel,.calculator .sidebar-feature-visible.statistics-panel{display:block!important}
      .feature-sidebar{background:var(--bg-secondary);color:var(--text-primary);border-color:var(--border)}.feature-sidebar .feature-item{background:var(--surface);color:var(--text-primary);border-color:var(--border)}.feature-sidebar .feature-item:hover,.feature-sidebar .feature-item.active{background:var(--surface-2);border-color:var(--border-strong);color:var(--text-primary)}.feature-sidebar .feature-item i{color:var(--text-secondary)}
      .sidebar-open{touch-action:manipulation}.feature-sidebar{will-change:transform}.sidebar-backdrop{will-change:opacity}
    `;if(!style.parentNode)document.head.appendChild(style);
    const reduced=()=>window.matchMedia?.('(prefers-reduced-motion: reduce)').matches||false;
    const animate=(target,props)=>{if(typeof anime!=='function'||reduced()){Object.entries(props).forEach(([k,v])=>{if(k!=='duration'&&k!=='easing'&&k!=='complete')target.style[k]=Array.isArray(v)?v[v.length-1]:v;});return;}anime.remove(target);anime({targets:target,...props});};
    const resetPanels=()=>{Object.values(nodes).flat().filter(Boolean).forEach(node=>{node.classList.remove('sidebar-feature-visible','sidebar-feature-hidden','is-open');node.setAttribute('aria-hidden','true');});['historyToggle','scientificToggle','graphToggle','statisticsToggle'].forEach(id=>get(id)?.setAttribute('aria-expanded','false'));const st=get('scientificToggle');if(st)st.innerHTML='<i class="fas fa-flask"></i> Scientific Mode';};
    const closeSidebar=()=>{sidebar.classList.remove('is-open');backdrop?.classList.remove('is-open');sidebar.setAttribute('aria-hidden','true');open.setAttribute('aria-expanded','false');if(typeof anime==='function'&&!reduced()){anime.remove(sidebar);anime({targets:sidebar,translateX:['0%','-105%'],duration:220,easing:'easeInCubic'});}else sidebar.style.removeProperty('transform');};
    const openSidebar=()=>{sidebar.classList.add('is-open');backdrop?.classList.add('is-open');sidebar.setAttribute('aria-hidden','false');open.setAttribute('aria-expanded','true');if(typeof anime==='function'&&!reduced()){anime.remove(sidebar);anime({targets:sidebar,translateX:['-105%','0%'],duration:260,easing:'easeOutCubic'});}else sidebar.style.removeProperty('transform');};
    const activate=feature=>{sidebar.querySelectorAll('.feature-item').forEach(i=>i.classList.toggle('active',i.dataset.feature===feature));resetPanels();if(feature==='theme'){get('themeToggle')?.click();closeSidebar();return;}if(feature==='basic'){closeSidebar();return;}const active=(nodes[feature]||[]).filter(Boolean);if(!active.length)return;active.forEach(node=>{node.classList.add('sidebar-feature-visible');node.setAttribute('aria-hidden','false');if(node.id.endsWith('Panel'))node.classList.add('is-open');});get(feature==='history'?'historyToggle':feature==='scientific'?'scientificToggle':feature==='graph'?'graphToggle':feature==='statistics'?'statisticsToggle':null)?.setAttribute('aria-expanded','true');closeSidebar();requestAnimationFrame(()=>{if(feature==='graph'){window.dispatchEvent(new Event('resize'));get('graphPlot')?.click();}if(typeof anime==='function'&&!reduced())animate(active,{opacity:[0,1],translateY:[8,0],duration:240,delay:anime.stagger(20),easing:'easeOutCubic'});});};
    open.addEventListener('click',openSidebar,{passive:true});close.addEventListener('click',closeSidebar,{passive:true});backdrop?.addEventListener('click',closeSidebar,{passive:true});list.addEventListener('click',e=>{const item=e.target.closest('.feature-item');if(item)activate(item.dataset.feature);});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&sidebar.classList.contains('is-open'))closeSidebar();});
    resetPanels();sidebar.classList.remove('is-open');backdrop?.classList.remove('is-open');sidebar.style.removeProperty('transform');open.setAttribute('aria-expanded','false');sidebar.setAttribute('aria-hidden','true');
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
