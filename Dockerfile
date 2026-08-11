FROM nginx:alpine

LABEL org.opencontainers.image.title="Pijush Calculator"
LABEL org.opencontainers.image.description="Modern responsive calculator web app with scientific calculation features, history, themes, and PWA support."
LABEL org.opencontainers.image.source="https://github.com/TEJAS-MK2/Calculator"
LABEL org.opencontainers.image.url="https://tejas-mk2.github.io/Calculator/"
LABEL org.opencontainers.image.licenses="MIT"

COPY index.html /usr/share/nginx/html/index.html
COPY styles.css /usr/share/nginx/html/styles.css
COPY script.js /usr/share/nginx/html/script.js
COPY sidebar-fix.js /usr/share/nginx/html/sidebar-fix.js
COPY sidebar-hardening.js /usr/share/nginx/html/sidebar-hardening.js
COPY calculator-core-ui.js /usr/share/nginx/html/calculator-core-ui.js
COPY animation-enhancements.js /usr/share/nginx/html/animation-enhancements.js
COPY phase2.css /usr/share/nginx/html/phase2.css
COPY manifest.json /usr/share/nginx/html/manifest.json
COPY sw.js /usr/share/nginx/html/sw.js

EXPOSE 80
