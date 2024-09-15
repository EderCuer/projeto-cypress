# Use a imagem base do Node.js
FROM node:19

# Instalar netcat (necessário para o script wait-for.sh)
RUN apt-get update && apt-get install -y netcat

# Defina o diretório de trabalho
WORKDIR /usr/src/app

# Copiar o código da aplicação
COPY . .

# Adicionar permissão de execução para os scripts
RUN chmod +x /usr/src/app/entrypoint.sh /usr/src/app/wait-for.sh /usr/src/app/db.sh

# Expor a porta da API
EXPOSE 3333

# Definir o script de entrada
ENTRYPOINT ["/bin/sh", "/usr/src/app/entrypoint.sh"]
