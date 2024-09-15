#!/bin/sh

# Esperar até que o host e a porta estejam acessíveis
until nc -z -v -w30 $DB_HOST 5432; do
  echo "Aguardando o banco de dados em $DB_HOST:5432..."
  sleep 2
done

# Executar o comando original da aplicação
exec "$@"
