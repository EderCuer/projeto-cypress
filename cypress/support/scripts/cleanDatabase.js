const { Client } = require('pg');
const tableName = process.argv[2];

async function cleanDatabase(tableName) {
    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'dbname',
        password: '1234',
        port: 5432,
    });

    try {
        await client.connect();
        // Execute aqui as consultas SQL para limpar o banco
        await client.query(`DELETE FROM ${tableName};`);
        console.log('Banco de dados limpo com sucesso');
    } catch (error) {
        console.error('Erro ao limpar o banco de dados', error);
    } finally {
        await client.end();
    }
}

cleanDatabase(tableName);
