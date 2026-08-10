# Calculator

A clean, responsive web calculator built with **HTML, CSS, and JavaScript**. It features a minimal black-and-white interface, keyboard support, smooth interactions, and a lightweight client-side calculation engine.

## Live Demo

**GitHub Pages:**
https://tejas-mk2.github.io/Calculator/

## Features

- Basic arithmetic: addition, subtraction, multiplication, and division
- Decimal number support
- Backspace, clear, and all-clear controls
- Division-by-zero error handling
- Keyboard input support
- Responsive layout for desktop and mobile devices
- Button press animations
- Secondary display for the current operation
- Automatic formatting for very large and very small numbers
- No backend required for the live calculator

## Keyboard Shortcuts

| Key | Action |
|---|---|
| `0-9` | Enter numbers |
| `+` | Addition |
| `-` | Subtraction |
| `*` | Multiplication |
| `/` | Division |
| `.` | Decimal |
| `Enter` / `=` | Calculate |
| `Backspace` | Delete the last digit |
| `Escape` | All clear |
| `C` | Clear current input |

## Tech Stack

- **HTML5** — calculator structure and semantic controls
- **CSS3** — responsive layout, styling, animations, and accessibility states
- **JavaScript (ES6+)** — calculator state and arithmetic logic
- **GitHub Pages** — static website hosting

## Project Structure

```text
Calculator/
├── index.html                 # Calculator interface
├── styles.css                 # Main stylesheet
├── script.js                  # Calculator logic
├── .github/workflows/
│   └── deploy.yml             # GitHub Pages deployment workflow
├── app.py                     # Optional Flask server
├── main.py                    # Flask entry point
├── static/                    # Flask static assets
└── templates/                 # Flask templates
```

The **GitHub Pages version uses the root `index.html`, `styles.css`, and `script.js`**. The Flask files are retained for optional local/server-side use and are not required for the static Pages deployment.

## Running Locally

### Option 1 — Open directly

Open `index.html` in a modern web browser.

### Option 2 — Use Flask

If Python and Flask are installed:

```bash
python app.py
```

Then open:

```text
http://localhost:5000
```

For production deployments, do not expose Flask's development server or enable `debug=True` publicly.

## Error Handling

The calculator handles common input errors, including:

- Division by zero
- Invalid numeric input
- Floating-point rounding artifacts
- Interrupted error states

## Browser Support

The calculator is designed for modern browsers that support ES6 JavaScript, CSS Grid, and standard DOM APIs.

## Contributing

Contributions, bug reports, and feature requests are welcome. Open an issue or submit a pull request on GitHub.

## About

Built by **Pijush Chakraborty**.

## License

Licensed under the **Apache License 2.0**. See [`LICENSE`](./LICENSE) for details.
