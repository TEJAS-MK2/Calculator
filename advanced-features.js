(() => {
  const init = () => {
    const sidebar = document.getElementById('featureSidebar');
    const list = sidebar?.querySelector('.feature-list');
    const calculator = document.querySelector('.calculator');
    if (!sidebar || !list || !calculator) return;
    if (document.getElementById('advancedFeaturesPanel')) return;

    const style = document.createElement('style');
    style.id = 'advanced-features-style';
    style.textContent = `
      .advanced-feature-panel{display:none;margin:.55rem 0;padding:.7rem;border:1px solid var(--border);border-radius:14px;background:var(--surface);color:var(--text-primary)}
      .advanced-feature-panel.is-open{display:block}
      .advanced-feature-head{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:.55rem}
      .advanced-feature-title{font-size:.78rem;font-weight:650}
      .advanced-feature-back{border:1px solid var(--border);background:var(--surface-2);color:var(--text-primary);border-radius:9px;padding:5px 8px;font:600 .65rem Inter,sans-serif;cursor:pointer}
      .advanced-grid{display:grid;grid-template-columns:1fr 1fr;gap:7px}
      .advanced-field{display:flex;flex-direction:column;gap:4px}.advanced-field label{font-size:.58rem;color:var(--text-secondary)}
      .advanced-field input,.advanced-field select{width:100%;min-height:36px;border:1px solid var(--border-strong);border-radius:10px;background:var(--display);color:var(--text-primary);padding:0 9px;font:500 .72rem Inter,sans-serif;outline:none}
      .advanced-field input:focus,.advanced-field select:focus{border-color:var(--text-secondary)}
      .advanced-action{grid-column:1/-1;min-height:38px;border:1px solid var(--border-strong);border-radius:10px;background:var(--surface-2);color:var(--text-primary);font:650 .7rem Inter,sans-serif;cursor:pointer}
      .advanced-result{grid-column:1/-1;padding:.55rem .65rem;border-radius:10px;background:var(--display);border:1px solid var(--border);font-size:.72rem;word-break:break-word}
      .advanced-error{color:#ff5f56}.advanced-success{color:var(--text-primary)}
      .advanced-base-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-top:7px}.advanced-base-grid button{min-height:34px;border:1px solid var(--border);border-radius:9px;background:var(--surface-2);color:var(--text-primary);cursor:pointer;font:650 .68rem Inter,sans-serif}
      @media(max-width:360px){.advanced-grid{grid-template-columns:1fr}.advanced-action,.advanced-result{grid-column:auto}}
    `;
    document.head.appendChild(style);

    const addFeatureButton = (feature, icon, label) => {
      const button = document.createElement('button');
      button.className = 'feature-item'; button.type = 'button'; button.dataset.advancedFeature = feature;
      button.innerHTML = `<i class="fas ${icon}"></i><span>${label}</span>`;
      const theme = list.querySelector('[data-feature="theme"]');
      list.insertBefore(button, theme || null);
      return button;
    };

    addFeatureButton('converter', 'fa-ruler-combined', 'Unit Converter');
    addFeatureButton('programmer', 'fa-code', 'Programmer Mode');

    const panel = document.createElement('section');
    panel.id = 'advancedFeaturesPanel';
    panel.className = 'advanced-feature-panel';
    panel.setAttribute('aria-hidden','true');
    panel.innerHTML = `
      <div class="advanced-feature-head"><span class="advanced-feature-title" id="advancedFeatureTitle"></span><button class="advanced-feature-back" id="advancedFeatureBack" type="button">Back</button></div>
      <div id="converterView" class="advanced-grid">
        <div class="advanced-field"><label for="converterValue">Value</label><input id="converterValue" inputmode="decimal" placeholder="100"></div>
        <div class="advanced-field"><label for="converterCategory">Category</label><select id="converterCategory"><option value="length">Length</option><option value="mass">Mass</option><option value="temperature">Temperature</option><option value="speed">Speed</option><option value="data">Data</option></select></div>
        <div class="advanced-field"><label for="converterFrom">From</label><select id="converterFrom"></select></div>
        <div class="advanced-field"><label for="converterTo">To</label><select id="converterTo"></select></div>
        <button class="advanced-action" id="converterConvert" type="button">Convert</button><div class="advanced-result" id="converterResult">Enter a value and convert.</div>
      </div>
      <div id="programmerView" class="advanced-grid" hidden>
        <div class="advanced-field"><label for="programmerInput">Decimal value</label><input id="programmerInput" inputmode="numeric" placeholder="255"></div>
        <button class="advanced-action" id="programmerConvert" type="button">Convert Bases</button>
        <div class="advanced-result" id="programmerResult">Enter an integer.</div>
        <div class="advanced-base-grid"><button type="button" data-base="2">BIN</button><button type="button" data-base="8">OCT</button><button type="button" data-base="10">DEC</button><button type="button" data-base="16">HEX</button></div>
      </div>`;
    calculator.insertBefore(panel, calculator.querySelector('.button-grid'));

    const title = panel.querySelector('#advancedFeatureTitle');
    const converterView = panel.querySelector('#converterView');
    const programmerView = panel.querySelector('#programmerView');
    const converterCategory = panel.querySelector('#converterCategory');
    const from = panel.querySelector('#converterFrom');
    const to = panel.querySelector('#converterTo');
    const value = panel.querySelector('#converterValue');
    const result = panel.querySelector('#converterResult');
    const units = {
      length:{meter:1,kilometer:1000,centimeter:.01,millimeter:.001,mile:1609.344,foot:.3048,inch:.0254},
      mass:{kilogram:1,gram:.001,milligram:.000001,pound:.45359237,ounce:.028349523125},
      speed:{'m/s':1,'km/h':1/3.6,mph:.44704,knot:.5144444444},
      data:{byte:1,kilobyte:1024,megabyte:1024**2,gigabyte:1024**3},
      temperature:{celsius:'temp',fahrenheit:'temp',kelvin:'temp'}
    };
    const label = key => key.replace(/(^|[-/])([a-z])/g,(_,a,b)=>a+b.toUpperCase());
    const populateUnits = () => {const category=converterCategory.value;const keys=Object.keys(units[category]);from.replaceChildren();to.replaceChildren();keys.forEach(k=>{from.add(new Option(label(k),k));to.add(new Option(label(k),k));});if(keys[1])to.value=keys[1];};
    const convertTemperature = (v, a, b) => {let c=a==='celsius'?v:a==='fahrenheit'?(v-32)*5/9:v-273.15;return b==='celsius'?c:b==='fahrenheit'?c*9/5+32:c+273.15;};
    const convert = () => {const n=Number(value.value);if(!Number.isFinite(n))return result.innerHTML='<span class="advanced-error">Enter a valid number.</span>';const category=converterCategory.value;let out;if(category==='temperature')out=convertTemperature(n,from.value,to.value);else out=n*units[category][from.value]/units[category][to.value];result.textContent=`${n} ${label(from.value)} = ${Number(out.toPrecision(12))} ${label(to.value)}`;};
    const open = feature => {
      document.querySelectorAll('.calculator .history-panel,.calculator .scientific-panel,.calculator .graph-panel,.calculator .statistics-panel,.calculator .calculator-tools,.calculator .memory-panel,.calculator .scientific-toggle').forEach(el=>{el.classList.remove('is-open');el.setAttribute('aria-hidden','true');});
      panel.classList.add('is-open');panel.setAttribute('aria-hidden','false');
      const isConverter=feature==='converter';title.textContent=isConverter?'Unit Converter':'Programmer Mode';converterView.hidden=!isConverter;programmerView.hidden=isConverter;
      document.getElementById('featureSidebar')?.classList.remove('is-open');document.getElementById('sidebarBackdrop')?.classList.remove('is-open');
      if(typeof anime==='function'&&!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches)anime({targets:panel,opacity:[0,1],translateY:[10,0],duration:260,easing:'easeOutCubic'});
    };
    list.addEventListener('click',event=>{const item=event.target.closest('[data-advanced-feature]');if(item){event.preventDefault();event.stopPropagation();open(item.dataset.advancedFeature);}});
    panel.querySelector('#advancedFeatureBack').addEventListener('click',()=>{panel.classList.remove('is-open');panel.setAttribute('aria-hidden','true');});
    converterCategory.addEventListener('change',populateUnits);panel.querySelector('#converterConvert').addEventListener('click',convert);value.addEventListener('keydown',e=>{if(e.key==='Enter')convert();});populateUnits();
    const pInput=panel.querySelector('#programmerInput'),pResult=panel.querySelector('#programmerResult');
    const baseName={2:'Binary',8:'Octal',10:'Decimal',16:'Hexadecimal'};
    const programmer=()=>{const n=Number(pInput.value);if(!Number.isInteger(n)||n<0||n>Number.MAX_SAFE_INTEGER)return pResult.innerHTML='<span class="advanced-error">Enter a non-negative safe integer.</span>';pResult.innerHTML=`<strong>BIN:</strong> ${n.toString(2)}<br><strong>OCT:</strong> ${n.toString(8)}<br><strong>DEC:</strong> ${n}<br><strong>HEX:</strong> ${n.toString(16).toUpperCase()}`;};
    panel.querySelector('#programmerConvert').addEventListener('click',programmer);pInput.addEventListener('keydown',e=>{if(e.key==='Enter')programmer();});
    panel.querySelectorAll('[data-base]').forEach(button=>button.addEventListener('click',()=>{const n=Number(pInput.value);if(!Number.isInteger(n)||n<0)return;pResult.textContent=`${baseName[Number(button.dataset.base)]}: ${n.toString(Number(button.dataset.base)).toUpperCase()}`;}));
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
