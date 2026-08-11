FROM nginx:alpine

LABEL org.opencontainers.image.title="Modern Calculator"
LABEL org.opencontainers.image.description="Modern responsive calculator web app with history, themes, and PWA support."
LABEL org.opencontainers.image.source="https://github.com/TEJAS-MK2/Calculator"
LABEL org.opencontainers.image.url="https://tejas-mk2.github.io/Calculator/"
LABEL org.opencontainers.image.licenses="MIT"

COPY index.html /usr/share/nginx/html/index.html
COPY styles.css /usr/share/nginx/html/styles.css
COPY script.js /usr/share/nginx/html/script.js
COPY calculator-core-ui.js /usr/share/nginx/html/calculator-core-ui.js
COPY manifest.json /usr/share/nginx/html/manifest.json
COPY sw.js /usr/share/nginx/html/sw.js
COPY packages/calculator-core /usr/share/nginx/html/packages/calculator-core

EXPOSE 80
