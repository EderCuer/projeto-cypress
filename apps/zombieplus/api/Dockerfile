# Use a imagem base do Node.js
FROM node:19

# Instalar netcat (necessário para o script wait-for.sh)
RUN apt-get update && apt-get install -y netcat

# Instalar nodemon globalmente
RUN npm install -g nodemon

# Defina o diretório de trabalho
WORKDIR /usr/src/app

# Copie os arquivos de configuração do Node.js
COPY package*.json ./

# Definir a variável de ambiente NODE_ENV para 'development'
ENV NODE_ENV=development

# Instalar as dependências (incluindo devDependencies)
RUN npm install

# Copiar o restante do código da aplicação
COPY . .

# Adicionar permissão de execução para os scripts
RUN chmod +x /usr/src/app/entrypoint.sh /usr/src/app/wait-for.sh /usr/src/app/db.sh

# Exponha a porta da API
EXPOSE 3333

# Define o script de entrada
ENTRYPOINT ["/bin/sh", "/usr/src/app/entrypoint.sh"]
