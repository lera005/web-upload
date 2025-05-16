FROM nginx:stable-alpine

# Entferne default nginx config (optional)
RUN rm /etc/nginx/conf.d/default.conf

# Kopiere deine statischen Dateien (dist) in das Nginx-Verzeichnis
COPY dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
