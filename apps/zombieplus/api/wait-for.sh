#!/bin/sh

# Aguarda pelo banco de dados estar disponível
host="$1"
shift
cmd="$@"

until nc -z "$host" 5432; do
  echo "Aguardando a conexão com o banco de dados em $host..."
  sleep 5
done

# Executa o comando passado
exec $cmd
