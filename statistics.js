class StatisticsMode {
    constructor() {
        this.panel = document.getElementById('statisticsPanel');
        this.input = document.getElementById('statisticsInput');
        this.result = document.getElementById('statisticsResult');
        this.status = document.getElementById('statisticsStatus');
        if (!this.panel || !this.input || !this.result || !this.status) return;
        document.getElementById('statisticsToggle')?.addEventListener('click', () => this.toggle());
        document.getElementById('statisticsCalculate')?.addEventListener('click', () => this.calculate());
        document.getElementById('statisticsClear')?.addEventListener('click', () => this.clear());
        this.input.addEventListener('keydown', event => { if (event.key === 'Enter') { event.preventDefault(); this.calculate(); } });
    }
    toggle() {
        const open = this.panel.classList.toggle('is-open');
        this.panel.setAttribute('aria-hidden', String(!open));
        document.getElementById('statisticsToggle')?.setAttribute('aria-expanded', String(open));
        if (open && typeof anime === 'function') anime({ targets: this.panel, opacity: [0, 1], translateY: [-10, 0], duration: 400, easing: 'easeOutCubic' });
    }
    parse() {
        const raw = this.input.value.trim();
        if (!raw) throw new Error('Enter at least one number.');
        const tokens = raw.split(/[,\s]+/).filter(Boolean);
        const values = tokens.map(token => Number(token));
        if (values.some(value => !Number.isFinite(value))) throw new Error('Use only valid numbers separated by commas or spaces.');
        return values;
    }
    calculate() {
        try {
            const values = this.parse();
            const n = values.length;
            const sorted = [...values].sort((a, b) => a - b);
            const sum = values.reduce((a, b) => a + b, 0);
            const mean = sum / n;
            const median = n % 2 ? sorted[(n - 1) / 2] : (sorted[n / 2 - 1] + sorted[n / 2]) / 2;
            const min = sorted[0], max = sorted[n - 1], range = max - min;
            const squared = values.reduce((total, x) => total + (x - mean) ** 2, 0);
            const populationVariance = squared / n;
            const sampleVariance = n > 1 ? squared / (n - 1) : null;
            const populationSD = Math.sqrt(populationVariance);
            const sampleSD = sampleVariance === null ? null : Math.sqrt(sampleVariance);
            const frequency = new Map();
            values.forEach(value => frequency.set(value, (frequency.get(value) || 0) + 1));
            const highest = Math.max(...frequency.values());
            const modes = highest > 1 ? [...frequency.entries()].filter(([, count]) => count === highest).map(([value]) => Number(value)) : [];
            this.result.replaceChildren();
            const rows = [
                ['Count (n)', n], ['Sum (Σx)', sum], ['Mean', mean], ['Median', median], ['Mode', modes.length ? modes.join(', ') : 'No mode'],
                ['Minimum', min], ['Maximum', max], ['Range', range], ['Population variance (σ²)', populationVariance],
                ['Population standard deviation (σ)', populationSD], ['Sample variance (s²)', sampleVariance === null ? 'N/A' : sampleVariance],
                ['Sample standard deviation (s)', sampleSD === null ? 'N/A' : sampleSD]
            ];
            rows.forEach(([label, value]) => {
                const row = document.createElement('div'); row.className = 'statistics-row';
                const name = document.createElement('span'); name.textContent = label;
                const output = document.createElement('strong'); output.textContent = this.format(value);
                row.append(name, output); this.result.appendChild(row);
            });
            this.status.textContent = `${n} value${n === 1 ? '' : 's'} analyzed`;
            this.status.classList.remove('error');
            if (typeof anime === 'function') anime({ targets: '.statistics-row', opacity: [0, 1], translateX: [-10, 0], duration: 350, delay: anime.stagger(25), easing: 'easeOutCubic' });
        } catch (error) {
            this.result.replaceChildren(); this.status.textContent = error.message; this.status.classList.add('error');
        }
    }
    format(value) {
        if (typeof value === 'string') return value;
        if (!Number.isFinite(value)) return 'N/A';
        return Number.isInteger(value) ? String(value) : Number(value.toFixed(8)).toString();
    }
    clear() { this.input.value = ''; this.result.replaceChildren(); this.status.textContent = 'Enter numbers separated by spaces or commas'; this.status.classList.remove('error'); }
}
document.addEventListener('DOMContentLoaded', () => new StatisticsMode());

// Load the sidebar animation repair after Calculator, GraphingCalculator and StatisticsMode
// have initialized, while preserving the original feature panel DOM nodes and listeners.
document.addEventListener('DOMContentLoaded', () => {
    const script = document.createElement('script');
    script.src = './sidebar-fix.js?v=1';
    script.async = false;
    document.body.appendChild(script);
}, { once: true });
