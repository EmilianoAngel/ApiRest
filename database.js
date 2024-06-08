import pg from 'pg' 
const { Pool } = pg

const pool = new Pool ({
    connectionString: 'postgres://default:kUWHZmwKa3Q2@ep-twilight-hill-a4qb13za.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require'
})

const conectar = () => {
    pool.connect()
    .then(() => console.log('Conectado a la base de datos'))
    .catch((error) => console.log('Error al conectar ', error))
}

export default conectar;
export {pool};