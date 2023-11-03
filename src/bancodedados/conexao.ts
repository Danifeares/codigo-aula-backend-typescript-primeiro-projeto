import conexao from 'knex'

export const knex = conexao({
    client: 'pg',
    connection: {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT), // passado como number pois o ts reconhece tudo que vem do .env como string, e reclama se não especificar que é number
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_DATABASE
    }
})