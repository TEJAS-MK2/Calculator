import os
from flask import Flask, abort, send_from_directory

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
app = Flask(__name__)

# Keep the secret optional for deployments that need sessions. Never ship a
# hard-coded fallback secret in production.
if os.environ.get("SESSION_SECRET"):
    app.secret_key = os.environ["SESSION_SECRET"]

ROOT_FILES = {
    "index.html", "styles.css", "script.js", "graph.css", "graph.js",
    "statistics.css", "statistics.js", "manifest.json", "sw.js",
    "calculator-screenshot.png", "calculator-demo-fixed.gif"
}

@app.route("/")
def index():
    return send_from_directory(BASE_DIR, "index.html")

@app.route("/<path:filename>")
def root_asset(filename):
    if filename not in ROOT_FILES:
        abort(404)
    return send_from_directory(BASE_DIR, filename)


if __name__ == "__main__":
    # Debug mode must never be enabled by default in a deployed application.
    # Flask's development server is only started when this file is run directly.
    app.run(host="0.0.0.0", port=5000, debug=False)
