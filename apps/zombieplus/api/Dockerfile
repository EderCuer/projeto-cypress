# Use a imagem base do Node.js
FROM node:19

# Instalar netcat
RUN apt-get update && apt-get install -y netcat

# Defina o diretório de trabalho
WORKDIR /usr/src/app

# Copie o restante do código para o diretório de trabalho
COPY . .

# Adicionar permissão de execução para os scripts
RUN chmod +x /usr/src/app/entrypoint.sh /usr/src/app/wait-for.sh /usr/src/app/db.sh

# Instale as dependências
RUN npm install

# Exponha a porta da API
EXPOSE 3333

# Define o script de entrada
ENTRYPOINT ["sh", "/usr/src/app/entrypoint.sh"]
