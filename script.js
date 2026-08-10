class Calculator {
    constructor() {
        this.displayPrimary = document.getElementById('displayPrimary');
        this.displaySecondary = document.getElementById('displaySecondary');
        this.scientificToggle = document.getElementById('scientificToggle');
        this.scientificPanel = document.getElementById('scientificPanel');
        this.currentInput = '0';
        this.previousInput = '';
        this.operator = null;
        this.waitingForOperand = false;
        this.justCalculated = false;
        this.errorTimeout = null;
        this.initializeEventListeners();
        this.updateDisplay(false);
        this.animateEntrance();
    }

    initializeEventListeners() {
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('click', event => {
                this.handleButtonClick(event.currentTarget);
                this.animateButton(event.currentTarget);
            });
        });
        this.scientificToggle?.addEventListener('click', () => this.toggleScientificMode());
        document.addEventListener('keydown', event => this.handleKeyPress(event));
    }

    toggleScientificMode() {
        const open = this.scientificPanel.classList.toggle('is-open');
        this.scientificPanel.setAttribute('aria-hidden', String(!open));
        this.scientificToggle.setAttribute('aria-expanded', String(open));
        this.scientificToggle.innerHTML = open
            ? '<i class="fas fa-flask"></i> Hide Scientific Mode'
            : '<i class="fas fa-flask"></i> Scientific Mode';
        if (open && typeof anime !== 'undefined') {
            anime({ targets: '.scientific-panel .btn', opacity: [0, 1], translateY: [-8, 0], scale: [.9, 1], duration: 300, delay: anime.stagger(30), easing: 'easeOutCubic' });
        }
    }

    animateEntrance() {
        if (typeof anime === 'undefined') return;
        anime({ targets: '.calculator-header, .calculator, .calculator-footer', opacity: [0, 1], translateY: [24, 0], duration: 700, delay: anime.stagger(90), easing: 'easeOutCubic' });
        anime({ targets: '.button-grid .btn', opacity: [0, 1], scale: [.85, 1], duration: 450, delay: anime.stagger(35, { start: 250 }), easing: 'easeOutBack' });
    }

    animateButton(button) {
        if (!button || typeof anime === 'undefined') return;
        anime.remove(button);
        anime({ targets: button, scale: [1, .9, 1.04, 1], duration: 300, easing: 'easeOutQuad' });
    }

    animateDisplay() {
        if (typeof anime === 'undefined') return;
        anime.remove(this.displayPrimary);
        anime({ targets: this.displayPrimary, scale: [1, 1.025, 1], duration: 180, easing: 'easeOutQuad' });
    }

    animateResult() {
        if (typeof anime === 'undefined') return;
        anime.remove(this.displayPrimary);
        anime({ targets: this.displayPrimary, scale: [.9, 1.08, 1], opacity: [.4, 1], duration: 500, easing: 'easeOutElastic(1, .6)' });
    }

    handleButtonClick(button) {
        const number = button.dataset.number;
        const action = button.dataset.action;
        if (number !== undefined) this.inputNumber(number);
        else if (action) this.handleAction(action);
    }

    handleKeyPress(event) {
        const key = event.key;
        if (/^[0-9+\-*/.=]$/.test(key) || ['Enter', 'Escape', 'Backspace'].includes(key)) event.preventDefault();
        if (/^[0-9]$/.test(key)) {
            this.inputNumber(key);
            this.highlightButton(`[data-number="${key}"]`);
            return;
        }
        const actions = { '+': 'add', '-': 'subtract', '*': 'multiply', '/': 'divide', '.': 'decimal', '=': 'equals', Enter: 'equals', Escape: 'clear-all', Backspace: 'backspace', c: 'clear', C: 'clear' };
        if (actions[key]) {
            this.handleAction(actions[key]);
            this.highlightButton(`[data-action="${actions[key]}"]`);
        }
    }

    handleAction(action) {
        switch (action) {
            case 'add': case 'subtract': case 'multiply': case 'divide': this.handleOperator(action); break;
            case 'equals': this.calculate(); break;
            case 'decimal': this.inputDecimal(); break;
            case 'clear': this.clear(); break;
            case 'clear-all': this.clearAll(); break;
            case 'backspace': this.backspace(); break;
            case 'sin': case 'cos': case 'tan': case 'log': case 'ln': case 'sqrt': case 'square': case 'reciprocal': case 'percent': case 'factorial': this.scientificFunction(action); break;
            case 'pi': this.insertConstant(Math.PI, 'π'); break;
            case 'e': this.insertConstant(Math.E, 'e'); break;
        }
    }

    scientificFunction(type) {
        this.cancelErrorReset();
        const value = Number(this.currentInput);
        if (!Number.isFinite(value)) return this.showError('Invalid number');
        let result;
        switch (type) {
            case 'sin': result = Math.sin(value * Math.PI / 180); break;
            case 'cos': result = Math.cos(value * Math.PI / 180); break;
            case 'tan': {
                const radians = value * Math.PI / 180;
                if (Math.abs(Math.cos(radians)) < 1e-12) return this.showError('Undefined tan');
                result = Math.tan(radians); break;
            }
            case 'log': if (value <= 0) return this.showError('log requires > 0'); result = Math.log10(value); break;
            case 'ln': if (value <= 0) return this.showError('ln requires > 0'); result = Math.log(value); break;
            case 'sqrt': if (value < 0) return this.showError('√ requires ≥ 0'); result = Math.sqrt(value); break;
            case 'square': result = value ** 2; break;
            case 'reciprocal': if (value === 0) return this.showError('Cannot divide by zero'); result = 1 / value; break;
            case 'percent': result = value / 100; break;
            case 'factorial':
                if (!Number.isInteger(value) || value < 0 || value > 170) return this.showError('Use an integer 0–170');
                result = 1; for (let i = 2; i <= value; i++) result *= i; break;
            default: return;
        }
        this.currentInput = String(this.roundResult(result));
        this.justCalculated = true;
        this.waitingForOperand = false;
        this.clearSecondaryDisplay();
        this.updateDisplay();
        this.animateResult();
    }

    insertConstant(value, symbol) {
        this.cancelErrorReset();
        this.currentInput = String(this.roundResult(value));
        this.justCalculated = true;
        this.waitingForOperand = false;
        this.displaySecondary.textContent = symbol;
        this.updateDisplay();
    }

    roundResult(result) {
        if (!Number.isFinite(result)) return result;
        return Math.round((result + Number.EPSILON) * 100000000) / 100000000;
    }

    inputNumber(digit) {
        this.cancelErrorReset();
        const startingNewValue = this.waitingForOperand || this.justCalculated;
        if (startingNewValue) {
            this.currentInput = digit;
            this.waitingForOperand = false;
            this.justCalculated = false;
            if (!this.operator) this.clearSecondaryDisplay();
        } else {
            this.currentInput = this.currentInput === '0' ? digit : this.currentInput + digit;
        }
        this.updateDisplay();
    }

    inputDecimal() {
        this.cancelErrorReset();
        if (this.waitingForOperand || this.justCalculated) {
            this.currentInput = '0.';
            this.waitingForOperand = false;
            this.justCalculated = false;
            this.clearSecondaryDisplay();
        } else if (!this.currentInput.includes('.')) {
            this.currentInput += '.';
        }
        this.updateDisplay();
    }

    handleOperator(nextOperator) {
        this.cancelErrorReset();
        const inputValue = Number(this.currentInput);
        if (!Number.isFinite(inputValue)) return this.showError('Invalid number');
        if (this.previousInput === '') this.previousInput = inputValue;
        else if (this.operator && !this.waitingForOperand) {
            const result = this.performCalculation();
            if (result === null) return;
            this.currentInput = String(result);
            this.previousInput = result;
        }
        this.waitingForOperand = true;
        this.operator = nextOperator;
        this.justCalculated = false;
        this.updateSecondaryDisplay();
        this.updateDisplay();
    }

    performCalculation() {
        const prev = Number(this.previousInput), current = Number(this.currentInput);
        if (!Number.isFinite(prev) || !Number.isFinite(current)) return null;
        let result;
        switch (this.operator) {
            case 'add': result = prev + current; break;
            case 'subtract': result = prev - current; break;
            case 'multiply': result = prev * current; break;
            case 'divide': if (current === 0) { this.showError('Cannot divide by zero'); return null; } result = prev / current; break;
            default: return null;
        }
        return this.roundResult(result);
    }

    calculate() {
        this.cancelErrorReset();
        if (!this.operator || this.previousInput === '' || this.waitingForOperand) return;
        const result = this.performCalculation();
        if (result === null) return;
        this.updateSecondaryDisplay(true);
        this.currentInput = String(result);
        this.previousInput = '';
        this.operator = null;
        this.waitingForOperand = false;
        this.justCalculated = true;
        this.updateDisplay();
        this.animateResult();
    }

    clear() { this.cancelErrorReset(); this.currentInput = '0'; this.updateDisplay(); }

    clearAll() {
        this.cancelErrorReset();
        this.currentInput = '0'; this.previousInput = ''; this.operator = null;
        this.waitingForOperand = false; this.justCalculated = false;
        this.clearSecondaryDisplay(); this.updateDisplay();
    }

    backspace() {
        this.cancelErrorReset();
        if (this.justCalculated || this.waitingForOperand) return;
        this.currentInput = this.currentInput.length > 1 ? this.currentInput.slice(0, -1) : '0';
        this.updateDisplay();
    }

    updateDisplay(animate = true) {
        this.displayPrimary.textContent = this.formatNumber(this.currentInput);
        this.displayPrimary.classList.remove('display-error');
        if (animate) this.animateDisplay();
    }

    updateSecondaryDisplay(showResult = false) {
        if (showResult && this.operator && this.previousInput !== '') {
            this.displaySecondary.textContent = `${this.formatNumber(this.previousInput)} ${this.getOperatorSymbol(this.operator)} ${this.formatNumber(this.currentInput)} =`;
        } else if (this.operator && this.previousInput !== '') {
            this.displaySecondary.textContent = `${this.formatNumber(this.previousInput)} ${this.getOperatorSymbol(this.operator)}`;
        }
    }

    clearSecondaryDisplay() { this.displaySecondary.textContent = ''; }
    getOperatorSymbol(operator) { return { add: '+', subtract: '−', multiply: '×', divide: '÷' }[operator] || ''; }

    formatNumber(value) {
        const number = Number(value);
        if (!Number.isFinite(number)) return 'Error';
        if (Math.abs(number) >= 1e10 || (Math.abs(number) < 1e-6 && number !== 0)) return number.toExponential(6);
        return number.toLocaleString('en-US', { maximumFractionDigits: 8, useGrouping: false });
    }

    showError(message) {
        this.cancelErrorReset();
        this.displayPrimary.textContent = 'Error';
        this.displayPrimary.classList.add('display-error');
        this.displaySecondary.textContent = message;
        this.errorTimeout = setTimeout(() => { this.errorTimeout = null; this.clearAll(); }, 2000);
    }

    cancelErrorReset() {
        if (this.errorTimeout !== null) { clearTimeout(this.errorTimeout); this.errorTimeout = null; }
    }

    highlightButton(selector) {
        const button = document.querySelector(selector);
        if (button) this.animateButton(button);
    }
}

document.addEventListener('DOMContentLoaded', () => new Calculator());
