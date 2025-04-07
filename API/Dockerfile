# API/Dockerfile
FROM node:18

# Diretório de trabalho
WORKDIR /app

# Copia os arquivos
COPY package*.json ./
RUN npm install

COPY . .

# Porta que o app escuta
EXPOSE 3000

CMD ["node", "app.js"]
