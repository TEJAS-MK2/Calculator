class Calculator {
    constructor() {
        this.displayPrimary = document.getElementById('displayPrimary');
        this.displaySecondary = document.getElementById('displaySecondary');
        this.currentInput = '0'; this.previousInput = ''; this.operator = null;
        this.waitingForOperand = false; this.justCalculated = false; this.errorTimeout = null;
        this.initializeEventListeners(); this.updateDisplay();
    }
    initializeEventListeners() {
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('click', e => { this.handleButtonClick(e.currentTarget); this.addButtonAnimation(e.currentTarget); });
            button.addEventListener('contextmenu', e => e.preventDefault());
        });
        document.addEventListener('keydown', e => this.handleKeyPress(e));
    }
    handleButtonClick(button) {
        const number = button.dataset.number, action = button.dataset.action;
        if (number !== undefined) this.inputNumber(number); else if (action) this.handleAction(action);
    }
    handleKeyPress(event) {
        const key = event.key;
        if (/[0-9+\-*/.=]|Enter|Escape|Backspace/.test(key)) event.preventDefault();
        if (/[0-9]/.test(key)) { this.inputNumber(key); this.highlightButton(`[data-number="${key}"]`); }
        switch (key) {
            case '+': this.handleAction('add'); this.highlightButton('[data-action="add"]'); break;
            case '-': this.handleAction('subtract'); this.highlightButton('[data-action="subtract"]'); break;
            case '*': this.handleAction('multiply'); this.highlightButton('[data-action="multiply"]'); break;
            case '/': this.handleAction('divide'); this.highlightButton('[data-action="divide"]'); break;
            case '.': this.handleAction('decimal'); this.highlightButton('[data-action="decimal"]'); break;
            case '=': case 'Enter': this.handleAction('equals'); this.highlightButton('[data-action="equals"]'); break;
            case 'Escape': this.handleAction('clear-all'); this.highlightButton('[data-action="clear-all"]'); break;
            case 'Backspace': this.handleAction('backspace'); this.highlightButton('[data-action="backspace"]'); break;
            case 'c': case 'C': this.handleAction('clear'); this.highlightButton('[data-action="clear"]'); break;
        }
    }
    handleAction(action) {
        switch (action) {
            case 'add': case 'subtract': case 'multiply': case 'divide': this.handleOperator(action); break;
            case 'equals': this.calculate(); break; case 'decimal': this.inputDecimal(); break;
            case 'clear': this.clear(); break; case 'clear-all': this.clearAll(); break; case 'backspace': this.backspace(); break;
        }
    }
    inputNumber(digit) {
        this.cancelErrorReset();
        if (this.waitingForOperand) { this.currentInput = digit; this.waitingForOperand = false; }
        else if (this.justCalculated) { this.currentInput = digit; this.justCalculated = false; this.clearSecondaryDisplay(); }
        else this.currentInput = this.currentInput === '0' ? digit : this.currentInput + digit;
        this.updateDisplay();
    }
    inputDecimal() {
        this.cancelErrorReset();
        if (this.waitingForOperand) { this.currentInput = '0.'; this.waitingForOperand = false; }
        else if (this.justCalculated) { this.currentInput = '0.'; this.justCalculated = false; this.clearSecondaryDisplay(); }
        else if (!this.currentInput.includes('.')) this.currentInput += '.';
        this.updateDisplay();
    }
    handleOperator(nextOperator) {
        this.cancelErrorReset(); const inputValue = parseFloat(this.currentInput);
        if (this.previousInput === '') this.previousInput = inputValue;
        else if (this.operator && !this.waitingForOperand) { const result = this.performCalculation(); if (result === null) return; this.currentInput = String(result); this.previousInput = result; }
        this.waitingForOperand = true; this.operator = nextOperator; this.justCalculated = false;
        this.updateSecondaryDisplay(); this.updateDisplay();
    }
    performCalculation() {
        const prev = parseFloat(this.previousInput), current = parseFloat(this.currentInput); if (isNaN(prev) || isNaN(current)) return null;
        let result; switch (this.operator) {
            case 'add': result = prev + current; break; case 'subtract': result = prev - current; break;
            case 'multiply': result = prev * current; break;
            case 'divide': if (current === 0) { this.showError('Cannot divide by zero'); return null; } result = prev / current; break;
            default: return null;
        }
        return Math.round((result + Number.EPSILON) * 100000000) / 100000000;
    }
    calculate() {
        this.cancelErrorReset();
        if (this.operator && this.previousInput !== '' && !this.waitingForOperand) {
            const result = this.performCalculation(); if (result === null) return;
            this.updateSecondaryDisplay(true); this.currentInput = String(result); this.previousInput = ''; this.operator = null;
            this.waitingForOperand = false; this.justCalculated = true; this.updateDisplay();
        }
    }
    clear() { this.cancelErrorReset(); this.currentInput = '0'; this.updateDisplay(); }
    clearAll() { this.cancelErrorReset(); this.currentInput = '0'; this.previousInput = ''; this.operator = null; this.waitingForOperand = false; this.justCalculated = false; this.clearSecondaryDisplay(); this.updateDisplay(); }
    backspace() { this.cancelErrorReset(); if (this.justCalculated) return; this.currentInput = this.currentInput.length > 1 ? this.currentInput.slice(0, -1) : '0'; this.updateDisplay(); }
    updateDisplay() { this.displayPrimary.textContent = this.formatNumber(this.currentInput); this.displayPrimary.classList.remove('display-error'); }
    updateSecondaryDisplay(showResult = false) {
        if (showResult && this.operator && this.previousInput !== '') this.displaySecondary.textContent = `${this.formatNumber(this.previousInput)} ${this.getOperatorSymbol(this.operator)} ${this.formatNumber(this.currentInput)} =`;
        else if (this.operator && this.previousInput !== '') this.displaySecondary.textContent = `${this.formatNumber(this.previousInput)} ${this.getOperatorSymbol(this.operator)}`;
    }
    clearSecondaryDisplay() { this.displaySecondary.textContent = ''; }
    getOperatorSymbol(operator) { switch (operator) { case 'add': return '+'; case 'subtract': return '−'; case 'multiply': return '×'; case 'divide': return '÷'; default: return ''; } }
    formatNumber(num) { const number = parseFloat(num); if (isNaN(number)) return '0'; if (Math.abs(number) >= 1e10 || (Math.abs(number) < 1e-6 && number !== 0)) return number.toExponential(6); return number.toLocaleString('en-US', { maximumFractionDigits: 8, useGrouping: false }); }
    showError(message) { this.cancelErrorReset(); this.displayPrimary.textContent = 'Error'; this.displayPrimary.classList.add('display-error'); this.displaySecondary.textContent = message; this.errorTimeout = setTimeout(() => { this.errorTimeout = null; this.clearAll(); }, 2000); }
    cancelErrorReset() { if (this.errorTimeout !== null) { clearTimeout(this.errorTimeout); this.errorTimeout = null; } }
    addButtonAnimation(button) { if (!button) return; button.classList.add('btn-active'); setTimeout(() => button.classList.remove('btn-active'), 200); }
    highlightButton(selector) { const button = document.querySelector(selector); if (button) this.addButtonAnimation(button); }
}
document.addEventListener('DOMContentLoaded', () => {
    new Calculator(); const calculator = document.querySelector('.calculator'); if (calculator) calculator.style.animation = 'float 6s ease-in-out infinite';
    const style = document.createElement('style'); style.textContent = '@keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-5px); } }'; document.head.appendChild(style);
});
