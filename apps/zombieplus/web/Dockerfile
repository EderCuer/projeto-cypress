# Use uma imagem base do Node.js
FROM node:19

# Defina o diretório de trabalho
WORKDIR /usr/src/app

# Copie os arquivos de configuração
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código para o diretório de trabalho
COPY . .

# Exponha a porta do frontend (ajuste se necessário)
EXPOSE 3000

# Comando para iniciar o frontend
CMD ["npm", "run", "dev"]
