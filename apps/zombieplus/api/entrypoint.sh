#!/bin/sh

# Aplicar permissões aos scripts
chmod +x /usr/src/app/wait-for.sh /usr/src/app/db.sh

# Espera pelo banco de dados estar disponível
./wait-for.sh db 5432

# Executa o script db.sh para preparar o banco de dados
./db.sh

# Inicia a API
exec npm run dev
