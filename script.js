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
        this.updateDisplay();
        this.animateEntrance();
    }

    initializeEventListeners() {
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('click', (e) => {
                this.handleButtonClick(e.currentTarget);
                this.animateButton(e.currentTarget);
            });
        });

        this.scientificToggle.addEventListener('click', () => this.toggleScientificMode());
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('contextmenu', (e) => e.preventDefault());
        });
    }

    toggleScientificMode() {
        const open = this.scientificPanel.classList.toggle('is-open');
        this.scientificPanel.setAttribute('aria-hidden', String(!open));
        this.scientificToggle.setAttribute('aria-expanded', String(open));
        this.scientificToggle.innerHTML = open
            ? '<i class="fas fa-flask"></i> Hide Scientific Mode'
            : '<i class="fas fa-flask"></i> Scientific Mode';

        if (typeof anime !== 'undefined' && open) {
            anime({
                targets: '.scientific-panel .btn',
                opacity: [0, 1],
                translateY: [-8, 0],
                scale: [.9, 1],
                duration: 300,
                delay: anime.stagger(30),
                easing: 'easeOutCubic'
            });
        }
    }

    animateEntrance() {
        if (typeof anime === 'undefined') return;
        anime({
            targets: '.calculator-header, .calculator, .calculator-footer',
            opacity: [0, 1],
            translateY: [24, 0],
            duration: 700,
            delay: anime.stagger(90),
            easing: 'easeOutCubic'
        });
        anime({
            targets: '.button-grid .btn',
            opacity: [0, 1],
            scale: [0.85, 1],
            duration: 450,
            delay: anime.stagger(35, { start: 250 }),
            easing: 'easeOutBack'
        });
    }

    animateButton(button) {
        if (!button || typeof anime === 'undefined') return;
        anime.remove(button);
        anime({
            targets: button,
            scale: [1, 0.9, 1.04, 1],
            duration: 300,
            easing: 'easeOutQuad'
        });
    }

    animateDisplay() {
        if (typeof anime === 'undefined') return;
        anime.remove(this.displayPrimary);
        anime({
            targets: this.displayPrimary,
            scale: [1, 1.035, 1],
            duration: 220,
            easing: 'easeOutQuad'
        });
    }

    animateResult() {
        if (typeof anime === 'undefined') return;
        anime.remove(this.displayPrimary);
        anime({
            targets: this.displayPrimary,
            scale: [0.9, 1.08, 1],
            opacity: [0.4, 1],
            duration: 500,
            easing: 'easeOutElastic(1, .6)'
        });
    }

    handleButtonClick(button) {
        const number = button.dataset.number;
        const action = button.dataset.action;
        if (number !== undefined) this.inputNumber(number);
        else if (action) this.handleAction(action);
    }

    handleKeyPress(event) {
        const key = event.key;
        if (/[0-9+\-*/.=]|Enter|Escape|Backspace/.test(key)) event.preventDefault();
        if (/[0-9]/.test(key)) {
            this.inputNumber(key);
            this.highlightButton(`[data-number="${key}"]`);
        }
        switch (key) {
            case '+': this.handleAction('add'); this.highlightButton('[data-action="add"]'); break;
            case '-': this.handleAction('subtract'); this.highlightButton('[data-action="subtract"]'); break;
            case '*': this.handleAction('multiply'); this.highlightButton('[data-action="multiply"]'); break;
            case '/': this.handleAction('divide'); this.highlightButton('[data-action="divide"]'); break;
            case '.': this.handleAction('decimal'); this.highlightButton('[data-action="decimal"]'); break;
            case '=':
            case 'Enter': this.handleAction('equals'); this.highlightButton('[data-action="equals"]'); break;
            case 'Escape': this.handleAction('clear-all'); this.highlightButton('[data-action="clear-all"]'); break;
            case 'Backspace': this.handleAction('backspace'); this.highlightButton('[data-action="backspace"]'); break;
            case 'c':
            case 'C': this.handleAction('clear'); this.highlightButton('[data-action="clear"]'); break;
        }
    }

    handleAction(action) {
        switch (action) {
            case 'add':
            case 'subtract':
            case 'multiply':
            case 'divide': this.handleOperator(action); break;
            case 'equals': this.calculate(); break;
            case 'decimal': this.inputDecimal(); break;
            case 'clear': this.clear(); break;
            case 'clear-all': this.clearAll(); break;
            case 'backspace': this.backspace(); break;
            case 'sin': this.scientificFunction('sin'); break;
            case 'cos': this.scientificFunction('cos'); break;
            case 'tan': this.scientificFunction('tan'); break;
            case 'log': this.scientificFunction('log'); break;
            case 'ln': this.scientificFunction('ln'); break;
            case 'sqrt': this.scientificFunction('sqrt'); break;
            case 'square': this.scientificFunction('square'); break;
            case 'reciprocal': this.scientificFunction('reciprocal'); break;
            case 'percent': this.scientificFunction('percent'); break;
            case 'pi': this.insertConstant(Math.PI, 'π'); break;
            case 'e': this.insertConstant(Math.E, 'e'); break;
            case 'factorial': this.scientificFunction('factorial'); break;
        }
    }

    scientificFunction(type) {
        this.cancelErrorReset();
        const value = parseFloat(this.currentInput);
        if (!Number.isFinite(value)) return this.showError('Invalid number');

        let result;
        switch (type) {
            case 'sin': result = Math.sin(this.toRadians(value)); break;
            case 'cos': result = Math.cos(this.toRadians(value)); break;
            case 'tan':
                if (Math.abs(Math.cos(this.toRadians(value))) < 1e-12) return this.showError('Undefined tan');
                result = Math.tan(this.toRadians(value));
                break;
            case 'log':
                if (value <= 0) return this.showError('log requires > 0');
                result = Math.log10(value);
                break;
            case 'ln':
                if (value <= 0) return this.showError('ln requires > 0');
                result = Math.log(value);
                break;
            case 'sqrt':
                if (value < 0) return this.showError('√ requires ≥ 0');
                result = Math.sqrt(value);
                break;
            case 'square': result = value ** 2; break;
            case 'reciprocal':
                if (value === 0) return this.showError('Cannot divide by zero');
                result = 1 / value;
                break;
            case 'percent': result = value / 100; break;
            case 'factorial':
                if (!Number.isInteger(value) || value < 0 || value > 170) return this.showError('Use an integer 0–170');
                result = 1;
                for (let i = 2; i <= value; i++) result *= i;
                break;
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

    toRadians(degrees) { return degrees * Math.PI / 180; }

    roundResult(result) {
        if (!Number.isFinite(result)) return result;
        return Math.round((result + Number.EPSILON) * 100000000) / 100000000;
    }

    inputNumber(digit) {
        this.cancelErrorReset();
        if (this.waitingForOperand) {
            this.currentInput = digit;
            this.waitingForOperand = false;
        } else if (this.justCalculated) {
            this.currentInput = digit;
            this.justCalculated = false;
            this.clearSecondaryDisplay();
        } else {
            this.currentInput = this.currentInput === '0' ? digit : this.currentInput + digit;
        }
        this.updateDisplay();
    }

    inputDecimal() {
        this.cancelErrorReset();
        if (this.waitingForOperand) {
            this.currentInput = '0.';
            this.waitingForOperand = false;
        } else if (this.justCalculated) {
            this.currentInput = '0.';
            this.justCalculated = false;
            this.clearSecondaryDisplay();
        } else if (!this.currentInput.includes('.')) {
            this.currentInput += '.';
        }
        this.updateDisplay();
    }

    handleOperator(nextOperator) {
        this.cancelErrorReset();
        const inputValue = parseFloat(this.currentInput);
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
        const prev = parseFloat(this.previousInput);
        const current = parseFloat(this.currentInput);
        if (isNaN(prev) || isNaN(current)) return null;
        let result;
        switch (this.operator) {
            case 'add': result = prev + current; break;
            case 'subtract': result = prev - current; break;
            case 'multiply': result = prev * current; break;
            case 'divide':
                if (current === 0) { this.showError('Cannot divide by zero'); return null; }
                result = prev / current;
                break;
            default: return null;
        }
        return this.roundResult(result);
    }

    calculate() {
        this.cancelErrorReset();
        if (this.operator && this.previousInput !== '' && !this.waitingForOperand) {
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
    }

    clear() { this.cancelErrorReset(); this.currentInput = '0'; this.updateDisplay(); }

    clearAll() {
        this.cancelErrorReset();
        this.currentInput = '0';
        this.previousInput = '';
        this.operator = null;
        this.waitingForOperand = false;
        this.justCalculated = false;
        this.clearSecondaryDisplay();
        this.updateDisplay();
    }

    backspace() {
        this.cancelErrorReset();
        if (this.justCalculated) return;
        this.currentInput = this.currentInput.length > 1 ? this.currentInput.slice(0, -1) : '0';
        this.updateDisplay();
    }

    updateDisplay() {
        this.displayPrimary.textContent = this.formatNumber(this.currentInput);
        this.displayPrimary.classList.remove('display-error');
        this.animateDisplay();
    }

    updateSecondaryDisplay(showResult = false) {
        if (showResult && this.operator && this.previousInput !== '') {
            const symbol = this.getOperatorSymbol(this.operator);
            this.displaySecondary.textContent = `${this.formatNumber(this.previousInput)} ${symbol} ${this.formatNumber(this.currentInput)} =`;
        } else if (this.operator && this.previousInput !== '') {
            const symbol = this.getOperatorSymbol(this.operator);
            this.displaySecondary.textContent = `${this.formatNumber(this.previousInput)} ${symbol}`;
        }
    }

    clearSecondaryDisplay() { this.displaySecondary.textContent = ''; }

    getOperatorSymbol(operator) {
        switch (operator) {
            case 'add': return '+';
            case 'subtract': return '−';
            case 'multiply': return '×';
            case 'divide': return '÷';
            default: return '';
        }
    }

    formatNumber(num) {
        const number = parseFloat(num);
        if (isNaN(number)) return '0';
        if (Math.abs(number) >= 1e10 || (Math.abs(number) < 1e-6 && number !== 0)) return number.toExponential(6);
        return number.toLocaleString('en-US', { maximumFractionDigits: 8, useGrouping: false });
    }

    showError(message) {
        this.cancelErrorReset();
        this.displayPrimary.textContent = 'Error';
        this.displayPrimary.classList.add('display-error');
        this.displaySecondary.textContent = message;
        this.errorTimeout = setTimeout(() => {
            this.errorTimeout = null;
            this.clearAll();
        }, 2000);
    }

    cancelErrorReset() {
        if (this.errorTimeout !== null) {
            clearTimeout(this.errorTimeout);
            this.errorTimeout = null;
        }
    }

    highlightButton(selector) {
        const button = document.querySelector(selector);
        if (button) this.animateButton(button);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Calculator();
});
