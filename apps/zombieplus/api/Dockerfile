# Use a imagem base do Node.js
FROM node:19

# Instalar netcat
RUN apt-get update && apt-get install -y netcat

# Defina o diretório de trabalho
WORKDIR /usr/src/app

# Copie os arquivos de configuração
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código para o diretório de trabalho
COPY . .

# Adicionar permissão de execução para os scripts
RUN chmod +x ./wait-for.sh ./db.sh ./entrypoint.sh

# Exponha a porta da API
EXPOSE 3333

# Define o script de entrada
ENTRYPOINT ["./entrypoint.sh"]
