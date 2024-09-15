#!/bin/sh

# Espera pelo banco de dados estar disponível
./wait-for.sh db ./db.sh

# Inicia a API
exec npm run dev
