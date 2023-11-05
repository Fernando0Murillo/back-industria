import mysql from 'mysql2';


export const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: '123Qweasd',
    database: 'db_industria'
})

/*

export const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: '123456',
    database: 'db_industria'
})
*/