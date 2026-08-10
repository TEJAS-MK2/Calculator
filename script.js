class Calculator {
    constructor() {
        this.displayPrimary = document.getElementById('displayPrimary');
        this.displaySecondary = document.getElementById('displaySecondary');
        this.scientificToggle = document.getElementById('scientificToggle');
        this.scientificPanel = document.getElementById('scientificPanel');
        this.historyToggle = document.getElementById('historyToggle');
        this.historyPanel = document.getElementById('historyPanel');
        this.historyList = document.getElementById('historyList');
        this.historyCount = document.getElementById('historyCount');
        this.clearHistoryButton = document.getElementById('clearHistory');
        this.memoryValueElement = document.getElementById('memoryValue');
        this.history = this.loadHistory();
        this.memory = this.loadMemory();
        this.currentInput = '0';
        this.previousInput = '';
        this.operator = null;
        this.waitingForOperand = false;
        this.justCalculated = false;
        this.errorTimeout = null;
        this.initializeEventListeners();
        this.renderHistory();
        this.updateMemoryDisplay();
        this.updateDisplay(false);
        this.animateEntrance();
    }

    initializeEventListeners() {
        document.querySelectorAll('.btn, .memory-button').forEach(button => {
            button.addEventListener('click', event => {
                this.handleButtonClick(event.currentTarget);
                this.animateButton(event.currentTarget);
            });
        });
        this.scientificToggle?.addEventListener('click', () => this.toggleScientificMode());
        this.historyToggle?.addEventListener('click', () => this.toggleHistory());
        this.clearHistoryButton?.addEventListener('click', () => this.clearHistory());
        document.addEventListener('keydown', event => this.handleKeyPress(event));
    }

    loadHistory() {
        try { const saved = JSON.parse(localStorage.getItem('calculatorHistory') || '[]'); return Array.isArray(saved) ? saved.slice(0, 50) : []; }
        catch { return []; }
    }

    saveHistory() { try { localStorage.setItem('calculatorHistory', JSON.stringify(this.history)); } catch {} }

    loadMemory() {
        try {
            const value = Number(localStorage.getItem('calculatorMemory') || '0');
            return Number.isFinite(value) ? value : 0;
        } catch { return 0; }
    }

    saveMemory() { try { localStorage.setItem('calculatorMemory', String(this.memory)); } catch {} }

    updateMemoryDisplay() {
        if (this.memoryValueElement) this.memoryValueElement.textContent = this.formatNumber(this.memory);
    }

    memoryAction(action) {
        this.cancelErrorReset();
        const value = Number(this.currentInput);
        switch (action) {
            case 'memory-clear':
                this.memory = 0;
                break;
            case 'memory-recall':
                this.currentInput = String(this.memory);
                this.justCalculated = true;
                this.waitingForOperand = false;
                break;
            case 'memory-add':
                if (!Number.isFinite(value)) return this.showError('Invalid number');
                this.memory = this.roundResult(this.memory + value);
                break;
            case 'memory-subtract':
                if (!Number.isFinite(value)) return this.showError('Invalid number');
                this.memory = this.roundResult(this.memory - value);
                break;
            case 'memory-store':
                if (!Number.isFinite(value)) return this.showError('Invalid number');
                this.memory = this.roundResult(value);
                break;
            default: return;
        }
        this.saveMemory();
        this.updateMemoryDisplay();
        if (action === 'memory-recall') this.updateDisplay();
    }

    addHistory(expression, result) {
        this.history.unshift({ expression, result: String(result), time: Date.now() });
        this.history = this.history.slice(0, 50);
        this.saveHistory();
        this.renderHistory();
    }

    renderHistory() {
        if (!this.historyList || !this.historyCount) return;
        this.historyCount.textContent = String(this.history.length);
        if (!this.history.length) { this.historyList.innerHTML = '<div class="history-empty">No calculations yet</div>'; return; }
        this.historyList.innerHTML = this.history.map((item, index) => `
            <button class="history-item" type="button" data-history-index="${index}" aria-label="Reuse ${this.escapeHtml(item.expression)}">
                <span class="history-expression">${this.escapeHtml(item.expression)}</span>
                <span class="history-result">= ${this.escapeHtml(this.formatNumber(item.result))}</span>
            </button>`).join('');
        this.historyList.querySelectorAll('[data-history-index]').forEach(item => item.addEventListener('click', () => {
            const entry = this.history[Number(item.dataset.historyIndex)];
            if (!entry) return;
            this.currentInput = entry.result; this.previousInput = ''; this.operator = null; this.waitingForOperand = false; this.justCalculated = true;
            this.clearSecondaryDisplay(); this.updateDisplay(); this.toggleHistory(false); this.animateResult();
        }));
    }

    escapeHtml(value) { return String(value).replace(/[&<>'"]/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' }[char])); }

    toggleHistory(force) {
        const open = typeof force === 'boolean' ? force : !this.historyPanel.classList.contains('is-open');
        this.historyPanel.classList.toggle('is-open', open); this.historyPanel.setAttribute('aria-hidden', String(!open)); this.historyToggle.setAttribute('aria-expanded', String(open));
        if (open && typeof anime !== 'undefined') anime({ targets: '.history-item, .history-empty', opacity: [0,1], translateX: [-8,0], duration: 250, delay: anime.stagger(25), easing: 'easeOutCubic' });
    }

    clearHistory() { this.history = []; this.saveHistory(); this.renderHistory(); }

    toggleScientificMode() {
        const open = this.scientificPanel.classList.toggle('is-open');
        this.scientificPanel.setAttribute('aria-hidden', String(!open)); this.scientificToggle.setAttribute('aria-expanded', String(open));
        this.scientificToggle.innerHTML = open ? '<i class="fas fa-flask"></i> Hide Scientific Mode' : '<i class="fas fa-flask"></i> Scientific Mode';
        if (open && typeof anime !== 'undefined') anime({ targets: '.scientific-panel .btn', opacity: [0,1], translateY: [-8,0], scale: [.9,1], duration: 300, delay: anime.stagger(30), easing: 'easeOutCubic' });
    }

    animateEntrance() {
        if (typeof anime === 'undefined') return;
        anime({ targets: '.calculator-header, .calculator, .calculator-footer', opacity: [0,1], translateY: [24,0], duration: 700, delay: anime.stagger(90), easing: 'easeOutCubic' });
        anime({ targets: '.button-grid .btn, .memory-button', opacity: [0,1], scale: [.85,1], duration: 450, delay: anime.stagger(30, { start: 250 }), easing: 'easeOutBack' });
    }

    animateButton(button) { if (!button || typeof anime === 'undefined') return; anime.remove(button); anime({ targets: button, scale: [1,.9,1.04,1], duration: 300, easing: 'easeOutQuad' }); }
    animateDisplay() { if (typeof anime === 'undefined') return; anime.remove(this.displayPrimary); anime({ targets: this.displayPrimary, scale: [1,1.025,1], duration: 180, easing: 'easeOutQuad' }); }
    animateResult() { if (typeof anime === 'undefined') return; anime.remove(this.displayPrimary); anime({ targets: this.displayPrimary, scale: [.9,1.08,1], opacity: [.4,1], duration: 500, easing: 'easeOutElastic(1,.6)' }); }

    handleButtonClick(button) {
        const number = button.dataset.number, action = button.dataset.action;
        if (number !== undefined) this.inputNumber(number);
        else if (action) this.handleAction(action);
    }

    handleKeyPress(event) {
        const key = event.key;
        if (/^[0-9+\-*/.=]$/.test(key) || ['Enter','Escape','Backspace'].includes(key)) event.preventDefault();
        if (/^[0-9]$/.test(key)) { this.inputNumber(key); this.highlightButton(`[data-number="${key}"]`); return; }
        const actions = { '+':'add','-':'subtract','*':'multiply','/':'divide','.':'decimal','=':'equals',Enter:'equals',Escape:'clear-all',Backspace:'backspace',c:'clear',C:'clear' };
        if (actions[key]) { this.handleAction(actions[key]); this.highlightButton(`[data-action="${actions[key]}"]`); }
    }

    handleAction(action) {
        if (action.startsWith('memory-')) return this.memoryAction(action);
        switch (action) {
            case 'add': case 'subtract': case 'multiply': case 'divide': this.handleOperator(action); break;
            case 'equals': this.calculate(); break; case 'decimal': this.inputDecimal(); break; case 'clear': this.clear(); break; case 'clear-all': this.clearAll(); break; case 'backspace': this.backspace(); break;
            case 'sin': case 'cos': case 'tan': case 'log': case 'ln': case 'sqrt': case 'square': case 'reciprocal': case 'percent': case 'factorial': this.scientificFunction(action); break;
            case 'pi': this.insertConstant(Math.PI, 'π'); break; case 'e': this.insertConstant(Math.E, 'e'); break;
        }
    }

    scientificFunction(type) {
        this.cancelErrorReset(); const value = Number(this.currentInput); if (!Number.isFinite(value)) return this.showError('Invalid number'); let result;
        switch(type) {
            case 'sin': result=Math.sin(value*Math.PI/180); break; case 'cos': result=Math.cos(value*Math.PI/180); break;
            case 'tan': { const radians=value*Math.PI/180; if(Math.abs(Math.cos(radians))<1e-12)return this.showError('Undefined tan'); result=Math.tan(radians); break; }
            case 'log': if(value<=0)return this.showError('log requires > 0'); result=Math.log10(value); break;
            case 'ln': if(value<=0)return this.showError('ln requires > 0'); result=Math.log(value); break;
            case 'sqrt': if(value<0)return this.showError('√ requires ≥ 0'); result=Math.sqrt(value); break; case 'square': result=value**2; break;
            case 'reciprocal': if(value===0)return this.showError('Cannot divide by zero'); result=1/value; break; case 'percent': result=value/100; break;
            case 'factorial': if(!Number.isInteger(value)||value<0||value>170)return this.showError('Use an integer 0–170'); result=1; for(let i=2;i<=value;i++)result*=i; break; default:return;
        }
        this.currentInput=String(this.roundResult(result)); this.justCalculated=true; this.waitingForOperand=false; this.clearSecondaryDisplay(); this.updateDisplay(); this.animateResult();
    }

    insertConstant(value,symbol){this.cancelErrorReset();this.currentInput=String(this.roundResult(value));this.justCalculated=true;this.waitingForOperand=false;this.displaySecondary.textContent=symbol;this.updateDisplay();}
    roundResult(result){if(!Number.isFinite(result))return result;return Math.round((result+Number.EPSILON)*100000000)/100000000;}
    inputNumber(digit){this.cancelErrorReset();const startingNewValue=this.waitingForOperand||this.justCalculated;if(startingNewValue){this.currentInput=digit;this.waitingForOperand=false;this.justCalculated=false;if(!this.operator)this.clearSecondaryDisplay();}else this.currentInput=this.currentInput==='0'?digit:this.currentInput+digit;this.updateDisplay();}
    inputDecimal(){this.cancelErrorReset();if(this.waitingForOperand||this.justCalculated){this.currentInput='0.';this.waitingForOperand=false;this.justCalculated=false;this.clearSecondaryDisplay();}else if(!this.currentInput.includes('.'))this.currentInput+='.';this.updateDisplay();}
    handleOperator(nextOperator){this.cancelErrorReset();const inputValue=Number(this.currentInput);if(!Number.isFinite(inputValue))return this.showError('Invalid number');if(this.previousInput==='')this.previousInput=inputValue;else if(this.operator&&!this.waitingForOperand){const result=this.performCalculation();if(result===null)return;this.currentInput=String(result);this.previousInput=result;}this.waitingForOperand=true;this.operator=nextOperator;this.justCalculated=false;this.updateSecondaryDisplay();this.updateDisplay();}
    performCalculation(){const prev=Number(this.previousInput),current=Number(this.currentInput);if(!Number.isFinite(prev)||!Number.isFinite(current))return null;let result;switch(this.operator){case'add':result=prev+current;break;case'subtract':result=prev-current;break;case'multiply':result=prev*current;break;case'divide':if(current===0){this.showError('Cannot divide by zero');return null;}result=prev/current;break;default:return null;}return this.roundResult(result);}
    calculate(){this.cancelErrorReset();if(!this.operator||this.previousInput===''||this.waitingForOperand)return;const left=this.formatNumber(this.previousInput),right=this.formatNumber(this.currentInput),symbol=this.getOperatorSymbol(this.operator),result=this.performCalculation();if(result===null)return;this.addHistory(`${left} ${symbol} ${right}`,result);this.updateSecondaryDisplay(true);this.currentInput=String(result);this.previousInput='';this.operator=null;this.waitingForOperand=false;this.justCalculated=true;this.updateDisplay();this.animateResult();}
    clear(){this.cancelErrorReset();this.currentInput='0';this.updateDisplay();}
    clearAll(){this.cancelErrorReset();this.currentInput='0';this.previousInput='';this.operator=null;this.waitingForOperand=false;this.justCalculated=false;this.clearSecondaryDisplay();this.updateDisplay();}
    backspace(){this.cancelErrorReset();if(this.justCalculated||this.waitingForOperand)return;this.currentInput=this.currentInput.length>1?this.currentInput.slice(0,-1):'0';this.updateDisplay();}
    updateDisplay(animate=true){this.displayPrimary.textContent=this.formatNumber(this.currentInput);this.displayPrimary.classList.remove('display-error');if(animate)this.animateDisplay();}
    updateSecondaryDisplay(showResult=false){if(showResult&&this.operator&&this.previousInput!=='')this.displaySecondary.textContent=`${this.formatNumber(this.previousInput)} ${this.getOperatorSymbol(this.operator)} ${this.formatNumber(this.currentInput)} =`;else if(this.operator&&this.previousInput!=='')this.displaySecondary.textContent=`${this.formatNumber(this.previousInput)} ${this.getOperatorSymbol(this.operator)}`;}
    clearSecondaryDisplay(){this.displaySecondary.textContent='';}
    getOperatorSymbol(operator){return{add:'+',subtract:'−',multiply:'×',divide:'÷'}[operator]||'';}
    formatNumber(value){const number=Number(value);if(!Number.isFinite(number))return'Error';if(Math.abs(number)>=1e10||(Math.abs(number)<1e-6&&number!==0))return number.toExponential(6);return number.toLocaleString('en-US',{maximumFractionDigits:8,useGrouping:false});}
    showError(message){this.cancelErrorReset();this.displayPrimary.textContent='Error';this.displayPrimary.classList.add('display-error');this.displaySecondary.textContent=message;this.errorTimeout=setTimeout(()=>{this.errorTimeout=null;this.clearAll();},2000);}
    cancelErrorReset(){if(this.errorTimeout!==null){clearTimeout(this.errorTimeout);this.errorTimeout=null;}}
    highlightButton(selector){const button=document.querySelector(selector);if(button)this.animateButton(button);}
}

document.addEventListener('DOMContentLoaded',()=>new Calculator());
