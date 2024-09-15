#!/bin/sh

# Aplicar permissões aos scripts
chmod +x /usr/src/app/wait-for.sh /usr/src/app/db.sh

# Espera pelo banco de dados estar disponível
./wait-for.sh db ./db.sh

# Inicia a API
exec npm run dev
