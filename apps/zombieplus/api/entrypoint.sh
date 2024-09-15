#!/bin/sh

# Espera pelo banco de dados estar disponível
./wait-for.sh db 5432

# Executa o script db.sh para preparar o banco de dados
./db.sh

# Inicia a API
exec npm run dev
