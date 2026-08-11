FROM nginx:alpine

LABEL org.opencontainers.image.title="Pijush Calculator"
LABEL org.opencontainers.image.description="Modern browser calculator"
LABEL org.opencontainers.image.source="https://github.com/TEJAS-MK2/Calculator"
LABEL org.opencontainers.image.licenses="MIT"

COPY index.html /usr/share/nginx/html/index.html

EXPOSE 80
