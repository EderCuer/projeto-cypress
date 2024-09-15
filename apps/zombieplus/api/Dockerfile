# Use a imagem base do Node.js
FROM node:20

# Instalar netcat (necessário para o script wait-for.sh)
RUN apt-get update && apt-get install -y netcat

# Defina o diretório de trabalho
WORKDIR /usr/src/app

# Copiar o código da aplicação
COPY . .

# Limpar o cache do npm e definir o ambiente como development
RUN npm cache clean --force
ENV NODE_ENV=development

# Instalar as dependências
RUN npm install

# Instalar nodemon globalmente
RUN npm install -g nodemon

# Adicionar permissão de execução para os scripts
RUN chmod +x /usr/src/app/entrypoint.sh /usr/src/app/wait-for.sh /usr/src/app/db.sh

# Expor a porta da API
EXPOSE 3333

# Definir o script de entrada
ENTRYPOINT ["/bin/sh", "/usr/src/app/entrypoint.sh"]
