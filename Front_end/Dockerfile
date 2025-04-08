# Front-end/Dockerfile
FROM nginx:alpine

# Remove a página padrão do nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia o index.html para o diretório padrão do nginx
COPY . /usr/share/nginx/html/

EXPOSE 80