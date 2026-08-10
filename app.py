import os
from flask import Flask, abort, send_from_directory

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET", "dev-secret-key")

# The current calculator is a static PWA at the repository root. Keep the
# Flask entry point in sync so local/Flask deployments do not load the old
# calculator from templates/static.
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
    app.run(host="0.0.0.0", port=5000, debug=True)
