import mysql from 'mysql2';

export const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: 'wfECVj0X0aJQ8ams',
    database: 'db_industria'
})
