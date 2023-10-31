import mysql from 'mysql2';

export const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: '123456',
    database: 'db_industria'
})

// export const db = mysql.createConnection({
//     host: 'database-1.cyz0f4on57jl.us-east-1.rds.amazonaws.com',
//     user: 'admin',
//     port: 3306,
//     password: '12345678',
//     database: 'db_industria'
// })

